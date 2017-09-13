package com.keer.core.bean.organization;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.DiscriminatorColumn;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import com.keer.core.accessscope.handler.ScopeCorporation;
import com.keer.core.accessscope.handler.ScopeDepartment;
import com.keer.core.annotation.Description;
import com.keer.core.annotation.ScopeProperty;
import com.keer.core.annotation.TopSubClass;
import com.keer.core.bean.base.BaseBean;
import com.keer.core.bean.base.Role;
import com.keer.core.bean.enums.OrgType;

@Entity
@Table(name="ts_organization")
@DiscriminatorColumn(length=255)
@Inheritance(strategy=InheritanceType.SINGLE_TABLE)
@Description(Name="组织机构")
@TopSubClass(Corporation.class)
@ScopeProperty({ScopeCorporation.class, ScopeDepartment.class})
@SuppressWarnings({ "serial", "rawtypes", "unchecked" })
public abstract class Organization<C extends Organization, T extends Organization> extends BaseBean{

	@ManyToOne(fetch=FetchType.LAZY)
	@Fetch(FetchMode.JOIN)
	@Description(Name="角色")
	private Role role;
	
	/**
	 * 机构全路径
	 */
	private String orgFullPath;
	
	@Transient
	@Description(Name="机构类型")
	private OrgType orgType;
	
	@Description(Name="上级机构")
	@ManyToOne(fetch=FetchType.LAZY)
	@Fetch(FetchMode.JOIN)
	private Organization parent;
	
	
	@Description(Name="机构",Icon="chart_organisation")
	@OneToMany(mappedBy="parent")
	private Set<Organization> childs = new HashSet<Organization>();
	
	public Set<C> getChilds() {
		return (Set<C>) childs;
	}

	public void setChilds(Set<C> childs) {
		this.childs = (Set<Organization>) childs;
	}
	
	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}
	
	public T getParent() {
		return (T)parent;
	}
	
	public void setParent(T parent) {
		if (parent != null){
			if (this.parent == null || !parent.getId().equals(this.parent.getId())){
				this.addDirty("parent");
			}
		}
		this.parent = parent;
	}

	public String getOrgFullPath() {
		return orgFullPath;
	}

	public void setOrgFullPath(String orgFullPath) {
		this.orgFullPath = orgFullPath;
	}

	public abstract OrgType getOrgType();

	public void setOrgType(OrgType orgType) {
	}
}

