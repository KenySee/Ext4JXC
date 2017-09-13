package com.keer.core.bean.enums;

import com.keer.core.annotation.Description;

@Description(Name="门户部件")
public enum PortalType implements IEnums{
	/**
	 * 外部链接
	 */
	Links("Links", "外部链接"),
	/**
	 * EXT部件
	 */
	Widget("Widget", "内部组件"),
	/**
	 * 容器部件
	 */
	Container("Container", "容器组件");
	
    private final String value;

    private final String name;
    
    private IEnumRender<IEnums> render;
    
    public void setRender(IEnumRender<IEnums> render) {
    	this.render = render;
    }
    
    private PortalType(String value, String name) {
      this.value = value;
      this.name = name;
    }

    public String value() {
      return value;
    }
	
    public String text() {
		return render != null ? render.renderText(this) : name;
	}
    
    public String type() {
		return null;
	}
    
    public String toString() {
      return value;
    }
}