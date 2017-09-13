package com.keer.core.bean;

import java.io.Serializable;

public interface ICoreBean<T extends Serializable> {

	public T getId();
	
	public void setId(T id);
	
	public Integer getVersion();
	
	public void setVersion(Integer version);
	
	public void GeneratorKey() throws Exception;
}
