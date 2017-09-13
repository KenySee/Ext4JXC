package com.keer.core.bean.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;

import net.sf.json.JSONObject;

import com.keer.core.annotation.Description;

@Entity
@Description(Name="集合隐藏列",Group="Keer.widget.field.CollectionColumn",Desc="widget-field-collectioncolumn")
@SuppressWarnings("serial")
public class EditorChildHidden extends EditorHidden {

	private String parentProp;
	
	@Override
	public String toConfig(ModelDesc desc) {
		JSONObject config = new JSONObject();
		config.accumulate("xtype", this.AsString("widget-field-collectioncolumn"));
		if (parentProp == null || "".equals(parentProp) || "null".equals(parentProp)){
			parentProp = "parent";
		}
		config.accumulate("parentProp", this.AsString(parentProp));
		Widget widget = this.getXcontainer();
		if (widget != null){
			config.accumulate("xcontainer",this.AsString(widget.getAliasname()));
		}
		return config.toString();
	}

	@Override
	public List<String> toRequires() {
		List<String> list = new ArrayList<String>();
		list.add("Keer.widget.field.CollectionColumn");
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

	public String getParentProp() {
		return parentProp;
	}

	public void setParentProp(String parentProp) {
		this.parentProp = parentProp;
	}
}
