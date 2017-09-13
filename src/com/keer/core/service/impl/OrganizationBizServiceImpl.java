package com.keer.core.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.keer.core.bean.base.User;
import com.keer.core.bean.enums.Status;
import com.keer.core.bean.organization.Corporation;
import com.keer.core.bean.organization.Department;
import com.keer.core.bean.organization.Organization;
import com.keer.core.bean.organization.UserMember;
import com.keer.core.bean.organization.member.DeptMember;
import com.keer.core.dao.SQLBuilder;
import com.keer.core.service.IOrganizationBizService;

@SuppressWarnings("rawtypes")
@Service("organizationBizService")
public class OrganizationBizServiceImpl<T extends Organization> extends GenericBizServiceImpl<T>
		implements IOrganizationBizService<T> {

	@Override
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	public void update(T bean, SQLBuilder builder) throws Exception {
		Boolean isNew = bean.getId() == null;
		super.update(bean, builder);
		Boolean isDrity = bean.isDirty("parent");
		if (isDrity && bean instanceof UserMember){
			throw new Exception("用户成员不能更改上级机构");
		}
		//更新当前组织的公司,部门,岗位的值
		if (isNew || isDrity){
			this.syncOrganization(bean);
		}
	}
	
	@Override
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	public void save(T bean, SQLBuilder builder) throws Exception {
		Boolean isNew = bean.getId() == null;
		super.save(bean, builder);
		Boolean isDrity = bean.isDirty("parent");
		//更新当前组织的公司,部门,岗位的值
		if (isNew || isDrity){
			this.syncOrganization(bean);
		}
		if (bean instanceof UserMember){
			UserMember member = (UserMember)bean;
			User user = member.getUser();
			if (user != null){
				user.setMainMember(member);
				user.setStatus(Status.USING);
				this.dao.save(user);
			}
		}
	}

	@SuppressWarnings("unchecked")
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	private void syncOrganization(T bean) throws Exception{
		String orgFullPath = "";
		bean = this.getBean((T)bean);
		Organization parent = bean;
		while(parent != null){
			orgFullPath = parent.getId() + "/" + orgFullPath;
			parent = this.getBean((T)parent.getParent());
			if (parent != null){
				if (parent instanceof Department){
					if (bean instanceof UserMember){
						UserMember usermember = (UserMember)bean;
						if (!usermember.isDirty("department")){
							usermember.setDepartment((Department)parent);
						}
					}
				}
				else if (parent instanceof Corporation){
					if (bean instanceof DeptMember){
						DeptMember dptmember = (DeptMember)bean;
						if (!dptmember.isDirty("corporation")){
							dptmember.setCorporation((Corporation)parent);
						}
					}
				}
			}
		}
		bean.setOrgFullPath(orgFullPath);
		SQLBuilder sqlbuilder = new SQLBuilder();
		sqlbuilder.AddFilterWhere(String.format("parent='%s'", bean.getId()));
		List<Organization> childs = dao.findAll(Organization.class, sqlbuilder, null);
		for(Organization child : childs){
			this.syncOrganization((T) child);
		}		
	}
}
