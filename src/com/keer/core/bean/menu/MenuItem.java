package com.keer.core.bean.menu;

import javax.persistence.Entity;

import net.sf.json.JSONObject;

import com.keer.core.annotation.Description;

@Entity
@Description(Name="菜单项",Icon="menu_item")
@SuppressWarnings("serial")
public class MenuItem extends Menu {

	@Override
	protected JSONObject attachJson(JSONObject json) {
		if (json.get("iconCls") == null){
			json.put("iconCls", "application_view_columns");
		}
		return super.attachJson(json);
	}
	
	@Override
	public Boolean getLeaf() {
		return true;
	}	
	
	public MenuItem(){
		
	}
	
	public MenuItem(String code, String name, String url, String clazzAction){
		this.setCode(code);
		this.setSortno(code);
		this.setName(name);
		this.setUrl(url);
		this.setClazzAction(clazzAction);
	}
}
