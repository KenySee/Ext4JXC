package com.keer.core.action;


import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.apache.commons.lang.StringUtils;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;

import com.keer.core.annotation.Description;
import com.keer.core.annotation.Permission;
import com.keer.core.base.CRUDAction;
import com.keer.core.bean.base.JSONBean;
import com.keer.core.bean.base.Role;
import com.keer.core.bean.menu.MenuActionDesc;
import com.keer.core.bean.menu.MenuItem;
import com.keer.core.bean.menu.MenuResource;
import com.keer.core.bean.permission.module.action.RoleModuleActionPermission;
import com.keer.core.dao.SQLBuilder;
import com.keer.core.service.IMenuActionBizService;
import com.keer.core.service.IMenuResourceBizService;
import com.keer.core.service.IRoleBizService;
import com.keer.core.service.IRoleModuleActionPermissionBizService;

@Description(Name="角色管理")
@Action("RoleAction")
@SuppressWarnings({ "serial", "rawtypes" })
public class RoleAction extends CRUDAction<Role> {

	@Autowired
	private IRoleBizService roleBizService;
	
	@Autowired
	private IMenuResourceBizService menuResourceBizService;
	
	@Autowired
	private IMenuActionBizService menuActionBizService;
	
	@Autowired
	private IRoleModuleActionPermissionBizService roleModuleActionPermissionBizService;
	
	@Override
	public JSONBean bizDefaultBean(JSONBean bean) throws Exception {
		return bean;
	}
	
	@Override
	public Serializable getPrimaryValue(Class<JSONBean> clazz) {
		return this.getId();
	}
	
	private String parent;
	
	private String dtype;
	
	private String role;
	
	private String menu;
	
	private String type;	//菜单类型 [MenuGroup,MenuItem]
	
	private String clazzAction;
	/**
	 * 获取角色关联的菜单和菜单组
	 * @throws Exception
	 */
	public void findMenusByRole() throws Exception {
		if (StringUtils.isNotBlank(role)){
			Set<MenuResource> menus = roleModuleActionPermissionBizService.findMenuResourceByRole(role,json);
			JSONResponse(new ArrayList<MenuResource>(menus));
		}
	}
	
	@Override
	public List<JSONBean> bizFindAll(Class<JSONBean> clazz, SQLBuilder builder)	throws Exception {
		List<JSONBean> beanList = super.bizFindAll(clazz,builder);
		String beanName = clazz.getSimpleName();
		if ("MenuResource".equals(beanName)){
			if (StringUtils.isNotBlank(role)){
				Set<MenuResource> menus = roleModuleActionPermissionBizService.findMenuResourceByRole(role,json);
				if (menus != null && menus.size() > 0){
					for(JSONBean menu : beanList){
						for(JSONBean item : menus){
							if (item.equals(menu)){
								menu.addJSONValue("checked", true);
								break;
							}
						}
					}
				}
			}
		}
		return beanList;
	}
	
	@Override
	public void buildFilterString(Class<JSONBean> clazz,SQLBuilder builder) throws Exception {
		if (StringUtils.isNotBlank(orderString)){
			builder.AddOrderBy(orderString);
		}
		String beanName = clazz.getSimpleName();
		if ("MenuResource".equals(beanName)){
			if (StringUtils.isNotBlank(parent)){
				this.node = parent;
			}			
			if (node == null  || (node.equals("NaN") || node.indexOf("root") >= 0 || node.equals(""))){
				builder.AddFilterWhere("parent is null");
			}
			else {
				builder.AddFilterWhere(String.format("parent = '%s'",node));
			}
			
			if (StringUtils.isNotBlank(dtype)) {
				builder.AddFilterWhere(String.format("dtype = '%s'",dtype));
			}
			
			builder.AddOrderBy("sortno");			
		}
		else if("MenuAction".equals(beanName)){
			if (StringUtils.isNotBlank(menu)){
				builder.AddFilterWhere(String.format("menu='%s'", menu));
			}
			else {
				builder.AddFilterWhere("1=0");
			}		
		}
		else if("RoleModuleActionPermission".equals(beanName)){
			if (StringUtils.isNotBlank(menu) && StringUtils.isNotBlank(role)){
				if ("MenuGroup".equals(type)){
					@SuppressWarnings("unchecked")
					Set<MenuResource> childs = menuResourceBizService.getAllChilds(menu);
					String initValue = "";
					for(MenuResource child : childs){
						if (child instanceof MenuItem){
							if (initValue != ""){
								initValue += ",";
							}
							initValue += String.format("'%s'", child.getId());
						}
					}
					if (initValue != ""){
						builder.AddFilterWhere(String.format("menu in(%s)",initValue));
					}
					else {
						builder.AddFilterWhere("1=0");
					}
				}
				else {
					builder.AddFilterWhere(String.format("menu='%s'",menu));
				}
				builder.AddFilterWhere(String.format("role='%s'",role));
			}
			else {
				builder.AddFilterWhere("1=0");
			}			
		}
	}

	@Permission(action="VIEW",desc="",bean=MenuResource.class,ignore=true)
	public void findAllMenuResource() throws Exception {
		this.findAll();
	}

	@Permission(action="VIEW",desc="",bean=com.keer.core.bean.menu.MenuActionDesc.class,ignore=true)
	public void findAllMenuActionDesc() throws Exception {
		List<MenuActionDesc> actionList = menuActionBizService.findActionList(clazzAction);
		this.JSONResponse(actionList);
	}
	
	@Permission(action="VIEW",desc="",bean=RoleModuleActionPermission.class,ignore=true)
	public void findAllRoleModuleActionPermission() throws Exception {
		this.findAll();
	}
	
	public String getParent() {
		return parent;
	}

	public void setParent(String parent) {
		this.parent = parent;
	}

	public String getDtype() {
		return dtype;
	}

	public void setDtype(String dtype) {
		this.dtype = dtype;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getMenu() {
		return menu;
	}

	public void setMenu(String menu) {
		this.menu = menu;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getClazzAction() {
		return clazzAction;
	}

	public void setClazzAction(String clazzAction) {
		this.clazzAction = clazzAction;
	}
}