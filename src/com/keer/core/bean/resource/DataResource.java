package com.keer.core.bean.resource;

import javax.persistence.Entity;

@Entity
@SuppressWarnings({ "serial"})
public abstract class DataResource extends Resource {

	@Override
	public String getClazzparent() {
		return Resource.class.getName();
	}
}
