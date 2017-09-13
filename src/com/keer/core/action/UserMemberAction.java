package com.keer.core.action;

import java.io.Serializable;

import org.apache.commons.lang.StringUtils;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;

import com.keer.core.base.CRUDAction;
import com.keer.core.bean.base.JSONBean;
import com.keer.core.bean.organization.UserMember;
import com.keer.core.dao.SQLBuilder;
import com.keer.core.service.IUserMemberBizService;

@Action("UserMemberAction")
@SuppressWarnings({"serial","rawtypes"})
public class UserMemberAction extends CRUDAction<UserMember> {

	@Autowired
	private IUserMemberBizService userMemberBizService;
	
	@Override
	public JSONBean bizDefaultBean(JSONBean bean) throws Exception {
		return bean;
	}
	
	@Override
	public Serializable getPrimaryValue(Class<JSONBean> clazz) {
		return this.getId();
	}
	
	private String code;
	private String name;
	
	private String user;
	
	@Override
	public void buildFilterString(Class<JSONBean> clazz,SQLBuilder builder) throws Exception {
		if (StringUtils.isNotBlank(user)){
			builder.AddFilterWhere(String.format("user = '%s'", user));
		}
		else {
			if (StringUtils.isNotBlank(code)){
				builder.AddFilterWhere(String.format("code = '%s'", code));
			}
			if (StringUtils.isNotBlank(name)){
				builder.AddFilterWhere("name like :name");
				builder.AddParam("name", "%"+name+"%");
			}
		}
	}

	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getUser() {
		return user;
	}
	public void setUser(String user) {
		this.user = user;
	}
}
