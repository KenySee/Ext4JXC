package com.keer.core.bean.enums;

import com.keer.core.annotation.Description;

@Description(Name="机构类型")
public enum OrgType implements IEnums{
	/**
	 * 公司
	 */
	CORP("CORP", "公司"),
	/**
	 * 部门
	 */
	DEPT("DEPT", "部门"),
	/**
	 * 用户
	 */
	USER("USER", "用户");
	
    private final String value;

    private final String name;
    
    private IEnumRender<IEnums> render;
    
    public void setRender(IEnumRender<IEnums> render) {
    	this.render = render;
    }
    
    private OrgType(String value, String name) {
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