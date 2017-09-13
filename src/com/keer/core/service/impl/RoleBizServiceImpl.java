package com.keer.core.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.keer.core.bean.base.Role;
import com.keer.core.service.IRoleBizService;
import com.keer.core.service.IRoleModuleActionPermissionBizService;

@Transactional
@Service("roleBizService")
public class RoleBizServiceImpl extends GenericBizServiceImpl<Role> implements IRoleBizService {

	@Autowired
	private IRoleModuleActionPermissionBizService roleModuleActionPermissionBizService;
}
