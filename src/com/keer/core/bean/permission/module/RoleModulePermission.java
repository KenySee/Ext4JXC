package com.keer.core.bean.permission.module;


import javax.persistence.Entity;

import com.keer.core.annotation.Description;
import com.keer.core.bean.menu.Menu;
import com.keer.core.bean.permission.RoleResourcePermission;

@Entity
@Description(Name="角色模块权限")
@SuppressWarnings("serial")
public class RoleModulePermission extends RoleResourcePermission<Menu> {

}
