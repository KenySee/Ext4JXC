package com.keertech.demo.bean.enums.entity;

import com.keer.core.annotation.Description;
import com.keer.core.bean.enums.IEnumRender;
import com.keer.core.bean.enums.IEnums;


@Description(Name="楼层类型")
public enum LoftType implements IEnums{
    Reading("Reading", "段落"),
    Arstory("Arstory","文本"),
    Artwork("Artwork","产品");

    private final String value;

    private final String name;

    private IEnumRender<IEnums> render;

    public void setRender(IEnumRender<IEnums> render) {
    	this.render = render;
    }

    private LoftType(String value, String name) {
      this.value = value;
      this.name = name;
    }

    public String value() {
      return value;
    }

    public String text() {
		return render != null ? render.renderText(this) : name;
	}  
    
    public String toString() {
      return value;
    }

	public String type() {
		return null;
	}
}
