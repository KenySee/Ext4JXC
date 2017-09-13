package com.keer.core.bean.model;


import javax.persistence.Entity;

import com.keer.core.annotation.Description;

@Entity
@SuppressWarnings("serial")
public abstract class EditorComponent extends Editor {

	@Description(Name="显示字段")
	protected String displayField;

	public String getDisplayField() {
		return displayField;
	}

	public void setDisplayField(String displayField) {
		this.displayField = displayField;
	}

}
