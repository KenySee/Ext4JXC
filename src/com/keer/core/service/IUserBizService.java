package com.keer.core.service;

import com.keer.core.annotation.TopSubClass;
import com.keer.core.bean.base.User;


/**
 * 通用业务服务接口
 * @author 周方明
 *
 */
@TopSubClass(User.class)
public interface IUserBizService<T extends User> extends IGenericBizService<T> {

	/**
	 * 登录验证  0表示登录成功，非0表示登录失败
	 */
	public int LoginValidate(String loginName, String passWord)  throws Exception;
	
	/**
	 * 获取验证消息
	 */
	public String ValidateMessage(int msgCode);
	
	/**
	 * 检查是否登录成功
	 */
	public boolean LoginSuccess(int msgCode);
	
	/**
	 * 根据登录名返回用户
	 */
	public User findUserByLoginName(String loginName)  throws Exception;
	
}
