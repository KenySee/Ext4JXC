package com.keer.core.bean.base;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;


/**
 * 主键生成实体
 * @author 周方明
 *
 */
@SuppressWarnings("serial")
@Entity
@Table(name="ts_keygenerator")
public class KeyBean extends EntityBean {

	/**
	 * 表名
	 */
	@Column(unique=true,updatable=false,nullable=false)
	private String keyName;
	/**
	 * 当前值
	 */
	@Column(nullable=false)
	private int keyValue;
    
	public String getKeyName() {
		return keyName;
	}
	public void setKeyName(String keyName) {
		this.keyName = keyName;
	}
	public int getKeyValue() {
		return keyValue;
	}
	public void setKeyValue(int keyValue) {
		this.keyValue = keyValue;
	}
	public Integer getVersion() {
		// TODO Auto-generated method stub
		return null;
	}
	public void setVersion(Integer version) {
		// TODO Auto-generated method stub
		
	}
}
