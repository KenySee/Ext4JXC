package com.keer.core.bean.model;


import javax.persistence.Entity;

import com.keer.core.annotation.Description;
import com.keer.core.bean.enums.DataType;




import com.keer.core.util.StringUtils;

import net.sf.json.JSONObject;

/**
 * 表格列模型
 * @author 周方明
 *
 */
@Entity
@SuppressWarnings("serial")
@Description(Name="通用配置")
public class ModelCommon extends ModelConfig {

	@Override
	public String toConfig() {
		JSONObject config = new JSONObject();
		config.accumulate("text", this.AsString(getText()));
		config.accumulate("dataIndex", this.AsString(getDataIndex()));
		config.accumulate("width", this.getColumnWidth());
		String fieldName = "name";
		Editor editor = this.getEditor();
		if (editor != null){
			if (EditorObjectCombo.class.isAssignableFrom(editor.getClass())){
				EditorObjectCombo combo = (EditorObjectCombo)editor;
				fieldName = combo.getDisplayField();
			}
			if (EditorTrigger.class.isAssignableFrom(editor.getClass())){
				EditorTrigger combo = (EditorTrigger)editor;
				fieldName = combo.getDisplayField();
			}
			JSONObject child = JSONObject.fromObject(editor.toConfig(this));
			if (editor instanceof EditorChildHidden){
				for (Object key : child.keySet()) {
					String name = key.toString();
					if (!"dataIndex".equals(name)){
						config.accumulate(name, child.get(key));
					}
				}
			}
			else {
				config.accumulate("editor", child);
			}
		}
		DataType type = this.getDataType();
		if (type == DataType.ENUM){
			if (editor != null){
				if (editor instanceof EditorEnumCombo){
					EditorEnumCombo combo = (EditorEnumCombo)editor;
					String enumType = combo.getEnumType();
					config.accumulate("renderer",String.format("this.enumRender(%s)",StringUtils.toLowerCaseFirstOne(enumType)));
				}
				else {
					System.err.println(String.format("模型列[%s]的编辑器类型不是EditorEnumCombo", this.getText()));
				}
			}
			else {
				System.err.println(String.format("模型列[%s]的编辑部件不能为空", this.getText()));
			}
		}
		else if(type == DataType.OBJECT){
			config.accumulate("renderer",String.format("this.enumRender(null,'%s')",fieldName == null ? "name" : fieldName));
		}
		else if(type == DataType.BOOLEAN){
			config.accumulate("xtype", this.AsString("checkcolumn"));
		}
		else if(type == DataType.DATE){
			config.accumulate("xtype", this.AsString("datecolumn"));
			config.accumulate("format", this.AsString("Y-m-d H:i:s"));
		}
		String temp = config.toString();
		return temp.replaceAll("\"", "");
	}
}
