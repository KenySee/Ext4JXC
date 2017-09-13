package com.keer.core.action;

import java.beans.PropertyDescriptor;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javassist.Modifier;

import javax.persistence.OneToMany;

import org.apache.struts2.convention.annotation.Action;

import com.keer.core.annotation.Description;
import com.keer.core.annotation.ExcludeSubClass;
import com.keer.core.annotation.TopSubClass;
import com.keer.core.base.JSONAction;
import com.keer.core.util.CacheLoaderUtil;
import com.keer.core.util.DefineClass;
import com.keer.core.util.GenericsUtils;

@Action("SplitButtonAction")
@SuppressWarnings({ "serial", "rawtypes" })
public class SplitButtonAction extends JSONAction {

	private String clazzname;
	private String suppername;

	private Set<DefineClass> findAllTopSubClass(DefineClass parent){
		Set<DefineClass> allDefines = new HashSet<DefineClass>();
		Class<?> supper = parent.getClazz();
		TopSubClass topClass = supper.getAnnotation(TopSubClass.class);
		if (topClass != null){
			DefineClass curDefine = CacheLoaderUtil.getDefineClass(topClass.value());
			allDefines.add(curDefine);
		}
		Set<DefineClass> childDefines = parent.getChilds();
		for(DefineClass define: childDefines){
			allDefines.addAll(this.findAllTopSubClass(define));
		}
		return allDefines;
	}
	public void find() throws Exception {
		Class<?> supper = Class.forName(suppername);
		DefineClass curDefine = CacheLoaderUtil.getDefineClass(supper);
		Set<DefineClass> subDefines = this.findAllTopSubClass(curDefine);
		Set<DefineClass> allDefines = curDefine.getAllConcreteDefine();
		List<Map<String,Object>> resultList = new ArrayList<Map<String,Object>>();
		for(DefineClass define: allDefines){
			Class<?> clazz = define.getClazz();
			Description desc = (Description) clazz.getAnnotation(Description.class);
			if (desc != null){
				Boolean hasDefine = subDefines.isEmpty();
				if (!hasDefine){
					for(DefineClass sub: subDefines){
						if (sub.getClazz().isAssignableFrom(clazz)){
							hasDefine = true;
							break;
						}
					}
				}
				if (hasDefine){
					Map<String,Object> resultMap = new HashMap<String, Object>();
					resultMap.put("text", define.getDescription());
					resultMap.put("clazz", define.getClazzname());
					resultMap.put("prop", define.getParent());
					resultMap.put("iconCls", desc.Icon());
					resultList.add(resultMap);
				}
			}
		}
		JSONResponse(resultList);
	}
	
	public void findAll() throws Exception {
		Class<?> clazz = Class.forName(clazzname);
		Class<?> supper = Class.forName(suppername);
		if (supper.isAssignableFrom(clazz)){
			Map<String, Field> fieldMap = CacheLoaderUtil.getFields(clazz, true);
			List<Map<String,Object>> resultList = new ArrayList<Map<String,Object>>();
			for (String key : fieldMap.keySet()) {
				Field field = fieldMap.get(key);
				Description desc = field.getAnnotation(Description.class);
				if (desc != null){
					Class propClass = field.getType();
					if (Collection.class.isAssignableFrom(propClass)){
						OneToMany many = field.getAnnotation(OneToMany.class);
						if (many != null){
							PropertyDescriptor pd = CacheLoaderUtil.getPropertyDescriptor(clazz, key);
							Method method = pd.getReadMethod();
							Class<?> clazz1 = GenericsUtils.getMethodGenericReturnType(method);
							if (supper.isAssignableFrom(clazz1)){
								Map<String,Object> resultMap = new HashMap<String, Object>();
								DefineClass def = CacheLoaderUtil.getDefineClass(clazz1);
								if (Modifier.isAbstract(clazz1.getModifiers())){
									List<Map<String,Object>> childList = new ArrayList<Map<String,Object>>();
									Set<DefineClass> allDefines = def.getAllConcreteDefine();
									for(DefineClass define: allDefines){
										Map<String,Object> childMap = new HashMap<String, Object>();
										ExcludeSubClass exclude = method.getAnnotation(ExcludeSubClass.class);
										Boolean notFound = true;
										if (exclude != null){
											for(Class<?> clazzType : exclude.value()){
												if (clazzType.isAssignableFrom(define.getClazz())){
													notFound = false;
													break;
												}
											}
										}
										if (exclude == null || notFound){
											childMap.put("text", define.getDescription());
											childMap.put("prop", many.mappedBy());
											childMap.put("clazz",define.getClazzname());
											childMap.put("iconCls", define.getIcon());
											childList.add(childMap);
										}
									}
									if (childList.size() > 0){
										if (childList.size() == 1){
											Map<String,Object> map = childList.get(0);
											resultMap.put("text", map.get("text"));
											resultMap.put("prop", map.get("prop"));
											resultMap.put("clazz", map.get("clazz"));
											resultMap.put("iconCls", map.get("iconCls"));
										}
										else {
											resultMap.put("text", desc.Name());
											resultMap.put("iconCls", desc.Icon());
											resultMap.put("menu",childList);
										}
									}
								}
								else {
									Description ann = method.getAnnotation(Description.class);
									if (ann != null){
										resultMap.put("text", ann.Name());
										resultMap.put("iconCls", ann.Icon());
									}
									else {
										resultMap.put("text", desc.Name());
										resultMap.put("iconCls", desc.Icon());
									}
									resultMap.put("clazz", clazz1.getName());
									resultMap.put("prop", many.mappedBy());
								}
								if (!resultMap.isEmpty()){
									resultList.add(resultMap);
								}
							}
						}
					}
				}
			}
			JSONResponse(resultList);
		}
		else {
			this.find();
		}
		
	}
	
	public String getClazzname() {
		return clazzname;
	}
	public void setClazzname(String clazzname) {
		this.clazzname = clazzname;
	}

	public String getSuppername() {
		return suppername;
	}

	public void setSuppername(String suppername) {
		this.suppername = suppername;
	}
}
