package com.keer.core.accessscope.handler;

import java.lang.reflect.Method;

import com.keer.core.accessscope.AccessScopeHandler;
import com.keer.core.annotation.Description;
import com.keer.core.annotation.ScopeProperty;
import com.keer.core.bean.base.JSONBean;
import com.keer.core.bean.organization.Corporation;
import com.keer.core.bean.organization.UserMember;

@Description(Name="公司级")
@SuppressWarnings({ "rawtypes", "serial", "unchecked" })
public class ScopeCorporation extends AccessScopeHandler {

	@Override
	public String beanFilterString(Class<JSONBean> clazz, UserMember user) {
		Corporation corporation = user.getCorporation();
		String beanFilter = "";
		while(clazz != JSONBean.class){
			ScopeProperty scope  = clazz.getAnnotation(ScopeProperty.class);
			if (scope != null){
				for(Class<?> access : scope.value()){
					if (access == ScopeDepartment.class){
						if (beanFilter != ""){
							beanFilter += " OR ";
						}
						beanFilter += String.format("orgFullPath like '%s%s'", corporation.getOrgFullPath(),"%");
					}
				}
			}
			else {
				Method[] methods = clazz.getDeclaredMethods();
				for(Method method : methods){
					scope = method.getAnnotation(ScopeProperty.class);
					if (scope != null){
						String name = method.getName().substring(3);
						String first = name.substring(0, 1).toLowerCase();
						String rest = name.substring(1, name.length());
						String prop = new StringBuffer(first).append(rest).toString();
						for(Class<?> access : scope.value()){
							if (access == ScopeDepartment.class){
								if (beanFilter != ""){
									beanFilter += " OR ";
								}
								beanFilter += String.format("%s.orgFullPath like '%s%s'", prop,corporation.getOrgFullPath(),"%");
							}
						}
					}
				}
			}
			clazz = (Class<JSONBean>) clazz.getSuperclass();
		}
		return beanFilter;
	}
}
