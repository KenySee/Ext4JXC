package com.keer.core.bean.enums;

public interface IEnumRender<T extends IEnums> extends IEnums  {

	public Class<T> enumsClass();
	
	public String renderText(IEnums enums);
}
