package com.keer.core.bean.model;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@SuppressWarnings("serial")
public abstract class EditorHidden extends Editor {

	@ManyToOne
	@JoinColumn(name="containerid")
	private WidgetContainer xcontainer;

	@ManyToOne
	@JoinColumn(name="childStoreid")
	private WidgetStore childStore;
	
	public void setXcontainer(WidgetContainer xcontainer) {
		this.xcontainer = xcontainer;
	}

	public WidgetContainer getXcontainer() {
		return xcontainer;
	}

	public WidgetStore getChildStore() {
		return childStore;
	}

	public void setChildStore(WidgetStore childStore) {
		this.childStore = childStore;
	}
}
