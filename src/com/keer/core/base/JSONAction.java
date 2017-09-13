package com.keer.core.base;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.apache.struts2.dispatcher.multipart.MultiPartRequestWrapper;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;
import org.hibernate.proxy.HibernateProxy;
import org.springframework.beans.factory.annotation.Autowired;

import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.Preparable;
import com.keer.core.accessscope.AccessScopeHandler;
import com.keer.core.annotation.ActionHandler;
import com.keer.core.annotation.Permission;
import com.keer.core.bean.base.JSONBean;
import com.keer.core.bean.base.Role;
import com.keer.core.bean.menu.Menu;
import com.keer.core.bean.menu.MenuActionDesc;
import com.keer.core.bean.organization.UserMember;
import com.keer.core.bean.permission.module.action.RoleModuleActionPermission;
import com.keer.core.bean.permission.module.action.RoleOrganizationActionPermission;
import com.keer.core.dao.IDaoSupport;
import com.keer.core.dao.SQLBuilder;
import com.keer.core.service.IUserMemberBizService;
import com.keer.core.util.Json2Map;

@SuppressWarnings({"serial","rawtypes"})
public abstract class JSONAction extends ActionSupport implements ServletRequestAware,ServletResponseAware, Preparable{
	private static final Logger logger = Logger.getLogger(JSONAction.class);
	/**
	 * Bean的集合的总数量，用于extjs翻页
	 */
	protected Integer totalCount;

	/**
	 * 请求页号
	 */
	protected Integer page;
	
	/**
	 * Bean的集合的开始索引，用于extjs翻页
	 */
	protected Integer start;

	/**
	 * 每页Bean集合的数量，用于extjs翻页
	 */
	protected Integer limit;

	/** 
	 * extjs调用的时间戳，无实际意义
	 */
	protected String _dc;

	/**
	 * 排序方向(ASC:升序,DESC:降序)
	 */
	protected String dir;

	/**
	 * extjs根节点参数名
	 */
	protected String node;
	/**
	 * extjs请求字段
	 */
	protected String json;
	
	/**
	 * extjs请求参数
	 */
	protected String bean;
	
	/**
	 * 上传文件
	 */
	protected File upload;
	
	/**
	 * 文件名称
	 */
	protected String uploadFileName;
	
	/**
	 * 文件类型
	 */
	protected String uploadContentType;
	/**
	 * 排序字段
	 */
	protected String sort;
	
	/**
	 * 排序字符串
	 */
	protected String orderString;
	
	/**
	 * 导航加载
	 */
	protected Boolean navLoad = false;
	
	/**
	 * 实体ID
	 */
	protected String id;
	
	/**
	 * 类层级(能够解析几层明细)
	 */
	protected Integer clazzlevel = 0;


	/**
	 * 属性层级(能够解析几层属性)
	 */
	protected Integer proplevel = 1;
	
	/**
	 * 加载全部(忽略自定义过滤条件,但保留系统权限过滤条件)
	 */
	protected Boolean allLoad = false;
	
	protected UserMember loginUser;
	
	protected SQLBuilder sqlBuilder;
	
	private Class<JSONBean> beanclazz;
	
	/**
	 * 权限访问范围类,由struct权限拦截器注入
	 */
	private List<AccessScopeHandler> scopeHandlers = new ArrayList<AccessScopeHandler>();
	
	protected HttpServletRequest request;
	protected HttpServletResponse response;

	@Autowired
	protected IDaoSupport dao;
	
	@Resource(name="userMemberBizService")
	private IUserMemberBizService bizUserMember;
	
	public void builderPermission(Class<JSONBean> clazz) throws Exception {
		ActionHandler handler = clazz.getAnnotation(ActionHandler.class);
		if (handler == null){
			throw new Exception(String.format("实体[%s]上没有[@ActionHandler]注解", clazz.getName()));
		}
		JSONAction action = (JSONAction) handler.action().newInstance();
		Method method = handler.action().getMethod(handler.method());
		this.builderPermission(action,method);
	}
	
	/**
	 * 构造权限过滤条件
	 * @param action
	 * @param method
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public void builderPermission(JSONAction action, Method method) throws Exception{
		if (loginUser == null){
			throw new Exception("loginUser不能为空");
		}
		Class<JSONAction> clazzAction = (Class<JSONAction>) action.getClass();
		Permission methodPermission = method.getAnnotation(Permission.class);
		if (methodPermission == null){
			return;
		}
		Class<?> beanclazz = methodPermission.bean();
		if (JSONBean.class.isAssignableFrom(beanclazz)){
			this.addBeanClazz((Class<JSONBean>)beanclazz);
		}
		else {
			this.addBeanClazz(action.getGenricType());
		}
		if (methodPermission.ignore()){
			return;
		}
		SQLBuilder builder = new SQLBuilder().AddFilterWhere(String.format("clazzAction='%s'", clazzAction.getName()));
		Menu menu = dao.find(Menu.class, builder, "{actions:{id:null,version:null,clazzname:null,actionType:null}}");
		if (menu == null){
			logger.warn(String.format("[%s]没有绑定菜单",clazzAction.getName()));
			return;
		}
		if (!loginUser.getUser().getIsAdmin()){
			String actionType = methodPermission.action();
			Set<MenuActionDesc> actions = menu.getActions();
			if (actions.size() == 0){
				logger.warn(String.format("[%s]没有没有注册",clazzAction.getName()));
				return;
			}
			Boolean hasAction = false;
			for(MenuActionDesc menuAction : actions){
				String typeString = menuAction.getActionType();
				if (typeString.equals(actionType)){
					hasAction = true;
					Set<Role> roles = bizUserMember.findAllRole(loginUser);
					String initValue = "";
					for(Role role : roles){
						if (initValue != ""){
							initValue += ",";
						}
						initValue += String.format("'%s'", role.getId());
					}
					builder = new SQLBuilder();
					builder.AddFilterWhere(String.format("menu='%s'", menu.getId()));
					builder.AddFilterWhere(String.format("action='%s'", menuAction.getId()));
					builder.AddFilterWhere(String.format("role in(%s)", initValue.equals("") ? "''" : initValue));
					List<RoleModuleActionPermission> permissions = this.dao.findAll(RoleModuleActionPermission.class, builder, "{action:{id:null}}");
					if (permissions.size() == 0){
						this.addPermissionFilter("0=1");
					}
					else {
						for(RoleModuleActionPermission permission : permissions){
							if (permission instanceof RoleOrganizationActionPermission){
								RoleOrganizationActionPermission orgAction = (RoleOrganizationActionPermission)permission;
								String clazzScope = orgAction.getClazzScope();
								AccessScopeHandler handler = (AccessScopeHandler) Class.forName(clazzScope).newInstance();
								this.addScopeHandler(handler);
							}
						}
						Class<?> clazzBean = methodPermission.bean();
						if (clazzBean == Object.class || clazzBean == JSONBean.class){
							clazzBean = action.getGenricType();
						}
						if (JSONBean.class.isAssignableFrom(clazzBean)){
							String filterString = this.getPermissionFilter((Class<JSONBean>) clazzBean);
							this.addPermissionFilter(filterString);
						}
					}
					break;
				}
			}
			if (!hasAction){
				logger.warn(String.format("[%s]中没有注册动作[%s]",clazzAction.getName(),actionType));
				this.addPermissionFilter("0=1");
			}
		}
	}
	
	public void prepare() throws Exception {
		String userAgent = this.request.getHeader("user-agent");
		if (this.sqlBuilder == null){
			this.sqlBuilder = new SQLBuilder().AddUser(loginUser).AddUserAgent(userAgent);
		}
	}	
	public Class<JSONBean> getGenricType() throws Exception{
		return this.beanclazz;
	}
	
	/**
	 * 设置当前方法处理的Bean类型,目前仅提供给权限拦截器使用
	 * @param clazz
	 */
	protected void addBeanClazz(Class<JSONBean> clazz){
		this.beanclazz = clazz;
	}
	
	/**
	 * 添加权限范围访问处理类,目前仅提供给权限拦截器使用
	 * @param handler
	 */
	protected void addScopeHandler(AccessScopeHandler handler){
		if (this.scopeHandlers == null){
			this.scopeHandlers = new ArrayList<AccessScopeHandler>();
		}
		this.scopeHandlers.add(handler);
	}
	
	/**
	 * 添加权限过滤条件,目前仅提供给权限拦截器使用
	 * @param filterString
	 */
	protected void addPermissionFilter(String filterString){
		if (this.sqlBuilder == null){
			this.sqlBuilder = new SQLBuilder().AddUser(loginUser);
			if (this.request != null){
				String userAgent = this.request.getHeader("user-agent");
				this.sqlBuilder.AddUserAgent(userAgent);
			}
		}
		this.sqlBuilder.AddPowerWhere(filterString);
	}
	
	/**
	 * 获取权限过滤字符串,目前仅提供给权限拦截器使用
	 */
	protected String getPermissionFilter(Class<JSONBean> clazz){
		String beanFilter = "";
		for(AccessScopeHandler scope: scopeHandlers){
			String filter = scope.beanFilterString(clazz, loginUser);
			if (StringUtils.isNotBlank(filter)){
				if (beanFilter != ""){
					beanFilter += " OR ";
				}
				beanFilter += filter;
			}
		}
		return beanFilter;
	}
	
	public String getBeanString(JSONBean<String> bean){
		if (bean instanceof HibernateProxy){
			HibernateProxy proxy = (HibernateProxy)bean;
			return (String)proxy.getHibernateLazyInitializer().getIdentifier();
		}
		else {
			return (String) bean.getId();
		}
	}
	
	public Integer getBeanInteger(JSONBean<Integer> bean){
		if (bean instanceof HibernateProxy){
			HibernateProxy proxy = (HibernateProxy)bean;
			return (Integer)proxy.getHibernateLazyInitializer().getIdentifier();
		}
		else {
			return (Integer) bean.getId();
		}
	}
	
	
	public JSONBean RequestJSONBean() throws Exception{
		List<JSONBean> beanList = RequestJSONList();
		if (beanList != null && beanList.size() > 0){
			return beanList.get(0);
		}
		return null;
	}
	
	public List<JSONBean> RequestJSONList() throws Exception{
		List<JSONBean> beanList = null;
		if (bean == null){
			InputStream in = null;
			try {
				in = this.request.getInputStream();
			} catch (IOException e) {
				e.printStackTrace();
			}
			beanList = (in == null ? null : (List<JSONBean>)Json2Map.getBeanList(in));
		}
		else {
			beanList = new ArrayList<JSONBean>();
			JSONObject json = JSONObject.fromObject(this.bean);
			try {
				Class clazz = Class.forName(json.getString("clazzname"));
				if (Modifier.isAbstract(clazz.getModifiers())){
					throw new Exception(String.format("抽象类[%s],无法实例化", clazz.getName()));
				}
				else {
					JSONBean bean = (JSONBean) clazz.newInstance();
			        bean.fromJson(json);
			        bean.clearDirty();
			        beanList.add(bean);
				}
			} catch (ClassNotFoundException e) {
				e.printStackTrace();
			} catch (InstantiationException e) {
				e.printStackTrace();
			} catch (IllegalAccessException e) {
				e.printStackTrace();
			}
		}
		return beanList;
	}

	protected void JSONResponse(Object bean) throws Exception{
		if (bean != null){
			JSONResponse(bean,false);
		}
	}
	
	protected Object JSONParse(Object bean) throws Exception {
		if (bean instanceof Collection){
			List<JSONObject> jsonlist = new ArrayList<JSONObject>();
			for (Object item:(Collection<?>)bean){
				if (item instanceof JSONBean){
					jsonlist.add(((JSONBean<?>)item).getJson());
				}
				else {
					jsonlist.add(JSONObject.fromObject(item));
				}
			}
			return JSONObject.fromObject(jsonlist);
		}
		else if (bean instanceof Map){
			@SuppressWarnings("unchecked")
			Map<String,Object> maps = (Map<String,Object>)bean;
			JSONObject jsonmap = new JSONObject();
			for(String key : maps.keySet()){
				Object obj = maps.get(key);
				jsonmap.put(key, JSONParse(obj));
			}
			return jsonmap;
		}
		else if (bean instanceof JSONBean){
			return ((JSONBean<?>)bean).getJson();
		}
		else {
			return bean;
		}
	}
	
	protected void JSONResponse(Object bean, Boolean parse) throws Exception {
		JSONObject json=new JSONObject();
		json.accumulate("success", true);
		if (bean instanceof Collection){
			List<String> jsonlist = new ArrayList<String>();
			for (Object item:(Collection<?>)bean){
				if (item instanceof JSONBean){
					JSONBean<?> object = (JSONBean<?>)item;
					String valueString = parse ? object.Bean2Json(this.json) : object.Bean2Json();
					jsonlist.add(valueString);
				}
				else {
					jsonlist.add(JSONObject.fromObject(item).toString());
				}
			}
			Integer count = getTotalCount();
			if (count == null){
				count = jsonlist.size();
			}
			json.accumulate("totalCount", count);
			json.accumulate("data", jsonlist);			
		}
		else {
			json.accumulate("totalCount", 1);
			json.accumulate("data", ((JSONBean<?>)bean).Bean2Json(this.json));
		}
		response(json.toString());
	}
	protected void JSONResponse(){
		JSONObject json=new JSONObject();
		json.accumulate("success", true);
		response(json.toString());
	}
	
	/**
	 * 产生response响应
	 * @param jsonString 响应的字符串
	 */
	public void response(String jsonString) {
		try {
			String contentType = "application/json;charset=utf-8";
			if (request instanceof MultiPartRequestWrapper) {
				contentType = "text/html;charset=utf-8";
			}
			response.setContentType(contentType);
			response.getWriter().print(jsonString);
			response.getWriter().flush();
			response.getWriter().close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	protected void response(byte[] data) {
		try {
			this.response.getOutputStream().write(data);
			this.response.getOutputStream().flush();
			this.response.getOutputStream().close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	protected void response(InputStream inputStream) throws IOException {
		OutputStream outputStream = this.response.getOutputStream();
		byte[] buffer = new byte[1024];
		int count;
		try {
			while((count = inputStream.read(buffer)) != -1) {
				outputStream.write(buffer, 0, count);
			}
			outputStream.flush();
		} finally {
			if (outputStream != null) {
				outputStream.close();
			}
			if (inputStream != null) {
				inputStream.close();
			}
		}
	}

	
	public String getBean() {
		return bean;
	}

	public void setBean(String bean) {
		this.bean = bean;
	}

	public String getJson() {
		return json;
	}

	public void setJson(String json) {
		this.json = json;
	}

	public UserMember getLoginUser() {
		return loginUser;
	}

	public void setServletRequest(HttpServletRequest request) {
		this.request = request;
	}

	public void setServletResponse(HttpServletResponse response) {
		this.response = response;
	}
	
	public void setLoginUser(UserMember user){
		this.loginUser = user;
	}
	
	public Integer getStart() {
		return start;
	}

	public void setStart(Integer start) {
		this.start = start;
	}

	public Integer getLimit() {
		return limit;
	}

	public void setLimit(Integer limit) {
		this.limit = limit;
	}

	public Integer getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(Integer totalCount) {
		this.totalCount = totalCount;
	}

	public String getDir() {
		return dir;
	}

	public void setDir(String dir) {
		this.dir = dir;
	}

	public File getUpload() {
		return upload;
	}

	public void setUpload(File upload) {
		this.upload = upload;
	}

	public String getUploadFileName() {
		return uploadFileName;
	}

	public void setUploadFileName(String uploadFileName) {
		this.uploadFileName = uploadFileName;
	}

//	public List<AccessScopeHandler> getScopeList() {
//		return scopeList;
//	}
//
//	public void setScopeList(List<AccessScopeHandler> scopeList) {
//		this.scopeList = scopeList;
//	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Boolean getNavLoad() {
		return navLoad;
	}

	public void setNavLoad(Boolean navLoad) {
		this.navLoad = navLoad;
	}
	public String getSort() {
		return sort;
	}
	public void setSort(String sort) {
		this.sort = sort;
	}

	public Boolean getAllLoad() {
		return allLoad;
	}

	public void setAllLoad(Boolean allLoad) {
		this.allLoad = allLoad;
	}

	public String getNode() {
		return node;
	}

	public void setNode(String node) {
		this.node = node;
	}

	public String getUploadContentType() {
		return uploadContentType;
	}

	public void setUploadContentType(String uploadContentType) {
		this.uploadContentType = uploadContentType;
	}

	public Integer getProplevel() {
		return proplevel;
	}

	public void setProplevel(Integer proplevel) {
		this.proplevel = proplevel;
	}

	public Integer getClazzlevel() {
		return clazzlevel;
	}

	public void setClazzlevel(Integer clazzlevel) {
		this.clazzlevel = clazzlevel;
	}

	public Integer getPage() {
		return page;
	}

	public void setPage(Integer page) {
		this.page = page;
	}

	public Class<JSONBean> getBeanclazz() {
		return beanclazz;
	}

	public void setBeanclazz(Class<JSONBean> beanclazz) {
		this.beanclazz = beanclazz;
	}

	public String getOrderString() {
		return orderString;
	}

	public void setOrderString(String orderString) {
		this.orderString = orderString;
	}
}
