package com.keer.core.bean.enums;

import com.keer.core.annotation.Description;

@Description(Name="布局方式")
public enum Layout implements IEnums{
	treenav("treenav", "树形导航+网格"),
	listnav("listnav", "单列导航+网格"),
	gridnav("gridnav", "网格导航+网格"),
	form("form", "网格导航+表单"),
	grid("grid", "简单网格");
	
    private final String value;

    private final String name;
    
    private IEnumRender<IEnums> render;
    
    public void setRender(IEnumRender<IEnums> render) {
    	this.render = render;
    }
    
    private Layout(String value, String name) {
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
