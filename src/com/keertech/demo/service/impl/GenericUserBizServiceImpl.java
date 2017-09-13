package com.keertech.demo.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.keer.core.bean.base.User;
import com.keer.core.bean.organization.UserMember;
import com.keer.core.dao.SQLBuilder;
import com.keer.core.service.impl.UserBizServiceImpl;
import com.keertech.demo.bean.extend.GenericUser;
import com.keertech.demo.service.IGenericUserBizService;

@Service("genericUserBizService")
public class GenericUserBizServiceImpl extends UserBizServiceImpl<GenericUser> implements IGenericUserBizService {

	@Override
	public User findUserByLoginName(String loginName,UserMember user)  throws Exception{
		SQLBuilder builder = new SQLBuilder();
		builder.AddFilterWhere("loginname = :loginname");
		builder.AddParam("loginname",loginName.trim());
		List<User> list = dao.findAll(User.class, builder,null);
		if (list == null || list.size() == 0){
			return null;
		}		
		return list.get(0);
	}

	public int LoginValidate(String loginName, String passWord,UserMember user)  throws Exception{
		User bean = findUserByLoginName(loginName,user);
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
}
