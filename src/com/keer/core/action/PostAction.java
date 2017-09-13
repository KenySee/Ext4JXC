package com.keer.core.action;

import java.io.Serializable;

import org.apache.commons.lang.StringUtils;

import com.keer.core.dao.SQLBuilder;

import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;

import com.keer.core.annotation.Permission;
import com.keer.core.bean.base.JSONBean;
import com.keer.core.bean.base.Post;
import com.keer.core.bean.base.Role;
import com.keer.core.service.IPostBizService;
import com.keer.core.service.IRoleBizService;
import com.keer.core.base.CRUDAction;

@Action("PostAction")
@SuppressWarnings({ "serial", "rawtypes" })
public class PostAction extends CRUDAction<Post> {

	@Autowired
	private IPostBizService postBizService;
	
	@Autowired
	private IRoleBizService roleBizService;
	
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
	
	@Override
	public void buildFilterString(Class<JSONBean> clazz,SQLBuilder builder) throws Exception {
		if (StringUtils.isNotBlank(code)) {
			builder.AddFilterWhere("code like '%"+code+"%'");
		}
		if (StringUtils.isNotBlank(name)) {
			builder.AddFilterWhere("name like '%"+name+"%'");
		}
		if (StringUtils.isNotBlank(orderString)){
			builder.AddOrderBy(orderString);
		}
	}
	
	@Permission(bean=Role.class,ignore=true)
	public void findAllRole() throws Exception {
		this.findAll();
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
}
