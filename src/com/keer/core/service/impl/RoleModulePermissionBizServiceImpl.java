package com.keer.core.service.impl;

import org.springframework.stereotype.Service;

import com.keer.core.bean.permission.module.RoleModulePermission;
import com.keer.core.service.IRoleModulePermissionBizService;

@Service("roleModulePermissionBizService")
public class RoleModulePermissionBizServiceImpl extends RoleResourcePermissionBizServiceImpl<RoleModulePermission> implements IRoleModulePermissionBizService {

}