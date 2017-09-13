package com.keer.core.bean.menu;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.keer.core.annotation.Description;
import com.keer.core.bean.base.GenericBean;

@Entity
@Description(Name="菜单动作")
@Table(name="ts_menu_action")
@SuppressWarnings("serial")
public class MenuActionDesc extends GenericBean {

	@Description(Name="菜单")
	@ManyToOne
	private Menu menu;
	
	@Description(Name="动作类型")
	private String actionType;
	
	@Description(Name="动作描述")
	private String actionDesc;

	public Menu getMenu() {
		return menu;
	}

	public void setMenu(Menu menu) {
		this.menu = menu;
	}

	public String getActionType() {
		return actionType;
	}

	public void setActionType(String actionType) {
		this.actionType = actionType;
	}

	public String getActionDesc() {
		return actionDesc;
	}

	public void setActionDesc(String actionDesc) {
		this.actionDesc = actionDesc;
	}
}
