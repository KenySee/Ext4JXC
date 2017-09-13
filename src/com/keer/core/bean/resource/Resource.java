package com.keer.core.bean.resource;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.DiscriminatorColumn;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.keer.core.annotation.Description;
import com.keer.core.bean.base.BaseBean;
import com.keer.core.bean.permission.RoleResourcePermission;

@Entity
@Description(Name="资源")
@Table(name="ts_resource")
@DiscriminatorColumn(length=255)
@SuppressWarnings({"serial","rawtypes"})
public abstract class Resource extends BaseBean {


	@Description(Name="能否授权")
	private Boolean canAuthorize;
	
	/**
	 * 资源权限集合
	 */
	@Description(Name="权限集合")
	@OneToMany(mappedBy="resource")
	private Set<RoleResourcePermission> permissions = new HashSet<RoleResourcePermission>();
	
	
	public void setPermissions(Set<RoleResourcePermission> permissions) {
		this.permissions = permissions;
	}

	public Set<RoleResourcePermission> getPermissions() {
		return permissions;
	}
	

	public abstract String getClazzparent();

	public Boolean getCanAuthorize() {
		return canAuthorize;
	}

	public void setCanAuthorize(Boolean canAuthorize) {
		this.canAuthorize = canAuthorize;
	}
}
