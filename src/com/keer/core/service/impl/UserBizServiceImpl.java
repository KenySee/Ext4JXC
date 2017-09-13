package com.keer.core.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.keer.core.bean.base.User;
import com.keer.core.dao.SQLBuilder;
import com.keer.core.service.IDeptMemberBizService;
import com.keer.core.service.IUserBizService;

@Transactional
@Service("userBizService")
public class UserBizServiceImpl<T extends User> extends GenericBizServiceImpl<T> implements IUserBizService<T> {

	@SuppressWarnings("rawtypes")
	@Autowired
	private IDeptMemberBizService deptMemberBizService;
	
	private String[] loginMessage = {"用户名不存在",
			 "用户密码错误",
			 "该用户被限制登录,请与系统管理员联系",
			 "该用户未激活,请与系统管理员联系"};
	
	public String ValidateMessage(int msgCode) {
		if (msgCode <= 0 || msgCode > loginMessage.length)
			return null;
		else {
			return loginMessage[msgCode-1];
		}
	}

	public int LoginValidate(String loginName, String passWord)  throws Exception{
		User bean = findUserByLoginName(loginName);
		if (bean == null){
			return 1;
		}
		else{
			String pwd = passWord.trim();//new MD5().getMD5ofStr(passWord);
			if (bean.IsDisable()){
				return 3;
			}
			else if (!bean.IsActive()){
				return 4;
			}
			else if (passWord != null && pwd.equals(bean.getPassword())){
				return 0;
			}
			else {
				return 2;
			}
		}
	}

	public User findUserByLoginName(String loginName)  throws Exception{
		SQLBuilder builder = new SQLBuilder();
		builder.AddFilterWhere("loginname = :loginname");
		builder.AddParam("loginname", loginName.trim());
		List<User> list = dao.findAll(User.class, builder,null);
		if (list == null || list.size() == 0){
			return null;
		}		
		return list.get(0);
	}
	
	public boolean LoginSuccess(int msgCode) {
		return msgCode == 0;
	}
}
