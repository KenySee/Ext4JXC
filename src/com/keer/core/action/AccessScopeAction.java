package com.keer.core.action;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.apache.struts2.convention.annotation.Action;

import com.keer.core.accessscope.AccessScopeHandler;
import com.keer.core.accessscope.handler.ScopeSystem;
import com.keer.core.annotation.Description;
import com.keer.core.annotation.Permission;
import com.keer.core.annotation.ScopeProperty;
import com.keer.core.base.JSONAction;
import com.keer.core.bean.base.JSONBean;
import com.keer.core.util.CacheLoaderUtil;
import com.keer.core.util.DefineClass;
import com.keer.core.util.GenericsUtils;

@Action("AccessScopeAction")
@SuppressWarnings("serial")
public class AccessScopeAction extends JSONAction {

	/**
	 * 模块Action类名
	 */
	private String clazzAction;
	/**
	 * 模块动作类型
	 */
	private String actionType;
	
	/**
	 * 实体类名
	 */
	private String clazzBean;
	
	public void findAll() throws Exception {
		DefineClass parent = CacheLoaderUtil.getDefineClass(AccessScopeHandler.class);
		List<JSONObject> list = new ArrayList<JSONObject>();
		if (StringUtils.isNotBlank(clazzAction) && StringUtils.isNotBlank(actionType)){
			Class<?> clazz = Class.forName(clazzAction);
			if (JSONAction.class.isAssignableFrom(clazz)){
				Class<?> action = clazz;
				List<String> uniqueList = new ArrayList<String>();
				while(action != JSONAction.class){
					for(Method method : action.getDeclaredMethods()){
						Permission annotation = method.getAnnotation(Permission.class);
						if (annotation != null){
							if (actionType.equals(annotation.action())){
								Class<?> clazzBean = annotation.bean();
								if (annotation.ignore()){
									JSONObject object = new JSONObject();
									Class<?> access = ScopeSystem.class;
									if (!uniqueList.contains(access.getName())){
										uniqueList.add(access.getName());
										Description desc = access.getAnnotation(Description.class);
										object.accumulate("id", access.getName());
										object.accumulate("name", desc.Name());
										list.add(object);
									}
								}
								if (!JSONBean.class.isAssignableFrom(clazzBean)){
									clazzBean = GenericsUtils.getSuperClassGenricType(clazz);
								}
								while(clazzBean != Object.class && clazzBean != JSONBean.class){
									ScopeProperty scope  = clazzBean.getAnnotation(ScopeProperty.class);
									if (scope != null){
										for(Class<?> access : scope.value()){
											if (!uniqueList.contains(access.getName())){
												uniqueList.add(access.getName());
												JSONObject object = new JSONObject();
												object.accumulate("id", access.getName());
												Description desc = access.getAnnotation(Description.class);
												if (desc != null){
													object.accumulate("name", desc.Name());
													list.add(object);
												}
											}
										}
									}
									else {
										for(Method method1 : clazzBean.getDeclaredMethods()){
											scope = method1.getAnnotation(ScopeProperty.class);
											if (scope != null){
												for(Class<?> access : scope.value()){
													if (!uniqueList.contains(access.getName())){
														uniqueList.add(access.getName());
														JSONObject object = new JSONObject();
														object.accumulate("id", access.getName());
														Description desc = access.getAnnotation(Description.class);
														if (desc != null){
															object.accumulate("name", desc.Name());
															list.add(object);
														}
													}
												}
											}
										}
									}
									clazzBean = clazzBean.getSuperclass();
								}
							}
						}
					}
					action = action.getSuperclass();
				}
			}
		}
		else {
			if (StringUtils.isNotBlank(clazzBean)){
				Class<?> clazz = Class.forName(clazzBean);
				if (JSONBean.class.isAssignableFrom(clazz)){
					while(clazz != JSONBean.class){
						for(Method method1 : clazz.getDeclaredMethods()){
							ScopeProperty scope = method1.getAnnotation(ScopeProperty.class);
							if (scope != null){
								for(Class<?> access : scope.value()){
									JSONObject object = new JSONObject();
									object.accumulate("id", access.getName());
									Description desc = access.getAnnotation(Description.class);
									if (desc != null){
										object.accumulate("name", desc.Name());
										list.add(object);
									}
								}
							}
						}
						clazz = clazz.getSuperclass();
					}					
				}
			}
			else {
				for(DefineClass child : parent.getAllConcreteDefine()){
					JSONObject object = new JSONObject();
					object.accumulate("id", child.getClazzname());
					object.accumulate("name",child.getDescription());
					list.add(object);
				}
			}
		}
		JSONResponse(list);
	}
	public String getActionType() {
		return actionType;
	}
	public void setActionType(String actionType) {
		this.actionType = actionType;
	}
	public String getClazzAction() {
		return clazzAction;
	}
	public void setClazzAction(String clazzAction) {
		this.clazzAction = clazzAction;
	}
	public String getClazzBean() {
		return clazzBean;
	}
	public void setClazzBean(String clazzBean) {
		this.clazzBean = clazzBean;
	}
}
