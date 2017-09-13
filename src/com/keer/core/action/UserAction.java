package com.keer.core.action;

import java.io.Serializable;

import org.apache.commons.lang.StringUtils;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;

import com.keer.core.base.CRUDAction;
import com.keer.core.bean.base.JSONBean;
import com.keer.core.bean.base.User;
import com.keer.core.bean.enums.Status;
import com.keer.core.dao.SQLBuilder;
import com.keer.core.service.IUserBizService;

@Action("UserAction")
@SuppressWarnings({ "serial", "rawtypes" })
public class UserAction extends CRUDAction<User> {

	@Autowired
	private IUserBizService userBizService;
	
	
	@Override
	public JSONBean bizDefaultBean(JSONBean bean) throws Exception {
		User user = (User)bean;
		user.setPassword("123");
		user.setStatus(Status.USING);
		return user;		
	}
	
	@Override
	public Serializable getPrimaryValue(Class<JSONBean> clazz) {
		return this.getId();
	}
	
	private String code;
	private String name;
	private String mainMember;
	private String newPassword;
	private String oldPassword;
	
	@Override
	public void buildFilterString(Class<JSONBean> clazz,SQLBuilder builder) throws Exception {
		if (StringUtils.isNotBlank(code)) {
			builder.AddFilterWhere("code like '%"+code+"%'");
		}
		if (StringUtils.isNotBlank(name)) {
			builder.AddFilterWhere("name like '%"+name+"%'");
		}
		if (StringUtils.isNotBlank(mainMember)){
			builder.AddFilterWhere(String.format("mainMember = '%s'",mainMember));
		}
	}
	
	public void changePWD() throws Exception {
		if(StringUtils.isNotBlank(newPassword) && StringUtils.isNotBlank(oldPassword)) {
			User user = getLoginUser().getUser();
			if(!user.getPassword().equals(oldPassword)){
				throw new Exception("原密码错误");
			}
			user.setPassword(newPassword);
			dao.save(user);
			response("{success:true}");
		}else {
			throw new Exception("密码格式错误");
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
	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}
	public void setOldPassword(String oldPassword) {
		this.oldPassword = oldPassword;
	}
	public String getMainMember() {
		return mainMember;
	}
	public void setMainMember(String mainMember) {
		this.mainMember = mainMember;
	}
}
