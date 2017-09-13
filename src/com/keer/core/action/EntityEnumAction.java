package com.keer.core.action;

import java.io.Serializable;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import net.sf.json.JSONObject;

import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;

import com.keer.core.annotation.Description;
import com.keer.core.base.CRUDAction;
import com.keer.core.bean.base.JSONBean;
import com.keer.core.bean.enums.IEnumRender;
import com.keer.core.bean.enums.IEnums;
import com.keer.core.bean.enums.Status;
import com.keer.core.bean.enums.entity.EntityEnum;
import com.keer.core.service.IEntityEnumBizService;
import com.keer.core.dao.SQLBuilder;
import com.keer.core.util.CacheLoaderUtil;
import com.keer.core.util.DefineClass;
import com.keer.core.util.GenericsUtils;

@Action("EntityEnumAction")
@SuppressWarnings({"serial","rawtypes"})
public class EntityEnumAction extends CRUDAction<EntityEnum> {

	private String clazzname;
	private String node = null;
	private String name;
	private String[] clazzArray;
	
	@Autowired
	private IEntityEnumBizService entityEnumBizService;
	
	@Override
	public Serializable getPrimaryValue(Class<JSONBean> clazz) {
		return this.getId();
	}
	
	@Override
	public JSONBean bizDefaultBean(JSONBean bean) throws Exception {
		return bean;
	}
	
	@Override
	public void buildFilterString(Class<JSONBean> clazz,SQLBuilder builder) throws Exception {
		
	}
	
	@SuppressWarnings("unchecked")
	public void buildEnumStore() throws Exception {
		DefineClass parent = CacheLoaderUtil.getDefineClass(IEnums.class);
		List<Map<String, Object>> beanList = new ArrayList<Map<String,Object>>();
		for(DefineClass child : parent.getAllDefine()){
			Class<?> clazz = child.getClazz();
			if (clazz.isEnum()){
				Map<String, Object> bean = new HashMap<String, Object>();
				String id = clazz.getSimpleName();
				bean.put("id", id);
				bean.put("clazz", clazz.getName());
				List<Map<String, Object>> dataList = new ArrayList<Map<String,Object>>();
				try {
					Class<?> objClass = Class.forName(clazz.getName());
					IEnumRender render = null;
					if (GenericsUtils.IsInterface(objClass, IEnumRender.class)){
						render = (IEnumRender) objClass.newInstance();
						objClass = render.enumsClass();
					}
					Method method = objClass.getMethod("values");
					Object[] arr = (Object[]) method.invoke(objClass);
					for(Object obj : arr){
						IEnums nums = (IEnums)obj;
						nums.setRender(render);
						String type = nums.type()!=null ? nums.type() : "";
						Map<String, Object> data = new HashMap<String, Object>();
						data.put("id", nums.value());
						data.put("name", nums.text());
						data.put("type", type);
						dataList.add(data);
					}
				} 
				catch (Exception e) {	}
				bean.put("data",dataList);
				beanList.add(bean);
			}
		}
		SQLBuilder builder = new SQLBuilder();
		builder.AddParamWhere("status=:status", Status.USING);
		List<EntityEnum> enumsList = this.dao.findAll(EntityEnum.class, builder, null);
		Collections.sort(enumsList);
		DefineClass enumParent = CacheLoaderUtil.getDefineClass(EntityEnum.class);
		Set<DefineClass> enumChilds = enumParent.getAllConcreteDefine();
		Map<String, Object> bean = new HashMap<String, Object>();
		List<Map<String, Object>> dataList = new ArrayList<Map<String,Object>>();
		for(EntityEnum enums : enumsList){
			Class<?> clazz = enums.getClass();
			String id = clazz.getSimpleName();
			if (!id.equals(bean.get("id"))){
				DefineClass define = CacheLoaderUtil.getDefineClass(clazz);
				if (define != null){
					enumChilds.remove(define);
				}
				bean = new HashMap<String, Object>();
				bean.put("id", id);
				bean.put("clazz", clazz.getName());
				dataList = new ArrayList<Map<String,Object>>();
				bean.put("data",dataList);
				beanList.add(bean);
			}
			Map<String, Object> data = new HashMap<String, Object>();
			data.put("id", enums.getId());
			data.put("name", enums.getName());
			data.put("type", enums.getType());
			dataList.add(data);
		}
		for(DefineClass child : enumChilds){
			Map<String, Object> item = new HashMap<String, Object>();
			item.put("id", id);
			item.put("clazz", child.getClazzname());
			item.put("data", new ArrayList<Map<String,Object>>());
			beanList.add(bean);
		}
		JSONResponse(beanList);
	}
	
	@SuppressWarnings({ "unchecked" })
	public void findAll() throws Exception {
		SQLBuilder builder=new SQLBuilder();
		if(name!=null && !"".equals(name)){
			builder.AddFilterWhere("name like :name");
			builder.AddParam("name", "%"+name+"%");
		}
		if (this.clazzname == null){
			this.clazzname = "";
		}
		if (this.node != null && this.clazzname.equals("")){
			this.clazzname = this.node;
		}
		if (this.clazzname != null){
			if (getNavLoad()){
				DefineClass parent = CacheLoaderUtil.getDefineClass(EntityEnum.class);
				if (parent != null){
					List<JSONObject> list = new ArrayList<JSONObject>();
					for(DefineClass child : parent.getAllConcreteDefine()){
						JSONObject object = new JSONObject();
						String clazz = child.getClazzname();
						Class<?> class1 = child.getClazz();
						Description desc = class1.getAnnotation(Description.class);
						object.accumulate("id", clazz);
						object.accumulate("clazzname", clazz);
						object.accumulate("name", child.getDescription());
						object.accumulate("leaf", false);
						object.accumulate("indexCls", desc != null ? desc.Icon() : "application_view_columns");
						list.add(object);
					}
					JSONResponse(list);
				}
			}
			else {
				if (this.clazzname.equals("") || this.clazzname.lastIndexOf(".") == -1){
					JSONResponse(new ArrayList<EntityEnum>());
				}
				else {
					Class<?> objClass = Class.forName(this.clazzname);
					if (GenericsUtils.IsInterface(objClass, IEnums.class)){
						Method method = objClass.getMethod("values");
						Object[] arr = (Object[]) method.invoke(objClass);
						List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
						for(Object obj : arr){
							IEnums nums = (IEnums)obj;
							Map<String, Object> map = new HashMap<String, Object>();
							map.put("id", nums.value());
							map.put("name", nums.text());
							list.add(map);
						}
						JSONResponse(list);
					}
					else if (GenericsUtils.IsInterface(objClass, IEnumRender.class)){
						IEnumRender render = (IEnumRender) objClass.newInstance();
						objClass = render.enumsClass();
						Method method = objClass.getMethod("values");
						Object[] arr = (Object[]) method.invoke(objClass);
						List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
						for(Object obj : arr){
							IEnums nums = (IEnums)obj;
							nums.setRender(render);
							Map<String, Object> map = new HashMap<String, Object>();
							map.put("id", nums.value());
							map.put("name", nums.text());
							list.add(map);
						}
						JSONResponse(list);
					}
					else if (EntityEnum.class.isAssignableFrom(objClass)) {
						Class<EntityEnum> clazz = (Class<EntityEnum>) objClass;
						if (clazz != null){
							List<?> list =  entityEnumBizService.findAll(clazz, builder, json);
							JSONResponse(list);
						}
						else {
							throw new Exception("枚举类型不匹配");
						}
					}
				}
			}
		}
		else {
		}
	}

	public void setClazzname(String clazzname) {
		this.clazzname = clazzname;
	}

	public String getClazzname() {
		return clazzname;
	}

	public void setNode(String node) {
		this.node = node;
	}

	public String getNode() {
		return node;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setClazzArray(String[] clazzArray) {
		this.clazzArray = clazzArray;
	}

	public String[] getClazzArray() {
		return clazzArray;
	}
}
