package com.keer.core.bean.enums;

import com.keer.core.annotation.Description;

@Description(Name="数据类型")
public enum DataType implements IEnums{
	INT("INT", "整数类型"), 
	STRING("STRING", "字符类型"),
	AUTO("AUTO", "自动类型"),
	ENUM("ENUM", "枚举类型"),
	DATE("DATE", "日期类型"),
	BOOLEAN("BOOLEAN", "布尔类型"),
	OBJECT("OBJECT", "对象类型"),
	/**
	 * 关联类型
	 */
	RELATION("RELATION","多对多集合"),
	/**
	 * 集合类型
	 */
	COLLECT("COLLECT", "一对多集合");
	
    private final String value;

    private final String name;
    
    private IEnumRender<IEnums> render;
    
    public void setRender(IEnumRender<IEnums> render) {
    	this.render = render;
    }
    
    private DataType(String value, String name) {
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
