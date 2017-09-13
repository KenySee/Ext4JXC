package com.keer.core.bean.permission.module.action;

import javax.persistence.Entity;

import com.keer.core.annotation.Description;

@Entity
@Description(Name="机构管理权限",Icon="chart_organisation")
@SuppressWarnings("serial")
public class RoleOrganizationActionPermission extends RoleModuleActionPermission {

	@Description(Name="访问范围")
	private String clazzScope;

	public String getClazzScope() {
		return clazzScope;
	}

	public void setClazzScope(String clazzScope) {
		this.clazzScope = clazzScope;
	}
}
