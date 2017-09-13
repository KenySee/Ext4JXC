package com.keer.core.service.impl;

import org.springframework.stereotype.Service;

import com.keer.core.bean.permission.RoleResourcePermission;
import com.keer.core.service.IRoleResourcePermissionBizService;
import com.keer.core.service.impl.GenericBizServiceImpl;

@SuppressWarnings("rawtypes")
@Service("roleResourcePermissionBizService")
public class RoleResourcePermissionBizServiceImpl<T extends RoleResourcePermission> extends GenericBizServiceImpl<T> implements IRoleResourcePermissionBizService<T> {

}