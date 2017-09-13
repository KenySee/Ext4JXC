package com.keer.core.bean.permission.data;

import javax.persistence.Entity;

import com.keer.core.annotation.Description;
import com.keer.core.bean.resource.EntityResource;

@Entity
@Description(Name="实体资源")
@SuppressWarnings("serial")
public class RoleEntityPermission extends RoleDataPermission<EntityResource> {

	@Description(Name="访问范围")
	private String clazzScope;

	public String getClazzScope() {
		return clazzScope;
	}

	public void setClazzScope(String clazzScope) {
		this.clazzScope = clazzScope;
	}
}
