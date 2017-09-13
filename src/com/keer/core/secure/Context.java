package com.keer.core.secure;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import org.springframework.beans.factory.NoSuchBeanDefinitionException;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.keer.core.bean.organization.UserMember;

public class Context {

	public static final String CURRENT_USER = "_currentUser";
	
	static ServletContext SERVLET_CONTEXT;
	
	private static Map<String,HttpSession> userSession = new HashMap<String, HttpSession>();
	
	public static void removeCurrentUser(HttpSession session) {
		if (userSession != null && session != null) {
			UserMember user = (UserMember)session.getAttribute(CURRENT_USER);
			if (user != null) {
				userSession.remove(user.getId());
			}
		}
	}

	public static HttpSession getUserSession(UserMember user) {
		HttpSession result = null;
		if (userSession != null && user != null) {
			result = (HttpSession)userSession.get(user.getId());
		}
		return result;
	}
	
	public static void setCurrentUser(HttpSession session,UserMember user) {
		if (user != null) {
			session.setAttribute(CURRENT_USER,user);
			if (userSession == null) {
				userSession = new HashMap<String,HttpSession>();
			}
			userSession.put(user.getId(), session);
		}
	}

	public static UserMember getCurrentUser(HttpSession session) {
		UserMember result = (UserMember)session.getAttribute(CURRENT_USER);
		return result;
	}
	
	public static List<UserMember> getCurrentUserList() {
		List<UserMember> result = new ArrayList<UserMember>();
		UserMember user;
		if (userSession != null) {
			Collection<HttpSession> sessionList = userSession.values();
			for (HttpSession session:sessionList) {
				user = (UserMember)session.getAttribute(CURRENT_USER);
				if (user != null) {
					result.add(user);
				}
			}
		}
		return result;
	}
	
	public static ServletContext getServletContext() {
		if (SERVLET_CONTEXT == null){
			SERVLET_CONTEXT = ServletActionContext.getRequest().getSession().getServletContext();
		}
		return SERVLET_CONTEXT;
	}
	
	public static void setServletContext(ServletContext servletContext) {
		if (SERVLET_CONTEXT == null){
			SERVLET_CONTEXT = servletContext;
		}
	}
	
	public static WebApplicationContext getApplicationContext(){
		if (SERVLET_CONTEXT == null){
			SERVLET_CONTEXT = ServletActionContext.getRequest().getSession().getServletContext();
		}
		WebApplicationContext wac = WebApplicationContextUtils.getWebApplicationContext(SERVLET_CONTEXT);
		return wac;
	}
	
	public static Object getSpringBean(String beanName) {
		if (SERVLET_CONTEXT == null){
			SERVLET_CONTEXT = ServletActionContext.getRequest().getSession().getServletContext();
		}
		WebApplicationContext wac = WebApplicationContextUtils.getWebApplicationContext(SERVLET_CONTEXT);
		Object result = null;
		try {
			result = wac.getBean(beanName);
		} catch (NoSuchBeanDefinitionException e) {
		}
		return result;
	}
}
