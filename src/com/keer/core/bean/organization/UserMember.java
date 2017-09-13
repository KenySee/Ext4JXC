package com.keer.core.bean.organization;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Transient;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import net.sf.json.JSONObject;

import com.keer.core.annotation.Description;
import com.keer.core.annotation.ExcludeSubClass;
import com.keer.core.bean.base.Post;
import com.keer.core.bean.base.Role;
import com.keer.core.bean.base.User;
import com.keer.core.bean.enums.OrgType;
import com.keer.core.bean.organization.member.DeptMember;

@Entity
@Description(Name="人员成员")
@SuppressWarnings({"serial","rawtypes"})
public abstract class UserMember extends DeptMember<UserMember,Department> {

	@Transient
	private String sessionId;
	
	@ManyToOne
	@Description(Name="用户")
	@Fetch(FetchMode.JOIN)
	private User user;
	
	@ManyToOne
	@Description(Name="所属部门")
	private Department department;

	
	@ManyToOne
	@Description(Name="所属岗位")
	private Post post;
	
	/**
	 * 成员角色
	 */
	@Description(Name="成员角色")
	@ManyToMany
	@JoinTable(
		name = "ts_member_role",
		joinColumns = { @JoinColumn(name="member_id") },
		inverseJoinColumns = { @JoinColumn(name="role_id") }				
	)
	private Set<Role> roles = new HashSet<Role>();
	
	@Transient
	@Description(Name="机构角色")
	private Set<Role> orgRoles = new HashSet<Role>();
	
	
	@Transient
	@Description(Name="角色组织")
	private Set<Organization> parentOrgRoles = new HashSet<Organization>();
	
	
	@Override
	public OrgType getOrgType() {
		return OrgType.USER;
	}
	@Override
	public String getIndexCls() {
		return "user";
	}
	@Override
	protected JSONObject attachJson(JSONObject json) {
		json.put("leaf", true);
		json.put("iconCls", "user");
		return super.attachJson(json);
	}
	
	@Override
	public void GeneratorKey() throws Exception{
		Organization parent = this.getParent();
		User user = this.getUser();
		if (parent != null && user != null){
			this.setId(String.format("%s.%s", parent.getId(),user.getId()));
		}
		else {
			throw new Exception("无法生成主键");
		}
	}
	
	@Override
	@ExcludeSubClass({UserMember.class})
	public Set<UserMember> getChilds() {
		return super.getChilds();
	}
	
	@Override
	@ExcludeSubClass({UserMember.class})
	public void setChilds(Set<UserMember> childs) {
		super.setChilds(childs);
	}
	
	/**
	 * 获取所有上级组织机构
	 * @return
	 */
	public Set<Organization> getAllParent(){
		Set<Organization> allParent = new HashSet<Organization>();
		Organization parent = this.getParent();
		while(parent != null){
			allParent.add(parent);
			parent = parent.getParent();
		}
		return allParent;
	}
	
	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		if (user != null){
			if (this.user == null || !user.getId().equals(this.user.getId())){
				this.addDirty("user");
			}
		}
		this.user = user;		
	}
	
	public Department getDepartment() {
		return this.department;
	}

	public void setDepartment(Department department) {
		if (department != null){
			if (this.department == null || !department.getId().equals(this.department.getId())){
				this.addDirty("department");
			}
		}
		this.department = department;
	}
	
	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

	public Set<Role> getOrgRoles() {
		if (orgRoles == null){
			orgRoles = new HashSet<Role>();
		}
		else {
			orgRoles.clear();
		}
		Set<Organization> parents = getAllParent();
		parents.add(this);
		for(Organization parent : parents){
			Role role = parent.getRole();
			if (role != null && !orgRoles.contains(role)){
				orgRoles.add(role);
			}
		}
		return orgRoles;
	}

	public void setOrgRoles(Set<Role> orgRoles) {
		
	}

	/**
	 * 获取设置了机构角色的所有上级组织机构
	 * @return
	 */
	public Set<Organization> getParentOrgRoles() {
		if (parentOrgRoles == null) {
			parentOrgRoles = new HashSet<Organization>();
		}else {
			parentOrgRoles.clear();
		}
		Set<Organization> parents = getAllParent();
		parents.add(this);
		for(Organization parent : parents){
			Role role = parent.getRole();
			if (role != null && !parentOrgRoles.contains(parent)){
				parentOrgRoles.add(parent);
			}
		}
		return parentOrgRoles;
	}

	public void setParentOrgRoles(Set<Organization> parentOrgRoles) {
		
	}

	public String getSessionId() {
		return sessionId;
	}

	public void setSessionId(String sessionId) {
		this.sessionId = sessionId;
	}
	public Post getPost() {
		return post;
	}
	public void setPost(Post post) {
		this.post = post;
	}
}
