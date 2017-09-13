package com.keer.core.action;

import org.apache.struts2.convention.annotation.Action;

import com.keer.core.annotation.SkipAuthentication;
import com.keer.core.base.JSONAction;
import com.keer.core.secure.Context;

@Action("LogoutAction")
@SuppressWarnings("serial")
@SkipAuthentication
public class LogoutAction extends JSONAction {

	public String execute() throws Exception {
		Context.setCurrentUser(this.request.getSession(), null);	
		this.request.getSession().invalidate();
		return "login";
	}
}
