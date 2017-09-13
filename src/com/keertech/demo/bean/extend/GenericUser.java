package com.keertech.demo.bean.extend;

import javax.persistence.Entity;

import com.keer.core.annotation.Description;
import com.keer.core.bean.base.User;

@Entity
@Description(Name="普通用户",Icon="user_add")
@SuppressWarnings("serial")
public class GenericUser extends User {

}
