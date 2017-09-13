package com.keer.core.bean.model;

import javax.persistence.Entity;
import javax.persistence.Table;

import com.keer.core.annotation.Description;
import com.keer.core.bean.base.BaseBean;

@Entity
@Table(name="ts_view_widget")
@SuppressWarnings("serial")
@Description(Name="部件")
public abstract class Widget extends BaseBean {

	public void setClassname(String classname) {
		this.classname = classname;
	}

	public String getClassname() {
		return classname;
	}

	public void setAliasname(String aliasname) {
		this.aliasname = aliasname;
	}

	public String getAliasname() {
		return aliasname;
	}

	/**
	 * Extjs类名
	 */
	@Description(Name="类名")
	private String classname;
	
	/**
	 * Extjs别名
	 */
	@Description(Name="别名")
	private String aliasname;
	
}
