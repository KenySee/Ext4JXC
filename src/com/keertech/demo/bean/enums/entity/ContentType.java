package com.keertech.demo.bean.enums.entity;

import com.keer.core.annotation.Description;
import com.keer.core.bean.enums.IEnumRender;
import com.keer.core.bean.enums.IEnums;


@Description(Name="内容类型")
public enum ContentType implements IEnums{
    JustifyText("JustifyText", "段落"),
    CenterText("CenterText","文本"),
    ImageProduct("ImageProduct","产品"),
    CImageText("CImageText","作品"),
    BigImage("BigImage", "图片"),
    SingleImage("SingleImage", "单图");
    private final String value;

    private final String name;

    private IEnumRender<IEnums> render;

    public void setRender(IEnumRender<IEnums> render) {
    	this.render = render;
    }

    private ContentType(String value, String name) {
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
