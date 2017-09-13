package com.keertech.demo.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;

import com.keertech.demo.bean.extend.GenericUser;
import com.keertech.demo.bean.extend.GenericUserMember;
import com.keertech.demo.service.IGenericUserBizService;
import com.keer.core.bean.base.User;
import com.keer.core.bean.organization.UserMember;
import com.keer.core.bean.organization.member.DeptMember;
import com.keer.core.dao.SQLBuilder;
import com.keer.core.secure.Context;
import com.keer.core.service.IMenuResourceBizService;
import com.keer.core.web.LoginAction;
@SuppressWarnings("serial")
public class UserLoginAction extends LoginAction {

	@Autowired
	private IGenericUserBizService genericUserBizService;
	
	@SuppressWarnings("rawtypes")
	@Autowired
	private IMenuResourceBizService menuBizService;
	
	private String enterprise;
	
	private String userMemberId;
	
	private String id;
	
	@SuppressWarnings("rawtypes")
	public String verify() throws Exception{
		UserMember member = new GenericUserMember();
		Integer msgCode = genericUserBizService.LoginValidate(this.getUsername(), this.getPassword(), member);
		if (genericUserBizService.LoginSuccess(msgCode)){
			User user = genericUserBizService.findUserByLoginName(this.getUsername(),member);
			DeptMember mainmember = user.getMainMember();
			if (mainmember != null && mainmember instanceof UserMember){
				Context.setCurrentUser(this.request.getSession(), (UserMember)mainmember);
				this.response("{\"success\":true}");
				return "main";
			}
			else {
				if (user.getIsAdmin()){
					throw new Exception("管理员没有设置用户成员，无法登录");
				}
				else {
					throw new Exception("当前用户没有设置用户成员，无法登录");
				}
			}
		}
		else {
			int count = dao.findRecordCount(User.class, new SQLBuilder());
			if (count == 0){
				User user = new GenericUser();
				user.setLoginname(this.getUsername());
				user.setPassword(this.getPassword());
				member.setUser(user);
				menuBizService.InitializerMenu(member);
				user = genericUserBizService.findUserByLoginName(this.getUsername(),member);
				DeptMember mainmember = user.getMainMember();
				if (mainmember != null && mainmember instanceof UserMember){
					Context.setCurrentUser(this.request.getSession(), (UserMember)mainmember);
					this.response("{\"success\":true}");
					return "main";
				}
			}
			String msg = genericUserBizService.ValidateMessage(msgCode);
			throw new Exception(msg);
		}
	}

	
	
	public void getAllUserMemberInfo() throws Exception{
		List<Map<String,Object>> mapList=new ArrayList<Map<String,Object>>();
		HttpSession session = request.getSession();		
		UserMember userMember = Context.getCurrentUser(session);//当前session里面的用户成员对象
		SQLBuilder sqlBuilder=new SQLBuilder();
		sqlBuilder.AddFilterWhere(String.format("user.id='%s'", userMember.getUser().getId()));
		this.json="{id:null,code:null,name:null,parent:{id:null,code:null,name:null}}";
		List<UserMember> userMemberList=dao.findAll(UserMember.class, sqlBuilder,this.json);
		for(UserMember member:userMemberList){
			Map<String,Object> map=new HashMap<String,Object>();
			if(member.getParent()!=null){
				map.put("id", member.getId());
				map.put("memberName", member.getName());
				map.put("postName", member.getParent().getName());
				if(userMember.getId().equals(member.getId())){
					map.put("isBoo", Boolean.TRUE);
				}else{
					map.put("isBoo", Boolean.FALSE);
				}
			}
			mapList.add(map);
		}
		this.JSONResponse(mapList);
		
	}
	
	public void doConvertPost() throws Exception{
		if(userMemberId!=null && !userMemberId.equals("")){
			UserMember userMember=dao.find(UserMember.class, userMemberId, null);
			if(userMember!=null){
				Context.setCurrentUser(this.request.getSession(), userMember);
				this.response("{success:true}");
			}else{
				throw new Exception("用户成员对象为空!");
			}
		}else{
			throw new Exception("用户成员ID为空!");
		}
	}
	
	
	public void findLoginUser() throws Exception{
		HttpSession session = request.getSession();		
		UserMember userMember = Context.getCurrentUser(session);//当前session里面的用户成员对象
		if(userMember!=null){
			User user=dao.find(User.class, userMember.getUser().getId(), "{id:null,code:null,name:null,loginname:null,password:null}");
			this.JSONResponse(user);
		}else{
			throw new Exception("当前用户成员对象为空!");
		}
	}
	
	public void saveUserLoginPass() throws Exception{
		if(id!=null && this.getPassword()!=null && !this.getPassword().trim().equals("")){
			String sql="update ts_user set password='"+this.getPassword()+"' where id='"+id+"'";
			dao.executeUpdate(sql);
			response("{success:true}");
		}else{
			throw new Exception("用户ID或密码为空,无法更新数据!");
		}
	}
	
	public String getEnterprise() {
		return enterprise;
	}

	public void setEnterprise(String enterprise) {
		this.enterprise = enterprise;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUserMemberId() {
		return userMemberId;
	}

	public void setUserMemberId(String userMemberId) {
		this.userMemberId = userMemberId;
	}
	
}
