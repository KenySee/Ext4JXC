package com.keer.core.bean.model;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;

import net.sf.json.JSONObject;

import com.keer.core.annotation.Description;
import com.keer.core.bean.base.GenericBean;
import com.keer.core.util.CacheLoaderUtil;

@Entity
@Table(name="ts_view_editor")
@SuppressWarnings("serial")
public abstract class Editor extends GenericBean {
	
	@Description(Name="名称")
	private String name;
	
	@Description(Name="只读")
	protected Boolean readOnly;
	
	@Description(Name="非空")
	protected Boolean nonEmpty;
	
	@Description(Name="是否整行")
	protected Boolean fullLine;
	
	@Description(Name="跨列")
	protected Integer colspan;
	
	@Description(Name="强制换行")
	protected Boolean forcedWrap;
	
	@Transient
	private String colField;
	
	public String toConfig(ModelDesc desc) {
		JSONObject config = new JSONObject();
		return config.toString();
	}
	public abstract List<String> toRequires();
	public String AsString(String str){
		return String.format("'%s'", str);
	}
	public String toFields(){
		Map<String, Field> map = CacheLoaderUtil.getFields(this.getClass(), true);
		String fields = "";
		for(String name : map.keySet()){
			if (fields != ""){
				fields += ",";
			}
			fields += name;
		}
		return fields;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getName() {
		return name;
	}
	public void setColField(String colField) {
	}
	public String getColField() {
		if (colField == null){
			colField = this.toFields();
		}
		return colField;
	}
	public void setReadOnly(Boolean readOnly) {
		this.readOnly = readOnly;
	}
	public Boolean getReadOnly() {
		return readOnly;
	}
	public Boolean getNonEmpty() {
		return nonEmpty;
	}
	public void setNonEmpty(Boolean nonEmpty) {
		this.nonEmpty = nonEmpty;
	}
	public Boolean getFullLine() {
		return fullLine;
	}
	public void setFullLine(Boolean fullLine) {
		this.fullLine = fullLine;
	}
	public Integer getColspan() {
		return colspan;
	}
	public void setColspan(Integer colspan) {
		this.colspan = colspan;
	}
	public Boolean getForcedWrap() {
		return forcedWrap;
	}
	public void setForcedWrap(Boolean forcedWrap) {
		this.forcedWrap = forcedWrap;
	}
}
