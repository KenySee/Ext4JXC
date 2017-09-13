package com.keer.core.bean.portal;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.OneToMany;

import com.keer.core.annotation.Description;

@Entity
@Description(Name="部件容器",Icon="container_widget")
@SuppressWarnings("serial")
public class PortalGroup extends PortalWidget {

	@Description(Name="部件集合")
	@OneToMany(mappedBy="parent")
	private Set<PortalItem> items;

	@Description(Name="布局列数")
	private Integer layoutColumn;
	
	public Set<PortalItem> getItems() {
		return items;
	}

	public void setItems(Set<PortalItem> items) {
		this.items = items;
	}

	public Integer getLayoutColumn() {
		return layoutColumn;
	}

	public void setLayoutColumn(Integer layoutColumn) {
		this.layoutColumn = layoutColumn;
	}

}
