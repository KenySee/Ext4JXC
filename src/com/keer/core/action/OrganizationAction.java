package com.keer.core.action;


import java.io.Serializable;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;

import com.keer.core.annotation.Permission;
import com.keer.core.base.CRUDAction;
import com.keer.core.bean.base.JSONBean;
import com.keer.core.bean.base.Post;
import com.keer.core.bean.base.Role;
import com.keer.core.bean.base.User;
import com.keer.core.bean.organization.Corporation;
import com.keer.core.bean.organization.Department;
import com.keer.core.bean.organization.Organization;
import com.keer.core.bean.organization.UserMember;
import com.keer.core.bean.organization.member.DeptMember;
import com.keer.core.dao.SQLBuilder;
import com.keer.core.service.IOrganizationBizService;
import com.keer.core.service.IPostBizService;
import com.keer.core.service.IRoleBizService;
import com.keer.core.service.IUserBizService;
import com.keer.core.util.GenericsUtils;

@Action("OrganizationAction")
@SuppressWarnings({ "serial", "rawtypes" })
public class OrganizationAction extends CRUDAction<Organization> {

	@Autowired
	private IOrganizationBizService organizationBizService;
	
	@Autowired
	private IPostBizService postBizService;
	
	@Autowired
	private IRoleBizService roleBizService;
	
	@Autowired
	private IUserBizService userBizService;
	
	private String mainMember;
	
	@Override
	public JSONBean bizDefaultBean(JSONBean bean) throws Exception {
		return bean;
	}
	
	@Override
	public Serializable getPrimaryValue(Class<JSONBean> clazz) {
		return this.getId();
	}
	private String parent;
	private String dtype;
	private String clazzname;
	private String loginname;
	
	/**
	 * 设置上级机构过滤参数
	 */
	private String orgclazz;
	private String orgid;
	
	/**
	 * 查询公司
	 * @throws Exception
	 */
	@Permission(action="",desc="",bean=Corporation.class,ignore=true)
	public void findAllCorporation() throws Exception {
		this.findAll();
	}
	
	/**
	 * 查询部门
	 * @throws Exception
	 */
	@Permission(action="",desc="",bean=Department.class,ignore=true)
	public void findAllDepartment() throws Exception {
		this.findAll();
	}
	
	/**
	 * 查询成员
	 * @throws Exception
	 */
	@Permission(action="",desc="",bean=UserMember.class,ignore=true)
	public void findAllUserMember() throws Exception {
		this.findAll();
	}
	
	/**
	 * 查询部门和成员
	 * @throws Exception
	 */
	@Permission(action="",desc="",bean=DeptMember.class,ignore=true)
	public void findAllDeptMember() throws Exception {
		this.findAll();
	}
	
	@Permission(action="",desc="",bean=Role.class,ignore=true)
	public void findAllRole() throws Exception {
		this.findAll();
	}

	@Permission(action="",desc="",bean=Post.class,ignore=true)
	public void findAllPost() throws Exception {
		this.findAll();
	}
	
	@Permission(action="",desc="",bean=User.class,ignore=true)
	public void findAllUser() throws Exception {
		this.findAll();
	}
	
	@Permission(action="",desc="",bean=User.class,ignore=true)
	public void saveUser() throws Exception {
		this.save();
	}
	
	@Permission(action="",desc="",bean=User.class,ignore=true)
	public void findUser() throws Exception {
		this.find();
	}
	
	@Override
	public void buildFilterString(Class<JSONBean> clazz,SQLBuilder builder) throws Exception {
		String beanName = clazz.getSimpleName();
		if ("User".equals(beanName)){
			if (StringUtils.isNotBlank(mainMember)){
				builder.AddFilterWhere(String.format("mainMember = '%s'",mainMember));
			}
		}
		else if ("Organization".equals(beanName)){
			if (StringUtils.isNotBlank(loginname)){
				builder.AddFilterWhere(String.format("user.loginname like '%s%s'",loginname,"%"));
			}
			else {
				if (StringUtils.isNotBlank(parent)){
					this.node = parent;
				}			
				if (node == null  || (node.equals("NaN") || node.indexOf("root") >= 0 || node.equals(""))){
					builder.AddFilterWhere("parent is null");
				}
				else {
					builder.AddFilterWhere(String.format("parent = '%s'",node));
				}
				if (StringUtils.isNotBlank(dtype)){
					String[] typeArray = dtype.split(",");
					if (typeArray!=null  && typeArray.length>0) {
						String hql = "";
						for (int i = 0; i < typeArray.length; i++) {
							hql += "or DTYPE = '"+typeArray[i]+"' ";
						}
						if (StringUtils.isNotBlank(hql)) {
							hql = hql.substring(hql.indexOf("D"), hql.length());
						}
						builder.AddFilterWhere("("+hql+")");
						
					}
				}
			}
		}
	}
	@SuppressWarnings("unchecked")
	@Override
	public List<JSONBean> bizFindAll(Class<JSONBean> clazz,
			SQLBuilder builder) throws Exception {
		if (StringUtils.isNotBlank(clazzname)){
			clazz = (Class<JSONBean>) Class.forName(clazzname);
		}
		else {
			/**
			 * 组织的上级只能是parent属性的类型
			 */
			if (StringUtils.isNotBlank(orgclazz)){
				Class<Organization> clazz1 = (Class<Organization>) Class.forName(orgclazz);
				for(Class<?> clazz2 = clazz1 ; clazz2 != Object.class ; clazz2 = clazz2.getSuperclass()) { 
					Class<?> parent1 = (Class<?>) GenericsUtils.getSuperClassGenricType(clazz2, 1);
					if (parent1 != Object.class && Organization.class.isAssignableFrom(parent1)){
						clazz = (Class<JSONBean>) parent1;
						break;
					}
				}
				/**
				 * 组织的上级不能是它自己
				 */
				if (StringUtils.isNotBlank(orgid)){
					builder.AddFilterWhere(String.format("id <> '%s'", orgid));
				}
			}
		}
		return super.bizFindAll(clazz, builder);
	}
	
	public String getParent() {
		return parent;
	}
	public void setParent(String parent) {
		this.parent = parent;
	}

	public String getOrgclazz() {
		return orgclazz;
	}
	public void setOrgclazz(String orgclazz) {
		this.orgclazz = orgclazz;
	}
	public String getClazzname() {
		return clazzname;
	}
	public void setClazzname(String clazzname) {
		this.clazzname = clazzname;
	}
	public String getOrgid() {
		return orgid;
	}
	public void setOrgid(String orgid) {
		this.orgid = orgid;
	}

	public void setDtype(String dtype) {
		this.dtype = dtype;
	}

	public String getMainMember() {
		return mainMember;
	}

	public void setMainMember(String mainMember) {
		this.mainMember = mainMember;
	}

	public String getLoginname() {
		return loginname;
	}

	public void setLoginname(String loginname) {
		this.loginname = loginname;
	}
}
