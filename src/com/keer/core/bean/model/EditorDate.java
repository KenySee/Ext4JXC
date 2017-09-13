package com.keer.core.bean.model;

import java.util.List;

import javax.persistence.Entity;

import net.sf.json.JSONObject;

import com.keer.core.annotation.Description;

@Entity
@Description(Name="日期编辑框",Group="Ext.form.field.Date",Desc="datefield")
@SuppressWarnings("serial")
public class EditorDate extends Editor {

	@Override
	public String toConfig(ModelDesc desc) {
		JSONObject config = new JSONObject();
		config.accumulate("xtype", this.AsString("datefield"));
		config.accumulate("format", this.AsString("Y-m-d H:i:s"));
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
		return null;
	}
}
