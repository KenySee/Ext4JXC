package com.keer.core.bean.permission.data;

import javax.persistence.Entity;

import com.keer.core.annotation.Description;
import com.keer.core.bean.permission.RoleResourcePermission;
import com.keer.core.bean.resource.DataResource;

@Entity
@Description(Name="角色数据权限")
@SuppressWarnings({ "serial" })
public abstract class RoleDataPermission<T extends DataResource> extends RoleResourcePermission<T> {

}
