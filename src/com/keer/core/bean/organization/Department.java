package com.keer.core.bean.organization;

import java.util.Set;

import javax.persistence.Entity;

import net.sf.json.JSONObject;

import com.keer.core.annotation.Description;
import com.keer.core.bean.enums.OrgType;
import com.keer.core.bean.organization.member.DeptMember;
import com.keer.core.bean.organization.member.OrgMember;

@Entity
@Description(Name="部门",Icon="folder_key")
@SuppressWarnings({ "serial", "rawtypes" })
public abstract class Department extends DeptMember<DeptMember,OrgMember> {

	@Override
	public OrgType getOrgType() {
		return OrgType.DEPT;
	}
	@Override
	public String getIndexCls() {
		return "folder_key";
	}
	@Override
	protected JSONObject attachJson(JSONObject json) {
		json.put("iconCls", "folder_key");
		return super.attachJson(json);
	}
	@Override
	@Description(Name="机构成员",Icon="folder_key")
	public Set<DeptMember> getChilds() {
		return super.getChilds();
	}
	
	@Override
	public void setChilds(Set<DeptMember> childs) {
		super.setChilds(childs);
	}
}
