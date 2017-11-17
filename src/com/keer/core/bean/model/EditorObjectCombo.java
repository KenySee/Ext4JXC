package com.keer.core.bean.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import net.sf.json.JSONObject;

import com.keer.core.annotation.Description;

@Entity
@Description(Name="对象下拉框",Group="Keer.widget.field.ObjectCombo",Desc="widget-field-objectcombo")
@SuppressWarnings("serial")
public class EditorObjectCombo extends EditorComponent {

	@ManyToOne
	@JoinColumn(name="storeid")
	private WidgetStore store;
	
	@Override
	public String toConfig(ModelDesc desc) {
		JSONObject config = new JSONObject();
		config.accumulate("xtype", this.AsString("widget-field-objectcombo"));
		Widget widget = this.getStore();
		if (widget != null){
			config.accumulate("store", this.AsString(widget.getAliasname()));
		}
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

	public void setStore(WidgetStore store) {
		this.store = store;
	}

	public WidgetStore getStore() {
		return store;
	}

	@Override
	public List<String> toRequires() {
		List<String> list = new ArrayList<String>();
		list.add("Keer.widget.field.ObjectCombo");
		if (store != null){
			list.add(store.getClassname());
		}
		return list;
	}
}
