package com.keer.core.bean.organization;

import java.util.Set;

import javax.persistence.Entity;

import net.sf.json.JSONObject;

import com.keer.core.annotation.Description;
import com.keer.core.bean.enums.OrgType;
import com.keer.core.bean.enums.Status;
import com.keer.core.bean.organization.member.OrgMember;

@Entity
@Description(Name="公司",Icon="folder_home")
@SuppressWarnings({ "serial" })
public abstract class Corporation extends OrgMember<Department,Corporation>{

	
	public Corporation(){
		
	}
	public Corporation(String code, String name, String sortno){
		this.setCode(code);
		this.setName(name);
		this.setSortno(sortno);
		this.setStatus(Status.USING);
	}
	
	@Override
	public OrgType getOrgType() {
		return OrgType.CORP;
	}
	
	@Override
	public String getIndexCls() {
		return "folder_home";
	}
	
	@Override
	protected JSONObject attachJson(JSONObject json) {
		json.put("iconCls", "folder_home");
		return super.attachJson(json);
	}
	@Override
	@Description(Name="下级机构",Icon="chart_organisation")
	public Set<Department> getChilds() {
		return super.getChilds();
	}
	
	@Override
	public void setChilds(Set<Department> childs) {
		super.setChilds(childs);
	}
}
