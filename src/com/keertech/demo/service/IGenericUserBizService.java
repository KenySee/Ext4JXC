package com.keertech.demo.service;

import com.keer.core.bean.base.User;
import com.keer.core.bean.organization.UserMember;
import com.keer.core.service.IUserBizService;
import com.keertech.demo.bean.extend.GenericUser;

public interface IGenericUserBizService extends IUserBizService<GenericUser> {

	/**
	 * 登录验证  0表示登录成功，非0表示登录失败
	 */
	public int LoginValidate(String loginName, String passWord,UserMember user)  throws Exception;
	
	
	/**
	 * 根据登录名返回用户
	 */
	public User findUserByLoginName(String loginName,UserMember user)  throws Exception;
}
