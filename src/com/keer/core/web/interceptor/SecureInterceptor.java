package com.keer.core.web.interceptor;

import java.lang.reflect.Method;
import java.util.Iterator;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;

import com.keer.core.annotation.SkipAuthentication;
import com.keer.core.base.JSONAction;
import com.keer.core.bean.organization.UserMember;
import com.keer.core.exception.NotLoginException;
import com.keer.core.secure.Context;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.AbstractInterceptor;

public class SecureInterceptor extends AbstractInterceptor {

	private static final long serialVersionUID = -3676310960552128042L;

	@SuppressWarnings("unchecked")
	@Override
	public String intercept(ActionInvocation invocation) throws Exception {

		HttpServletRequest request = ServletActionContext.getRequest();
		
		HttpSession session = request.getSession();
		
		UserMember user = Context.getCurrentUser(session);
		
		JSONAction jsonAction = null;
		Object action = invocation.getAction();
		if (action instanceof JSONAction){
			jsonAction = (JSONAction)action;
		}
		if (user != null){
			user.setSessionId(session.getId());
			jsonAction.setLoginUser(user);
		}
		Map<String, Object> parameters = invocation.getInvocationContext().getParameters();
		String[] values = (String[]) parameters.get("node");
		if (values != null && values.length > 0 && values[0].equals("root")){
			parameters.put("navLoad", true);
			invocation.getInvocationContext().setParameters(parameters);
		}
		String[] sorts = (String[]) parameters.get("sort");
		if (sorts != null && sorts.length > 0){
			String orderString = "";
			JSONArray jsonArr = JSONArray.fromObject(sorts[0]);
			Iterator<JSONObject> it = jsonArr.iterator();
	        while(it.hasNext()){
	            JSONObject json = it.next();
	            if (orderString != ""){
	            	orderString += ",";
	            }
	            orderString += String.format("%s %s", json.get("property"),json.get("direction"));
	        }
	        jsonAction.setOrderString(orderString);
		}
		if (user == null){
			values = (String[]) parameters.get("tokenId");
			if (values != null && values.length > 0){
				HttpServletResponse response = (HttpServletResponse) invocation.getInvocationContext().get(StrutsStatics.HTTP_RESPONSE);
				jsonAction.setServletResponse(response);
				jsonAction.response(String.format("{\"success\":false,\"message\":\"%s\",\"data\":[]}", values[0]));
				return "none";
			}
			else {
				SkipAuthentication skip = null;
				if (jsonAction != null){
					Class<?> clazz = jsonAction.getClass();
					skip = clazz.getAnnotation(SkipAuthentication.class);
					if (skip == null){
						String proxyMethod = invocation.getProxy().getMethod();
						Method clazzMethod = clazz.getMethod(proxyMethod);
						skip = clazzMethod.getAnnotation(SkipAuthentication.class);
					}
				}
				if (skip == null){
					return "login";
//					throw new NotLoginException();
				}
			}
		}
		return invocation.invoke();
	}
}
