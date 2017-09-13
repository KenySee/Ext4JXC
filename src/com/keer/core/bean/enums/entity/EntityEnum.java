package com.keer.core.bean.enums.entity;

import javax.persistence.DiscriminatorColumn;
import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.keer.core.annotation.Description;
import com.keer.core.bean.base.BaseBean;

@SuppressWarnings("serial")
@Entity
@Table(name="ts_entity_enum")
@DiscriminatorColumn(length=255)
@Inheritance(strategy=InheritanceType.SINGLE_TABLE)
@Description(Name="枚举类型")
public abstract class EntityEnum extends BaseBean implements Comparable<EntityEnum>{

	@Transient
	private Boolean leaf = true;
	
	@Description(Name="类别")
	private String type;
	
	public int compareTo(EntityEnum o) {
		String clazzname1 = this.getClazzname();
		String clazzname2 = o != null ? o.getClazzname() : ":";
		if (clazzname1.equals(clazzname2)){
			String type1 = this.getType();
			String type2 = o != null ? o.getSortno() : "";
			if (type2.equals(type1)){
				String sortno1 = this.getSortno();
				String sortno2 = o != null ? o.getSortno() : "";
				sortno1 = sortno1 == null ? "" : sortno1;
				return sortno2.compareTo(sortno1);
			}
			else {
				type1 = type1 == null ? "" : type1;
				return type2.compareTo(type1);
			}
		}
		else {
			clazzname1 = clazzname1 == null ? "" : clazzname1;
			return clazzname2.compareTo(clazzname1);
		}
	}
	
	public void setLeaf(Boolean leaf) {
		this.leaf = leaf;
	}

	public Boolean getLeaf() {
		return leaf;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
}
