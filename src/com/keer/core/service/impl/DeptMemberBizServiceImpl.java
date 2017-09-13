package com.keer.core.service.impl;

import org.springframework.stereotype.Service;

import com.keer.core.bean.organization.member.DeptMember;
import com.keer.core.service.IDeptMemberBizService;

@SuppressWarnings("rawtypes")
@Service("deptMemberBizService")
public class DeptMemberBizServiceImpl<T extends DeptMember> extends OrganizationBizServiceImpl<T> implements IDeptMemberBizService<T> {

	
}