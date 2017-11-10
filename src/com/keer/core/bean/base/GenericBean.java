package com.keer.core.bean.base;

import java.util.Date;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.persistence.Table;
import javax.persistence.Version;

import com.keer.core.annotation.Description;
import com.keer.core.bean.comm.SystemVar;
import com.keer.core.dao.keygenerator.SingleKeyFactory;
import com.keer.core.util.IdGen;

/**
 * 通用实体抽象类(手动维护主键)
 * @author 周方明
 *
 */
@MappedSuperclass
@SuppressWarnings({"serial"})
public abstract class GenericBean extends JSONBean<String> {
	
	@Description(Name="ID")
	@Id
	private String id;
	
	@Version
	@Description(Name="版本号")
	private Integer version;
	
	@Description(Name="创建时间")
	@Column(updatable=false)
	private Date createDate;
	
	public void GeneratorKey() throws Exception {
		if (this.id == null){
			if (SystemVar.UUIDKey){
				this.id = UUID.randomUUID().toString();
			}
			else {
				this.id = IdGen.nextS();
//				for (Class<?> sc = this.getClass(); (sc != null); sc = sc.getSuperclass()){
//					Table table = sc.getAnnotation(Table.class);
//					if (table != null){
//						this.id = String.format("%d", SingleKeyFactory.getInstance().getNextKey(table.name()));
//						break;
//					}
//				}
			}
			this.setValid(true);
		}
	}
	
	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Integer getVersion() {
		return version;
	}

	public void setVersion(Integer version) {
		this.version = version;
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
