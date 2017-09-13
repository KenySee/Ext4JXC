package com.keer.core.bean.permission.module.action;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

import com.keer.core.annotation.Description;
import com.keer.core.bean.resource.OrgMemberResource;

@Entity
@Description(Name="业务管理权限",Icon="application_osx_key")
@SuppressWarnings("serial")
public class RoleBussinessActionPermission extends RoleModuleActionPermission {

	@Description(Name="机构资源")
	@ManyToOne
	private OrgMemberResource org;

	public OrgMemberResource getOrg() {
		return org;
	}

	public void setOrg(OrgMemberResource org) {
		this.org = org;
	}

}
