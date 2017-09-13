package com.keer.core.bean.base;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import com.keer.core.annotation.Description;
import com.keer.core.bean.organization.UserMember;
import com.keer.core.bean.organization.member.DeptMember;

@Entity
@Table(name="ts_user")
@Description(Name="用户管理")
@DiscriminatorColumn(length=255)
@Inheritance(strategy=InheritanceType.SINGLE_TABLE)
@SuppressWarnings({"serial","rawtypes"})
public abstract class User extends BaseBean {

	public User(){
		
	}

	@Description(Name="登录名")
	private String loginname;
	
	@Description(Name="密码")
	private String password;
	
	@Description(Name="管理员")
	@Column(nullable=false)
	private Boolean isAdmin = false;
	
	@Description(Name="人员成员")
	@OneToMany(mappedBy="user")
	private Set<UserMember> userMembers;
	
	@Description(Name="默认成员")
	@ManyToOne
	@Fetch(FetchMode.JOIN)
	private DeptMember mainMember;
	
	public User(String code, String name, String loginname, String password, Boolean isAdmin){
		this.setCode(code);
		this.setName(name);
		this.setLoginname(loginname);
		this.setPassword(password);
		this.setIsAdmin(isAdmin);
	}
	
	public String getLoginname() {
		return loginname;
	}

	public void setLoginname(String loginname) {
		this.loginname = loginname;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Boolean getIsAdmin() {
		return isAdmin;
	}

	public void setIsAdmin(Boolean isAdmin) {
		this.isAdmin = isAdmin;
	}

	public Set<UserMember> getUserMembers() {
		return userMembers;
	}

	public void setUserMembers(Set<UserMember> userMembers) {
		this.userMembers = userMembers;
	}

	public DeptMember getMainMember() {
		return mainMember;
	}

	public void setMainMember(DeptMember mainMember) {
		this.mainMember = mainMember;
	}	
}
