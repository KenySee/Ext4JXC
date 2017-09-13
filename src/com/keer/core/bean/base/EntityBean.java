package com.keer.core.bean.base;

import java.util.Date;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

import com.keer.core.annotation.Description;

/**
 * 主键实体抽象(数据库维护主键)
 * @author Administrator
 *
 */
@MappedSuperclass
@SuppressWarnings("serial")
public abstract class EntityBean extends JSONBean<Integer> {

	@Description(Name="ID")
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;
	
	@Description(Name="创建时间")
	private Date createDate;
	
	public void GeneratorKey() {

	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	
	@Override
	public Date getCreateDate() {
		return this.createDate;
	}
	@Override
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}	
}
