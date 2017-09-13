package com.keer.core.bean.model;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.MappedSuperclass;

import com.keer.core.annotation.Description;
import com.keer.core.bean.base.GenericBean;
import com.keer.core.bean.enums.DataType;

@MappedSuperclass
@SuppressWarnings("serial")
public abstract class ModelDesc extends GenericBean implements Comparable<ModelDesc> {

	public abstract String toConfig();
	
	/**
	 * 数据类型
	 */
	@Enumerated(EnumType.STRING)
	@Column(length=10)
	@Description(Name="数据类型")
	private DataType dataType;
	
	/**
	 * 字段类型
	 */
	@Description(Name="字段类型")
	private String fieldType;
	
	/**
	 * 中文标题
	 */
	@Description(Name="中文标题")
	private String text;
	
	/**
	 * 映射名称
	 */
	@Description(Name="映射名称")
	private String dataIndex;
	
	/**
	 * 序号
	 */
	@Description(Name="序号")
	private Integer sortno;
	
	/**
	 * 列宽
	 */
	@Description(Name="列宽")
	private Integer columnWidth;
	

	/**
	 * 是否透明
	 */
	private Boolean isTransient = false;
	
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public String getDataIndex() {
		return dataIndex;
	}
	public void setDataIndex(String dataIndex) {
		this.dataIndex = dataIndex;
	}

	public void setSortno(Integer sortno) {
		this.sortno = sortno;
	}

	public Integer getSortno() {
		return sortno;
	}

	public String AsString(String str){
		return String.format("'%s'", str);
	}
	
	public int compareTo(ModelDesc o) {
		Integer sortno1 = this.getSortno();
		Integer sortno2 = o != null ? o.getSortno() : null;
		if (sortno1 != null && sortno2 != null){
			return sortno1 - sortno2;
		}
		else {
			return -1;
		}
	}

	public DataType getDataType() {
		return dataType;
	}

	public void setDataType(DataType dataType) {
		this.dataType = dataType;
	}

	public Integer getColumnWidth() {
		return columnWidth;
	}

	public void setColumnWidth(Integer columnWidth) {
		this.columnWidth = columnWidth;
	}
	public Boolean getIsTransient() {
		return isTransient;
	}
	public void setIsTransient(Boolean isTransient) {
		this.isTransient = isTransient;
	}
	public String getFieldType() {
		return fieldType;
	}
	public void setFieldType(String fieldType) {
		this.fieldType = fieldType;
	}
}
