package com.keer.core.bean.organization.member;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;

import com.keer.core.annotation.Description;
import com.keer.core.bean.organization.Corporation;

@Entity
@Description(Name="部门成员")
@SuppressWarnings({ "serial", "rawtypes" })
public abstract class DeptMember<C extends DeptMember, T extends OrgMember> extends OrgMember<C, T> {

	/**
	 * 所属公司
	 */
	@Description(Name="所属公司")	
	@ManyToOne(fetch=FetchType.LAZY)
	private Corporation corporation;
	

	public Corporation getCorporation() {
		return corporation;
	}

	public void setCorporation(Corporation corporation) {
		if (corporation != null){
			if (this.corporation == null || !corporation.getId().equals(this.corporation.getId())){
				this.addDirty("corporation");
			}
		}
		this.corporation = corporation;
	}

}
