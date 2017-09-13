package com.keer.core.bean.permission.module.action;

import javax.persistence.DiscriminatorColumn;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.keer.core.annotation.Description;
import com.keer.core.bean.base.GenericBean;
import com.keer.core.bean.base.Role;
import com.keer.core.bean.menu.Menu;
import com.keer.core.bean.menu.MenuActionDesc;

@Entity
@Description(Name="角色动作权限")
@DiscriminatorColumn(length=255)
@Table(name="ts_role_module_action")
@SuppressWarnings("serial")
public abstract class RoleModuleActionPermission extends GenericBean {

	@ManyToOne
	@Description(Name="角色")
	private Role role;
	
	@ManyToOne
	@Description(Name="菜单")
	private Menu menu;
	
	@ManyToOne
	private MenuActionDesc action;
	
	@Description(Name="动作")
	private String actionType;
	
	public MenuActionDesc getAction() {
		return action;
	}

	public void setAction(MenuActionDesc action) {
		this.action = action;
	}

	public Menu getMenu() {
		return menu;
	}

	public void setMenu(Menu menu) {
		this.menu = menu;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public String getActionType() {
		return actionType;
	}

	public void setActionType(String actionType) {
		this.actionType = actionType;
	}
}
