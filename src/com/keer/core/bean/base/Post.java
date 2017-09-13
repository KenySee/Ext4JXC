package com.keer.core.bean.base;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.keer.core.annotation.Description;

@Entity
@Description(Name="岗位")
@Table(name="ts_post")
@SuppressWarnings("serial")
public abstract class Post extends BaseBean {

	/**
	 * 岗位角色
	 */
	@Description(Name="岗位角色")
	@ManyToMany
	@JoinTable(
		name = "ts_post_role",
		joinColumns = { @JoinColumn(name="post_id") },
		inverseJoinColumns = { @JoinColumn(name="role_id") }				
	)
	private Set<Role> roles = new HashSet<Role>();

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}
}
