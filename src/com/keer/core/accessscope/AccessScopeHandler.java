package com.keer.core.accessscope;

import com.keer.core.bean.base.AbstractBean;
import com.keer.core.bean.base.JSONBean;
import com.keer.core.bean.organization.UserMember;

@SuppressWarnings({ "rawtypes", "serial" })
public abstract class AccessScopeHandler extends AbstractBean {

	public abstract String beanFilterString(Class<JSONBean> clazz, UserMember user);
}
