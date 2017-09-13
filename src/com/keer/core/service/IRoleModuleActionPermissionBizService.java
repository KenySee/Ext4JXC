package com.keer.core.service;

import java.util.Set;

import com.keer.core.bean.menu.MenuResource;
import com.keer.core.bean.permission.module.action.RoleModuleActionPermission;
import com.keer.core.service.IAuthorityBizService;

public interface IRoleModuleActionPermissionBizService extends IAuthorityBizService<RoleModuleActionPermission> {

	public Set<MenuResource> findMenuResourceByRole(String roleid,String json) throws Exception;
}