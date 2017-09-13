package com.keer.core.action;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import com.keer.core.dao.SQLBuilder;

import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;

import com.keer.core.bean.base.JSONBean;
import com.keer.core.bean.base.Role;
import com.keer.core.bean.base.User;
import com.keer.core.bean.menu.MenuActionDesc;
import com.keer.core.bean.organization.UserMember;
import com.keer.core.bean.permission.module.action.RoleModuleActionPermission;
import com.keer.core.service.IMenuActionBizService;
import com.keer.core.service.IUserMemberBizService;
import com.keer.core.base.CRUDAction;

@Action("MenuActionAction")
@SuppressWarnings({"serial","rawtypes"})
public class MenuActionAction extends CRUDAction<MenuActionDesc> {

	@Autowired
	private IMenuActionBizService menuActionBizService;
	
	@Autowired
	private IUserMemberBizService userMemberBizService;
	
	@Override
	public JSONBean bizDefaultBean(JSONBean bean) throws Exception {
		return bean;
	}
	
	@Override
	public String getPrimaryValue(Class<JSONBean> clazz) {
		return this.getId();
	}
	
	private String menu;
	
	private String clazzAction;
	
	@Override
	public void buildFilterString(Class<JSONBean> clazz,SQLBuilder builder) throws Exception {

	}
	
	@Override
	protected List<JSONBean> bizFindAll(Class<JSONBean> clazz,SQLBuilder builder) throws Exception {
		List<JSONBean> result = new ArrayList<JSONBean>();
		List<MenuActionDesc> actionList = menuActionBizService.findActionList(clazzAction);
		result.addAll(actionList);
		return result;
	}
	
	@SuppressWarnings("unchecked")
	public void findActionList() throws Exception {
		List<MenuActionDesc> actionList = menuActionBizService.findActionList(clazzAction);
		UserMember member = (UserMember) userMemberBizService.getBean(loginUser);
		User user = member.getUser();
		if (!user.getIsAdmin()){
			Set<Role> roles = userMemberBizService.findAllRole(member);
			String initValue = "";
			for(Role role : roles){
				if (initValue != ""){
					initValue += ",";
				}
				initValue += String.format("'%s'", role.getId());
			}
			List<MenuActionDesc> results = new ArrayList<MenuActionDesc>();
			SQLBuilder builder = new SQLBuilder();
			builder.AddFilterWhere(String.format("menu='%s'", menu));
			builder.AddFilterWhere(String.format("role in(%s)", initValue));
			List<RoleModuleActionPermission> permissions = this.dao.findAll(RoleModuleActionPermission.class, builder, "{action:{id:null}}");
			for(MenuActionDesc action : actionList){
				String id = action.getActionType();
				for(RoleModuleActionPermission permission : permissions){
					String type = permission.getActionType();
					if (id.equals(type)){
						results.add(action);
						break;
					}
				}
			}
			JSONResponse(results);
		}
		else {
			JSONResponse(actionList);
		}
	}
	
	public String getMenu() {
		return menu;
	}
	public void setMenu(String menu) {
		this.menu = menu;
	}

	public String getClazzAction() {
		return clazzAction;
	}

	public void setClazzAction(String clazzAction) {
		this.clazzAction = clazzAction;
	}
}
