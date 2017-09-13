package com.keer.core.service;

import com.keer.core.annotation.TopSubClass;
import com.keer.core.bean.organization.Organization;

@TopSubClass(Organization.class)
@SuppressWarnings("rawtypes")
public interface IOrganizationBizService<T extends Organization> extends IAuthorityBizService<T> {

}
