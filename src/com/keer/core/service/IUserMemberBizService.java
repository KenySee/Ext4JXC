package com.keer.core.service;

import java.util.Set;

import com.keer.core.annotation.TopSubClass;
import com.keer.core.bean.base.Role;
import com.keer.core.bean.organization.UserMember;

@TopSubClass(UserMember.class)
public interface IUserMemberBizService<T extends UserMember> extends IOrganizationBizService<T> {

	public Set<Role> findAllRole(T bean) throws Exception;
}
