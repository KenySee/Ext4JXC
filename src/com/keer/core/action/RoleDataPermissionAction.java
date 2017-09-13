package com.keer.core.action;

import java.io.Serializable;

import com.keer.core.dao.SQLBuilder;

import org.apache.commons.lang.StringUtils;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;

import com.keer.core.bean.base.JSONBean;
import com.keer.core.bean.permission.data.RoleDataPermission;
import com.keer.core.service.IRoleDataPermissionBizService;
import com.keer.core.base.CRUDAction;

@Action("RoleDataPermissionAction")
@SuppressWarnings({ "serial", "rawtypes" })
public class RoleDataPermissionAction extends CRUDAction<RoleDataPermission> {

	@Autowired
	private IRoleDataPermissionBizService roleDataPermissionBizService;
	
	@Override
	public JSONBean bizDefaultBean(JSONBean bean) throws Exception {
		return bean;
	}
	
	@Override
	public Serializable getPrimaryValue(Class<JSONBean> clazz) {
		return this.getId();
	}
	
	private String role;
	
	@Override
	public void buildFilterString(Class<JSONBean> clazz,SQLBuilder builder) throws Exception {
		if (StringUtils.isNotBlank(role)){
			builder.AddFilterWhere(String.format("role='%s'", role));
		}
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
}
