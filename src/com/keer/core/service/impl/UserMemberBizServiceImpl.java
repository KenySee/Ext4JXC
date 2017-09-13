package com.keer.core.service.impl;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.keer.core.bean.base.Post;
import com.keer.core.bean.base.Role;
import com.keer.core.bean.base.User;
import com.keer.core.bean.comm.SystemVar;
import com.keer.core.bean.organization.UserMember;
import com.keer.core.dao.SQLBuilder;
import com.keer.core.service.IRoleBizService;
import com.keer.core.service.IUserMemberBizService;

@Service("userMemberBizService")
public class UserMemberBizServiceImpl<T extends UserMember> extends OrganizationBizServiceImpl<T> implements IUserMemberBizService<T> {

	@Autowired
	private IRoleBizService roleBizService;
	
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	public Set<Role> findAllRole(T bean) throws Exception {
		bean = this.getBean(bean);
		Set<Role> roles = new HashSet<Role>();
		if (SystemVar.MemberRole){
			roles = bean.getRoles();
		}
		if (SystemVar.OrgRole){
			Set<Role> orgRoles = bean.getOrgRoles();
			for(Role role : orgRoles){
				if (!roles.contains(role)){
					roles.add(role);
				}
			}
		}
		if (SystemVar.PostRole){
			Post post = bean.getPost();
			if (post != null){
				Set<Role> postRoles = post.getRoles();
				for(Role role : postRoles){
					if (!roles.contains(role)){
						roles.add(role);
					}
				}
			}
		}
		return roles;
	}
	
	@Override
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	public void save(T bean, SQLBuilder builder) throws Exception {
		super.save(bean, builder);
		User user = bean.getUser();
		if (user != null){
			user.setMainMember(bean);
			this.dao.save(user);
		}
	}
}
