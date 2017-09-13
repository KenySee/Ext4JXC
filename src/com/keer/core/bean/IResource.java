package com.keer.core.bean;

import com.keer.core.bean.enums.Status;


public interface IResource  extends ICoreBean<String>{

	public String getCode();
	
	public String getName();
	
	public Status getStatus();
	
}
