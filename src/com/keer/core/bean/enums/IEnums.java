package com.keer.core.bean.enums;

public interface IEnums {

	public String value();
	
	public String text();
	
	public String type();
	
	public void setRender(IEnumRender<IEnums> render);
}
