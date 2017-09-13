package com.keer.core.bean.menu;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.Transient;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import com.keer.core.annotation.Description;
import com.keer.core.annotation.TopSubClass;
import com.keer.core.bean.resource.Resource;

@Entity
@Description(Name="菜单资源")
@TopSubClass(MenuGroup.class)
@SuppressWarnings({"serial"})
public abstract class MenuResource extends Resource {
	
	@ManyToOne(fetch=FetchType.EAGER)
	@Fetch(FetchMode.JOIN)
	@Description(Name="上级资源")
	private MenuGroup parent;
	
	@Transient
	private Boolean checked;
	
	@Transient
	@Description(Name="菜单类型")
	private String menuType;
	
	/**
	 * 菜单图标
	 */
	@Description(Name="菜单图标")
	private String iconUrl;
	
	@Transient
	private String iconCls;

	public String getIconCls() {
		return iconUrl;
	}

	public void setIconCls(String iconCls) {
		
	}
	
	public String getIconUrl() {
		return iconUrl;
	}

	public void setIconUrl(String iconUrl) {
		this.iconUrl = iconUrl;
	}
	
	@Transient
	private Boolean leaf = true;

	@Override
	public String getClazzparent() {
		return Resource.class.getName();
	}
	
	public String getMenuType(){
		return this.getClass().getSimpleName();
	}

	public void setMenuType(String menuType) {
	}
	
	public MenuGroup getParent(){
		return this.parent;
	}

	public void setParent(MenuGroup parent){
		this.parent = parent;
	}
	
	public Boolean getLeaf() {
		return leaf;
	}

	public void setLeaf(Boolean leaf) {
		this.leaf = leaf;
	}

	public Boolean getChecked() {
		return checked;
	}

	public void setChecked(Boolean checked) {
		this.checked = checked;
	}
}
