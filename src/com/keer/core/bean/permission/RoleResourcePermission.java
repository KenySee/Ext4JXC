package com.keer.core.bean.permission;

import javax.persistence.DiscriminatorColumn;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import com.keer.core.annotation.Description;
import com.keer.core.bean.base.GenericBean;
import com.keer.core.bean.base.Role;
import com.keer.core.bean.resource.Resource;

@Entity
@Description(Name="角色资源权限")
@DiscriminatorColumn(length=255)
@Table(name="ts_role_resource")
@SuppressWarnings({"serial"})
public abstract class RoleResourcePermission<T extends Resource> extends GenericBean {

	@Description(Name="序号")
	private Integer sortno;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@Description(Name="角色")
	private Role role;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@Fetch(FetchMode.JOIN)
	@Description(Name="资源")
	private Resource resource;

	public Integer getSortno() {
		return sortno;
	}

	public void setSortno(Integer sortno) {
		this.sortno = sortno;
	}

	@SuppressWarnings("unchecked")
	public T getResource() {
		return (T) resource;
	}

	public void setResource(T resource) {
		this.resource = resource;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}
}
