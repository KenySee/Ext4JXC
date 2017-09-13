package com.keer.core.bean.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import net.sf.json.JSONObject;
import com.keer.core.annotation.Description;

@Entity
@Description(Name="对象弹出框",Group="Keer.widget.field.ObjectTrigger",Desc="widget-field-objecttrigger")
@SuppressWarnings("serial")
public class EditorTrigger extends EditorComponent {

	@ManyToOne
	@JoinColumn(name="windowid")
	private WidgetWindow xwindow;
	
	@Override
	public String toConfig(ModelDesc desc) {
		JSONObject config = new JSONObject();
		config.accumulate("xtype", this.AsString("widget-field-objecttrigger"));
		Widget widget = this.getXwindow();
		if (widget != null){
			config.accumulate("xwindow",this.AsString(widget.getAliasname()));
		}
		if (displayField == null || "".equals(displayField) || "null".equals(displayField)){
			displayField = "name";
		}
		config.accumulate("displayField", this.AsString(displayField));
		config.accumulate("dataIndex", this.AsString(desc.getDataIndex()));
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

	public void setXwindow(WidgetWindow xwindow) {
		this.xwindow = xwindow;
	}

	public WidgetWindow getXwindow() {
		return xwindow;
	}

	@Override
	public List<String> toRequires() {
		List<String> list = new ArrayList<String>();
		list.add("Keer.widget.field.ObjectTrigger");
		if (xwindow != null){
			list.add(xwindow.getClassname());
		}
		return list;
	}
}
