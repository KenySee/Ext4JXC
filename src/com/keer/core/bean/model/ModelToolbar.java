package com.keer.core.bean.model;


import javax.persistence.Entity;

import com.keer.core.annotation.Description;

import net.sf.json.JSONObject;

/**
 * 条件字段模型
 * @author 周方明
 *
 */
@Entity
@SuppressWarnings("serial")
@Description(Name="条件配置")
public class ModelToolbar extends ModelConfig {

	@Override
	public String toConfig() {
		JSONObject config = new JSONObject();
		config.accumulate("fieldLabel", this.AsString(getText()));
		config.accumulate("name", this.AsString(getDataIndex()));
		config.accumulate("itemId", this.AsString(getDataIndex()));
		config.accumulate("dataIndex", this.AsString(getDataIndex()));
		config.accumulate("labelWidth", 60);
		Editor editor = this.getEditor();
		if (editor != null){
			JSONObject child = JSONObject.fromObject(editor.toConfig(this));
			for (Object key : child.keySet()) {
				String name = key.toString();
				if (!"dataIndex".equals(name)){
					config.accumulate(name, child.get(key));
				}
			}
		}
		else {
			config.accumulate("xtype", this.AsString("textfield"));
		}
		String temp = config.toString();
		return temp.replaceAll("\"", "");
	}
}
