package com.keer.core.action;

import java.io.Serializable;

import com.keer.core.dao.SQLBuilder;

import org.apache.struts2.convention.annotation.Action;

import com.keer.core.bean.base.JSONBean;
import com.keer.core.bean.permission.module.action.RoleModuleActionPermission;
import com.keer.core.base.CRUDAction;

@Action("RoleModuleActionPermissionAction")
@SuppressWarnings({"serial","rawtypes"})
public class RoleModuleActionPermissionAction extends CRUDAction<RoleModuleActionPermission> {

	@Override
	public JSONBean bizDefaultBean(JSONBean bean) throws Exception {
		return bean;
	}
	
	@Override
	public Serializable getPrimaryValue(Class<JSONBean> clazz) {
		return this.getId();
	}
	@Override
	public void buildFilterString(Class<JSONBean> clazz,SQLBuilder builder) throws Exception {
	}
}
