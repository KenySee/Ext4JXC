package com.keer.core.service.impl;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import com.keer.core.annotation.Permission;
import com.keer.core.base.CRUDAction;
import com.keer.core.base.JSONAction;
import com.keer.core.bean.menu.MenuActionDesc;
import com.keer.core.service.IMenuActionBizService;
import com.keer.core.service.impl.GenericBizServiceImpl;

@Service("menuActionBizService")
public class MenuActionBizServiceImpl extends GenericBizServiceImpl<MenuActionDesc> implements IMenuActionBizService {

	public List<MenuActionDesc> findActionList(String clazzAction) throws Exception{
		List<MenuActionDesc> list = new ArrayList<MenuActionDesc>();
		Class<?> clazz = null;
		try {
			clazz = Class.forName(clazzAction);
			if (clazz != null) {
				if (CRUDAction.class.isAssignableFrom(clazz)) {
					Class<?> action = clazz;
					while (action != JSONAction.class) {
						for (Method method : action.getDeclaredMethods()) {
							Permission annotation = method.getAnnotation(Permission.class);
							if (annotation != null) {
								Boolean notFound = true;
								String act = annotation.action();
								if (StringUtils.isNotBlank(act)){
									for(MenuActionDesc menu : list){
										if (act.equals(menu.getActionType())){
											notFound = false;
											break;
										}
									}
								}
								else {
									notFound = false;
								}
								if (notFound){
									MenuActionDesc menuAction = new MenuActionDesc();
									menuAction.setActionDesc(annotation.desc());
									menuAction.setActionType(annotation.action());
									list.add(menuAction);
								}
							}
						}
						action = action.getSuperclass();
					}
				}
			}
		} 
		catch (ClassNotFoundException e) {
			throw new Exception("模块类名不存在");
		}
		return list;
	}
}