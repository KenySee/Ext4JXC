package com.keer.core.web;

import com.keer.core.base.JSONAction;
import com.opensymphony.xwork2.ActionContext;


@SuppressWarnings({ "serial" })
public class ExceptionAction extends JSONAction {

	public void handler() throws Exception
	{
		Exception exception = (Exception)ActionContext.getContext().getValueStack().findValue("exception");
		if (exception != null){
			exception.printStackTrace();
			String error = exception.toString();
			if (error != null){
				Integer start = error.indexOf(":");
				if (start > 0){
					error = error.substring(start+1);
				}
			}
			else {
				exception.printStackTrace();
			}
			this.response(String.format("{\"success\":false,\"message\":\"%s\",\"data\":[]}", error));
		}
	}
}
