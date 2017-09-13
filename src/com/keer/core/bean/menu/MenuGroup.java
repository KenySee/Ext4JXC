package com.keer.core.bean.menu;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.OneToMany;

import net.sf.json.JSONObject;

import com.keer.core.annotation.Description;

@Entity
@Description(Name="菜单组",Icon="menu_group")
@SuppressWarnings({"serial"})
public class MenuGroup extends MenuResource {
	
	public MenuGroup(){
	}
	
	@Override
	protected JSONObject attachJson(JSONObject json) {
		if (json.get("iconCls") == null){
			json.put("iconCls", "x-tree-icon-parent");
		}
		return super.attachJson(json);
	}
	
	public MenuGroup(String code, String name){
		this.setCode(code);
		this.setSortno(code);
		this.setName(name);
	}
	
	@Override
	public Boolean getLeaf() {
		return false;
	}
	
	@OneToMany(mappedBy="parent")
	@Description(Name="下级资源",Icon="chart_organisation")
	private Set<MenuResource> childs = new HashSet<MenuResource>();

	
	public Set<MenuResource> getChilds() {
		return childs;
	}

	public void setChilds(Set<MenuResource> childs) {
		this.childs = childs;
	}
	
	public Set<MenuResource> getAllChilds(){
		Set<MenuResource> allChilds = new HashSet<MenuResource>();
		if (this.childs != null){
			for(MenuResource child : childs){
				if (child instanceof MenuGroup){
					MenuGroup group = (MenuGroup)child;
					allChilds.add(group);
					allChilds.addAll(group.getAllChilds());
				}
			}
		}
		return allChilds;
	}
	
	public MenuResource addMenu(MenuResource menu){
		Set<MenuResource> childs = (Set<MenuResource>) this.getChilds();
		menu.setParent(this);
		childs.add(menu);
		return menu;
	}
}
