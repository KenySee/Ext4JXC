package com.keer.core.bean.permission.data;

import javax.persistence.Entity;

import com.keer.core.annotation.Description;
import com.keer.core.bean.portal.PortalResource;

@Entity
@Description(Name="门户资源")
@SuppressWarnings("serial")
public class RolePortalPermission extends RoleDataPermission<PortalResource> {

}
