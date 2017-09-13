package com.keertech.demo.bean.extend;

import javax.persistence.Entity;

import com.keer.core.annotation.Description;
import com.keer.core.bean.organization.UserMember;

@Entity
@Description(Name="普通成员",Icon="user_add")
@SuppressWarnings({"serial"})
public class GenericUserMember extends UserMember {

}
