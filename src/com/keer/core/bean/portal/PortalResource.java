package com.keer.core.bean.portal;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.OneToMany;

import com.keer.core.annotation.Description;
import com.keer.core.bean.resource.DataResource;

@Entity
@Description(Name="看板资源")
@SuppressWarnings("serial")
public class PortalResource extends DataResource {

	@Description(Name="部件集合")
	@OneToMany(mappedBy="resource")
	private Set<PortalWidget> childs;

	@Description(Name="布局列数")
	private Integer layoutColumn;
	
	public Set<PortalWidget> getChilds() {
		return childs;
	}

	public void setChilds(Set<PortalWidget> childs) {
		this.childs = childs;
	}

	public Integer getLayoutColumn() {
		return layoutColumn;
	}

	public void setLayoutColumn(Integer layoutColumn) {
		this.layoutColumn = layoutColumn;
	}
}
