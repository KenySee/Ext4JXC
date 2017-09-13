package com.keer.core.accessscope.handler;


import com.keer.core.accessscope.AccessScopeHandler;
import com.keer.core.annotation.Description;
import com.keer.core.bean.base.JSONBean;
import com.keer.core.bean.organization.UserMember;

@Description(Name="系统级")
@SuppressWarnings({ "rawtypes", "serial"})
public class ScopeSystem extends AccessScopeHandler {

	@Override
	public String beanFilterString(Class<JSONBean> clazz, UserMember user) {
		String beanFilter = "1=1";
		return beanFilter;
	}
}
