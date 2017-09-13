package com.keer.core.bean.enums;

import com.keer.core.annotation.Description;

/**
 * MQ命令执行状态
 * @author Administrator
 *
 */
@Description(Name="命令状态")
public enum CommandStatus implements IEnums{
	Info("Info", "正常"),
	Wait("Wait", "等待"),
	Warn("Warn", "警告"),
	Error("Error", "错误");
	
    private final String value;

    private final String name;
    
    private IEnumRender<IEnums> render;
    
    public void setRender(IEnumRender<IEnums> render) {
    	this.render = render;
    }
    
    private CommandStatus(String value, String name) {
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
