package com.keer.core.bean.model;

import javax.persistence.Entity;
import javax.persistence.Transient;

import com.keer.core.annotation.Description;
import com.keer.core.bean.enums.DataType;

import net.sf.json.JSONObject;

/**
 * 数据字段模型
 * @author 周方明
 *
 */
@Entity
@SuppressWarnings("serial")
@Description(Name="表单配置")
public class ModelField extends ModelConfig {

	/**
	 * 表单新增时,控件是否获得焦点(默认第一个控件获得焦点)
	 */
	@Transient
	private Boolean foucs = false;
	
	@Override
	public String toConfig() {
		JSONObject config = new JSONObject();
		config.accumulate("fieldLabel", this.AsString(getText()));
		config.accumulate("name", this.AsString(getDataIndex()));
		config.accumulate("itemId", this.AsString(getDataIndex()));
		config.accumulate("dataIndex", this.AsString(getDataIndex()));
		Editor editor = this.getEditor();
		if (editor != null){
			if (editor instanceof EditorObjectHidden){
				config.accumulate("loadSync", true);
				config.accumulate("writeSync", true);
				config.accumulate("store", String.format("this.%sStore", this.getDataIndex()));
			}
			JSONObject child = JSONObject.fromObject(editor.toConfig(this));
			for (Object key : child.keySet()) {
				String name = key.toString();
				if (!"dataIndex".equals(name)){
					config.accumulate(name, child.get(key));
				}
			}
		}
		DataType dataType = this.getDataType();
		if (dataType == DataType.RELATION){
			config.accumulate("mem",true);
		}
		if (foucs){
			config.accumulate("addFocus",this.AsString("adding"));
		}
		String temp = config.toString();
		return temp.replaceAll("\"", "");
	}

	public Boolean getFoucs() {
		return foucs;
	}

	public void setFoucs(Boolean foucs) {
		this.foucs = foucs;
	}
}
