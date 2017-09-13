package com.keer.core.service;


import com.keer.core.annotation.TopSubClass;
import com.keer.core.bean.organization.member.DeptMember;

@SuppressWarnings("rawtypes")
@TopSubClass(DeptMember.class)
public interface IDeptMemberBizService<T extends DeptMember> extends IOrganizationBizService<T> {

}
