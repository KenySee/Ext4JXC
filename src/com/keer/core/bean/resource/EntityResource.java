package com.keer.core.bean.resource;

import javax.persistence.Entity;
import com.keer.core.annotation.Description;

@Entity
@Description(Name="实体资源")
@SuppressWarnings("serial")
public abstract class EntityResource extends DataResource {

}
