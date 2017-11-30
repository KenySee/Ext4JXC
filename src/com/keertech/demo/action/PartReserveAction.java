package com.keertech.demo.action;
import org.apache.commons.lang.StringUtils;
import com.keer.core.dao.SQLBuilder;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;

import com.keertech.demo.bean.PartReserve;
import com.keertech.demo.service.IPartReserveBizService;
import com.keer.core.annotation.Description;
import com.keer.core.base.CRUDAction;
import com.keer.core.bean.base.JSONBean;

@Description(Name="用户预订表")
@Action("PartReserveAction")
@SuppressWarnings({"serial","rawtypes"})
public class PartReserveAction extends CRUDAction<PartReserve> {

	@Autowired
	private IPartReserveBizService partReserveBizService;
	
	private String code;
	private String status;
	private String userName;
	private String userMobile;
	private String createdTime;
	
	@Override
	public JSONBean bizDefaultBean(JSONBean bean) throws Exception {
		return bean;
	}
		
	@Override
	public void buildFilterString(Class<JSONBean> clazz, SQLBuilder builder) throws Exception {
		String beanName = clazz.getSimpleName();
		if (beanName.equals("PartReserve")){
			if (StringUtils.isNotBlank(code)) {
				builder.AddFilterWhere("code like '%"+code+"%'");
			}
			if (StringUtils.isNotBlank(status)) {
				builder.AddFilterWhere(String.format("status = '%s'", status));
			}
			if (StringUtils.isNotBlank(userName)) {
				builder.AddFilterWhere("userName like '%"+userName+"%'");
			}
			if (StringUtils.isNotBlank(userMobile)) {
				builder.AddFilterWhere("userMobile like '%"+userMobile+"%'");
			}
			if (StringUtils.isNotBlank(createdTime)) {
				builder.AddFilterWhere(String.format("createdTime = '%s'", createdTime));
			}
			System.out.println("PartReserve");
		}
	}
	
	public String getCode() {
		return code;
	}
	
	public void setCode(String code) {
		this.code = code;
	}
	
	public String getStatus() {
		return status;
	}
	
	public void setStatus(String status) {
		this.status = status;
	}
	
	public String getUserName() {
		return userName;
	}
	
	public void setUserName(String userName) {
		this.userName = userName;
	}
	
	public String getUserMobile() {
		return userMobile;
	}
	
	public void setUserMobile(String userMobile) {
		this.userMobile = userMobile;
	}
	
	public String getCreatedTime() {
		return createdTime;
	}
	
	public void setCreatedTime(String createdTime) {
		this.createdTime = createdTime;
	}
}
