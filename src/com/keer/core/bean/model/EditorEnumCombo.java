package com.keer.core.bean.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;

import net.sf.json.JSONObject;

import com.keer.core.annotation.Description;

@Entity
@Description(Name="枚举下拉框",Group="Keer.widget.field.EnumCombo",Desc="widget-field-enumcombo")
@SuppressWarnings("serial")
public class EditorEnumCombo extends EditorComponent {

	private String enumType;
	
	@Override
	public String toConfig(ModelDesc desc) {
		JSONObject config = new JSONObject();
		if (this.enumType == null){
			System.err.println(String.format("枚举enumType不能为空"));
			this.enumType = "EnumType";
		}
		config.accumulate("xtype", this.AsString("widget-field-enumcombo"));
		config.accumulate("store", String.format("Keer.enumstore['%s']", this.enumType));
		
		if (getDisplayField() == null || "".equals(getDisplayField()) || "null".equals(getDisplayField())){
			setDisplayField("name");
		}
		config.accumulate("displayField", this.AsString(getDisplayField()));
		config.accumulate("dataIndex", this.AsString(desc.getDataIndex()));
		config.accumulate("triggerCtrl",true);
		if (readOnly != null && readOnly == true){
			config.accumulate("readOnly",readOnly);
		}
		if (nonEmpty != null && nonEmpty == true){
			config.accumulate("allowBlack",false);
		}
		if (fullLine != null && fullLine == true){
			config.accumulate("fullLine",true);
		}
		if (forcedWrap != null && forcedWrap == true){
			config.accumulate("forcedWrap",true);
		}
		if (colspan != null && colspan > 0){
			config.accumulate("growMin",colspan);
		}
		return config.toString();
	}

	@Override
	public List<String> toRequires() {
		List<String> list = new ArrayList<String>();
		list.add("Keer.widget.field.EnumCombo");
		return list;
	}

	public String getEnumType() {
		return enumType;
	}

	public void setEnumType(String enumType) {
		this.enumType = enumType;
	}
}
