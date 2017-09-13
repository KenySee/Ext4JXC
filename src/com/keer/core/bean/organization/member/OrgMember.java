package com.keer.core.bean.organization.member;

import javax.persistence.Entity;

import com.keer.core.annotation.Description;
import com.keer.core.bean.organization.Organization;

@Entity
@Description(Name="组织成员")
@SuppressWarnings({ "serial", "rawtypes"})
public abstract class OrgMember<C extends OrgMember, T extends OrgMember> extends Organization<C,T> {


}
