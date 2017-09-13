package com.keer.core.bean.menu;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Transient;

import com.keer.core.annotation.Description;

@Entity
@Description(Name="菜单")
@SuppressWarnings("serial")
public abstract class Menu extends MenuResource {

	@Description(Name="模块类名")
	private String clazzAction;

	/**
	 * 菜单URL
	 */
	@Description(Name="菜单URL")
	private String url;
	
	
	
	@Description(Name="菜单动作")
	@OneToMany(mappedBy="menu")
	private Set<MenuActionDesc> actions;
	
	@Transient
	private Set<MenuActionDesc> actionTypes;
	
	public String getClazzAction() {
		return clazzAction;
	}
	

	public String getUrl() {
		return url;
	}
	
	public void setUrl(String url) {
		this.url = url;
	}


	
	public void setClazzAction(String clazzAction) {
		this.clazzAction = clazzAction;
	}

	public Set<MenuActionDesc> getActions() {
		return actions;
	}

	public void setActions(Set<MenuActionDesc> actions) {
		this.actions = actions;
	}


	public Set<MenuActionDesc> getActionTypes() {
		return actionTypes;
	}


	public void setActionTypes(Set<MenuActionDesc> actionTypes) {
		this.actionTypes = actionTypes;
	}
}
