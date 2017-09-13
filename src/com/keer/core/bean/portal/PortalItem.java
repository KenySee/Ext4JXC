package com.keer.core.bean.portal;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.keer.core.annotation.Description;
import com.keer.core.bean.organization.UserMember;

@Entity
@Table(name="ts_resource_widget")
@Description(Name="部件窗口")
@SuppressWarnings("serial")
public abstract class PortalItem extends PortalWidget {

	@ManyToOne
	@Description(Name="上级容器")
	private PortalGroup parent;

	@Description(Name="部件URL")
	private String widgetUrl;
	
	public abstract String buildWidgetURL(UserMember loginUser);
	
	public String getWidgetUrl() {
		return widgetUrl;
	}

	public void setWidgetUrl(String widgetUrl) {
		this.widgetUrl = widgetUrl;
	}

	public PortalGroup getParent() {
		return parent;
	}

	public void setParent(PortalGroup parent) {
		this.parent = parent;
	}
}
