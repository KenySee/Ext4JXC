package com.keer.core.service.impl;

import java.lang.reflect.Method;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.keer.core.annotation.Permission;
import com.keer.core.base.CRUDAction;
import com.keer.core.base.JSONAction;
import com.keer.core.bean.base.User;
import com.keer.core.bean.menu.Menu;
import com.keer.core.bean.menu.MenuActionDesc;
import com.keer.core.bean.menu.MenuGroup;
import com.keer.core.bean.menu.MenuItem;
import com.keer.core.bean.menu.MenuResource;
import com.keer.core.bean.organization.Corporation;
import com.keer.core.bean.organization.Department;
import com.keer.core.bean.organization.UserMember;
import com.keer.core.dao.SQLBuilder;
import com.keer.core.service.IMenuActionBizService;
import com.keer.core.service.IMenuResourceBizService;
import com.keer.core.util.CacheLoaderUtil;
import com.keer.core.util.DefineClass;

@Transactional
@Service("menuResourceBizService")
public class MenuResourceBizServiceImpl<T extends MenuResource> extends GenericBizServiceImpl<T> implements IMenuResourceBizService<T> {

	@Autowired
	private IMenuActionBizService menuActionBizService;
	
	
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	public Set<MenuResource> getAllChilds(String menuid) throws Exception {
		Set<MenuResource> childs = new HashSet<MenuResource>();
		SQLBuilder builder = new SQLBuilder();
		builder.AddFilterWhere(String.format("parent='%s'", menuid));
		List<MenuResource> list = dao.findAll(MenuResource.class, builder, null);
		for(MenuResource item : list){
			if (item instanceof MenuGroup){
				childs.addAll(this.getAllChilds(item.getId()));
			}
			else {
				childs.add(item);
			}
		}
		return childs;
	}
	
	/**
	 * 获取类定义里的所有动作列表
	 * @param clazzAction
	 * @return List<MenuAction>
	 * @throws Exception
	*/
	public List<MenuActionDesc> getClassActions(String clazzAction,String menuId) throws Exception {
		SQLBuilder builder = new SQLBuilder();
		builder.AddFilterWhere(String.format("menu='%s'", menuId));
		List<MenuActionDesc> list = this.dao.findAll(com.keer.core.bean.menu.MenuActionDesc.class, builder, null);
		Class<?> clazz = null;
		try {
			clazz = Class.forName(clazzAction);
			if (clazz != null) {
				if (CRUDAction.class.isAssignableFrom(clazz)) {
					Class<?> action = clazz;
					while (action != JSONAction.class) {
						for (Method method : action.getDeclaredMethods()) {
							Permission annotation = method.getAnnotation(Permission.class);
							if (annotation != null) {
								Boolean notFound = true;
								String act = annotation.action();
								if (StringUtils.isNotBlank(act)){
									for(MenuActionDesc menu : list){
										if (act.equals(menu.getActionType())){
											notFound = false;
											break;
										}
									}
								}
								else {
									notFound = false;
								}
								if (notFound){
									MenuActionDesc menuAction = new MenuActionDesc();
									menuAction.setActionDesc(annotation.desc());
									menuAction.setActionType(annotation.action());
									list.add(menuAction);
								}
							}
						}
						action = action.getSuperclass();
					}
				}
			}
		} catch (ClassNotFoundException e) {
			throw new Exception("模块类名不存在");
		}
		return list;
	}
	
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	public void InitializerMenu(UserMember user)  throws Exception{
		String corpUUID = UUID.randomUUID().toString();
		String deptUUID = UUID.randomUUID().toString();
		String memberUUID = UUID.randomUUID().toString();
		String userUUID = UUID.randomUUID().toString();
		
		DefineClass define = CacheLoaderUtil.getDefineClass(Corporation.class);
		Set<DefineClass> childs = define.getAllConcreteDefine();
		for(DefineClass child : childs){
			dao.executeUpdate(String.format("insert into ts_organization(DTYPE,id,code,name,valid,version) values('%s','%s','%s','%s',1,0)",
				child.getClazz().getSimpleName(),corpUUID,"1001","公司"));
			break;
		}
		define = CacheLoaderUtil.getDefineClass(Department.class);
		childs = define.getAllConcreteDefine();
		for(DefineClass child : childs){
			dao.executeUpdate(String.format("insert into ts_organization(DTYPE,id,parent_id,corporation_id,code,name,valid,version) values('%s','%s','%s','%s','%s','%s',1,0)",
				child.getClazz().getSimpleName(),deptUUID,corpUUID,corpUUID,"1001.01","部门"));
			break;
		}
		define = CacheLoaderUtil.getDefineClass(User.class);
		childs = define.getAllConcreteDefine();
		for(DefineClass child : childs){
			String loginname = "1001";
			String password = "123";
			User use = user != null ? user.getUser() : null;
			if (use != null){
				loginname = use.getLoginname();
				password = use.getPassword();
			}
			String sql = String.format("insert into ts_user(DTYPE,id,code,loginname,password,name,status,valid,isadmin,version) values('%s','%s','%s','%s','%s','%s','USING',1,1,0)",
					child.getClazz().getSimpleName(),userUUID,loginname,loginname,password,"系统用户");
			dao.executeUpdate(sql);
			
			DefineClass memberDef = CacheLoaderUtil.getDefineClass(UserMember.class);
			Set<DefineClass> members = memberDef.getAllConcreteDefine();
			for(DefineClass member : members){
				dao.executeUpdate(String.format("insert into ts_organization(DTYPE,id,code,name,parent_id,corporation_id,department_id,user_id,valid,version) values('%s','%s','%s','%s','%s','%s','%s','%s',1,0)",
						member.getClazz().getSimpleName(),memberUUID,"1001.01.01","系统用户",
						deptUUID,corpUUID,deptUUID,userUUID));
				
				dao.executeUpdate(String.format("update ts_user set mainMember_id='%s' where id='%s'", memberUUID,userUUID));
				break;
			}
			break;
		}
		int count = dao.findRecordCount(MenuResource.class, new SQLBuilder());
		if (count == 0){
			MenuGroup system = new MenuGroup("02", "系统管理");
			system.GeneratorKey();
			dao.save(system);
			MenuGroup group = (MenuGroup)system.addMenu(new MenuGroup("02.01","权限管理"));
			dao.save(group);
			Menu bean = (Menu)group.addMenu(new MenuItem("02.01.002","角色管理", "Keer.ui.core.Role.MainContainer","com.keer.core.action.RoleAction"));
			dao.save(bean);
			bean = (Menu)group.addMenu(new MenuItem("02.01.003","菜单管理", "Keer.ui.core.MenuResource.MainContainer","com.keer.core.action.MenuResourceAction"));
			dao.save(bean);
			
			MenuGroup organization = (MenuGroup)system.addMenu(new MenuGroup("02.02","机构管理"));
			dao.save(organization);
			bean = (Menu)organization.addMenu(new MenuItem("02.02.001","岗位管理", "Keer.ui.core.Post.MainContainer","com.keer.core.action.PostAction"));
			dao.save(bean);
			bean = (Menu)organization.addMenu(new MenuItem("02.02.002","组织机构", "Keer.ui.core.Organization.MainContainer","com.keer.core.action.OrganizationAction"));
			dao.save(bean);
			
			MenuGroup daemon = (MenuGroup)system.addMenu(new MenuGroup("02.03","后台管理"));
			dao.save(daemon);
			bean = (Menu)daemon.addMenu(new MenuItem("02.03.001","数据字典", "Keer.ui.core.EntityEnum.MainContainer","com.keer.core.action.EntityEnumAction"));
			dao.save(bean);
			bean = (Menu)daemon.addMenu(new MenuItem("02.03.003","部件管理","Keer.ui.core.Widget.MainContainer","com.keer.core.action.WidgetAction"));
			dao.save(bean);
			bean = (Menu)daemon.addMenu(new MenuItem("02.03.004","界面模型","Keer.ui.core.EntityModel.MainContainer","com.keer.core.action.EntityModelAction"));
			dao.save(bean);
		}
	}
}
