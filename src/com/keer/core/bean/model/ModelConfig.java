package com.keer.core.bean.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.keer.core.annotation.Description;


@Entity
@Table(name="ts_view_modelconfig")
@SuppressWarnings("serial")
@Description(Name="界面模型配置")
public abstract class ModelConfig extends ModelDesc {

	@ManyToOne
	@JoinColumn(name="parentid")
	@Description(Name="界面模型")
	private EntityModel parent;

	public void setParent(EntityModel parent) {
		this.parent = parent;
	}

	public EntityModel getParent() {
		return parent;
	}
	
	@OneToOne(cascade=CascadeType.ALL)
	@Description(Name="编辑部件")
	private Editor editor;
	
	public List<String> toRequires(){
		return editor != null ? editor.toRequires() : null;
	}
	
	public void setEditor(Editor editor) {
		this.editor = editor;
	}

	public Editor getEditor() {
		return editor;
	}
}
