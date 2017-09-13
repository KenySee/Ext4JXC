package com.keer.core.bean.portal;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.keer.core.annotation.Description;
import com.keer.core.bean.base.GenericBean;
import com.keer.core.bean.enums.PortalType;

@Entity
@Table(name="ts_resource_widget")
@Description(Name="看板部件")
@SuppressWarnings("serial")
public abstract class PortalWidget extends GenericBean {

	@ManyToOne
	@Description(Name="门户资源")
	private PortalResource resource;
	
	@Description(Name="序号")
	private String sortno;
	
	@Description(Name="部件标题")
	private String name;
	
	@Enumerated(EnumType.STRING)
	@Description(Name="部件类型")
	private PortalType portalType;

	public PortalType getPortalType() {
		return portalType;
	}

	public void setPortalType(PortalType portalType) {
		this.portalType = portalType;
	}

	public PortalResource getResource() {
		return resource;
	}

	public void setResource(PortalResource resource) {
		this.resource = resource;
	}

	public String getSortno() {
		return sortno;
	}

	public void setSortno(String sortno) {
		this.sortno = sortno;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}
