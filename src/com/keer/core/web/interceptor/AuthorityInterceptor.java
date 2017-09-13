package com.keer.core.web.interceptor;


import java.lang.reflect.Method;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;
import org.springframework.beans.factory.annotation.Autowired;

import com.keer.core.base.JSONAction;
import com.keer.core.bean.organization.UserMember;
import com.keer.core.dao.IDaoSupport;
import com.keer.core.secure.Context;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.AbstractInterceptor;

/**
 * 权限拦截器
 * @author Administrator
 *
 */
@SuppressWarnings("serial")
public class AuthorityInterceptor extends AbstractInterceptor{
	@SuppressWarnings("unused")
	private static final Logger logger = Logger.getLogger(AuthorityInterceptor.class);
	
	@Autowired
	private IDaoSupport dao;
	
	@Override
	public String intercept(ActionInvocation invocation) throws Exception {
		HttpServletRequest request = ServletActionContext.getRequest();
		HttpSession session = request.getSession();
		Object object = invocation.getAction();
//		String currentURL = request.getRequestURI();   
//		Map<String,Object> parameters = invocation.getInvocationContext().getParameters();
//		System.out.println("web parameter interceptor:"+currentURL+" parameters:"+parameters.size());
		UserMember loginUser = Context.getCurrentUser(session);
		if (loginUser != null && object instanceof JSONAction){
			JSONAction action = (JSONAction)object;
			Class<?> clazz = action.getClass();
			String proxyMethod = invocation.getProxy().getMethod();
			Method clazzMethod = clazz.getMethod(proxyMethod);
			action.setLoginUser(loginUser);
			action.builderPermission(action, clazzMethod);
		}
		return invocation.invoke();
	}

	public IDaoSupport getDao() {
		return dao;
	}

	public void setDao(IDaoSupport dao) {
		this.dao = dao;
	}
}