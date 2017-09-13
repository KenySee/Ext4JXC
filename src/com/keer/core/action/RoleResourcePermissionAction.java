package com.keer.core.action;

import java.io.Serializable;

import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;

import com.keer.core.bean.base.JSONBean;
import com.keer.core.bean.permission.RoleResourcePermission;
import com.keer.core.service.IRoleResourcePermissionBizService;
import com.keer.core.base.CRUDAction;
import com.keer.core.dao.SQLBuilder;

@Action("RoleResourcePermissionAction")
@SuppressWarnings({ "serial", "rawtypes" })
public class RoleResourcePermissionAction extends CRUDAction<RoleResourcePermission> {

	@Autowired
	private IRoleResourcePermissionBizService roleResourcePermissionBizService;
	
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
