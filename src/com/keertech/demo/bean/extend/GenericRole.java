package com.keertech.demo.bean.extend;

import javax.persistence.Entity;

import com.keer.core.annotation.Description;
import com.keer.core.bean.base.Role;

@Entity
@Description(Name="角色",Icon="group_add")
@SuppressWarnings("serial")
public class GenericRole extends Role {

}
