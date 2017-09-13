package com.keer.core.bean.base;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.MappedSuperclass;

import com.keer.core.annotation.Description;
import com.keer.core.bean.IResource;
import com.keer.core.bean.enums.Status;


/**
 * 基础档案抽象类
 * @author 周方明
 *
 */
@MappedSuperclass
@SuppressWarnings("serial")
public abstract class BaseBean extends GenericBean implements IResource {
	
	@Description(Name="编号")
	@Column(length=200)
	private String code;
	
	@Description(Name="名称")
	@Column(length=80)
	private String name;	
	
	@Description(Name="状态")
	@Enumerated(EnumType.STRING)
	@Column(length=10)
	private Status status;
	
	@Description(Name="排序")
	private String sortno;
	
	@Description(Name="备注")
	private String remark;
	
	@Description(Name="创建时间")
	private Date createdTime;
	
	public void setCode(String code) {
		this.code = code;
	}

	public String getCode() {
		return code;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public void setSortno(String sortno) {
		this.sortno = sortno;
	}

	public String getSortno() {
		return sortno;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	public Status getStatus() {
		return status;
	}
	
	public Boolean IsDisable() {
		return Status.DISABLE == status;
	}
	
	public Boolean IsActive() {
		return Status.USING == status;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getRemark() {
		return remark;
	}

	public Date getCreatedTime() {
		return createdTime;
	}

	public void setCreatedTime(Date createdTime) {
		this.createdTime = createdTime;
	}
}
