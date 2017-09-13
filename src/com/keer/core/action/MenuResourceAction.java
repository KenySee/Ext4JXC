package com.keer.core.action;

import java.io.Serializable;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.apache.commons.lang.StringUtils;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;

import com.keer.core.annotation.Description;
import com.keer.core.base.CRUDAction;
import com.keer.core.bean.base.JSONBean;
import com.keer.core.bean.base.Role;
import com.keer.core.bean.base.User;
import com.keer.core.bean.menu.MenuActionDesc;
import com.keer.core.bean.menu.MenuItem;
import com.keer.core.bean.menu.MenuResource;
import com.keer.core.bean.organization.UserMember;
import com.keer.core.dao.SQLBuilder;
import com.keer.core.service.IMenuActionBizService;
import com.keer.core.service.IMenuResourceBizService;
import com.keer.core.service.IRoleModuleActionPermissionBizService;
import com.keer.core.service.IUserMemberBizService;

@Description(Name="菜单管理")
@Action("MenuResourceAction")
@SuppressWarnings({"serial","rawtypes"})
public class MenuResourceAction extends CRUDAction<MenuResource> {

	@Autowired
	private IMenuResourceBizService menuResourceBizService;
	
	@Autowired
	private IUserMemberBizService userMemberBizService;
	
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
	private String url;
	private String role;
	private String dtype;
	
	/**
	 * 根据URL获取菜单
	 * @throws Exception
	 */
	public void findMenuByUrl() throws Exception {
		if (StringUtils.isNotBlank(url)){
			sqlBuilder.AddFilterWhere(String.format("url = '%s'",url));
			findHomeMenu();	
		}		
	}
	
	/**
	 * 加载首页菜单(带权限过滤)
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public void findHomeMenu() throws Exception {
		SQLBuilder builder = this.sqlBuilder;
		if (!StringUtils.isNotBlank(url)){
			if (node == null  || (node.equals("NaN") || node.indexOf("root") >= 0 || node.equals(""))){
				builder.AddFilterWhere("parent is null");
			}
			else {
				builder.AddFilterWhere(String.format("parent = '%s'",node));
			}
		}
		UserMember member = (UserMember) userMemberBizService.getBean(loginUser);
		User user = member.getUser();		
		if (!user.getIsAdmin()){
			Set<MenuResource> allMenus = new HashSet<MenuResource>();
			Set<Role> roles = userMemberBizService.findAllRole(member);
			for(Role role : roles){
				Set<MenuResource> menus = roleModuleActionPermissionBizService.findMenuResourceByRole(role.getId(), json);
				for(MenuResource menu : menus){
					if (!allMenus.contains(menu)){
						allMenus.add(menu);
					}
				}
			}
			String iniValue = "";
			for(MenuResource menu : allMenus){
				if (iniValue != ""){
					iniValue += ",";
				}
				iniValue += String.format("'%s'", menu.getId());
			}
			if (iniValue != ""){
				builder.AddFilterWhere(String.format("id in(%s)", iniValue));
			}
			else {
				builder.AddFilterWhere("1=0");
			}
		}
		builder.AddOrderBy("sortno");
		List<JSONBean> list = this.menuResourceBizService.findAll(MenuResource.class, builder, json);
		JSONResponse(list);
	}
	
	@Override
	public void buildFilterString(Class<JSONBean> clazz,SQLBuilder builder) throws Exception {
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
	
	@Override
	protected JSONBean bizFind() throws Exception {
		JSONBean bean = super.bizFind();
		if (bean instanceof MenuItem){
			MenuItem menu = (MenuItem)bean;
			List<MenuActionDesc> list = menuActionBizService.findActionList(menu.getClazzAction());
			menu.addJSONValue("actionTypes", new HashSet<MenuActionDesc>(list));
		}
		return bean;
	}

	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getParent() {
		return parent;
	}
	public void setParent(String parent) {
		this.parent = parent;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public String getDtype() {
		return dtype;
	}
	public void setDtype(String dtype) {
		this.dtype = dtype;
	}
}