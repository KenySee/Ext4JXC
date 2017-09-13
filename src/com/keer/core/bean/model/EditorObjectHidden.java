package com.keer.core.bean.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;

import net.sf.json.JSONObject;

import com.keer.core.annotation.Description;

@Entity
@Description(Name="集合隐藏域",Group="Keer.widget.field.CollectionHidden",Desc="widget-field-collectionhidden")
@SuppressWarnings("serial")
public class EditorObjectHidden extends EditorHidden {

	@Override
	public String toConfig(ModelDesc desc) {
		JSONObject config = new JSONObject();
		config.accumulate("xtype", this.AsString("widget-field-collectionhidden"));
		Widget widget = this.getXcontainer();
		if (widget != null){
			config.accumulate("xcontainer",this.AsString(widget.getAliasname()));
		}
		return config.toString();
	}

	@Override
	public List<String> toRequires() {
		List<String> list = new ArrayList<String>();
		list.add("Keer.widget.field.CollectionHidden");
		Widget xcontainer = this.getXcontainer();
		if (xcontainer != null){
			list.add(xcontainer.getClassname());
		}
		Widget childStore = this.getChildStore();
		if (childStore != null){
			list.add(childStore.getClassname());
		}
		return list;
	}
}
