package com.keer.core.bean.enums;

import com.keer.core.annotation.Description;

@Description(Name="实体状态")
public enum Status implements IEnums{
	READY("READY", "就绪"), 
	USING("USING", "可用"),
	DISABLE("DISABLE", "禁用");
	
    private final String value;

    private final String name;
    
    private IEnumRender<IEnums> render;
    
    public void setRender(IEnumRender<IEnums> render) {
    	this.render = render;
    }
    
    private Status(String value, String name) {
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
