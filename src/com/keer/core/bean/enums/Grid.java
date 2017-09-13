package com.keer.core.bean.enums;

import com.keer.core.annotation.Description;

@Description(Name="编辑方式")
public enum Grid implements IEnums{
	Popup("Popup", "弹出编辑"), 
	Inline("Inline", "行内编辑");
	
    private final String value;

    private final String name;
    
    private IEnumRender<IEnums> render;
    
    public void setRender(IEnumRender<IEnums> render) {
    	this.render = render;
    }
    
    private Grid(String value, String name) {
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
