package com.keer.core.bean.permission.data;

import javax.persistence.Entity;

import com.keer.core.annotation.Description;
import com.keer.core.bean.resource.BundleResource;

@Entity
@Description(Name="打包资源")
@SuppressWarnings({ "serial", "rawtypes" })
public class RoleBundlePermission extends RoleDataPermission<BundleResource> {

}
