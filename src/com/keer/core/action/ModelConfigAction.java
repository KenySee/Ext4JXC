package com.keer.core.action;


import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import net.sf.json.JSONObject;

import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;

import com.keer.core.base.CRUDAction;
import com.keer.core.bean.base.JSONBean;
import com.keer.core.bean.model.ModelConfig;
import com.keer.core.dao.SQLBuilder;
import com.keer.core.service.IAuthorityBizService;
import com.keer.core.util.CacheLoaderUtil;
import com.keer.core.util.DefineClass;

@Action("ModelConfigAction")
@SuppressWarnings({"serial","rawtypes"})
public class ModelConfigAction extends CRUDAction<ModelConfig> {

	private String clazzname;
	private String node = null;
	private String parent = null;
	@Autowired
	private IAuthorityBizService<ModelConfig> modelConfigBizService;
	
	@Override
	public JSONBean bizDefaultBean(JSONBean bean) throws Exception {
		return bean;
	}
	
	@Override
	public Serializable getPrimaryValue(Class<JSONBean> clazz) {
		return this.getId();
	}
	@Override
	public void buildFilterString(Class<JSONBean> clazz,SQLBuilder builder) throws Exception {
		
	}
	@SuppressWarnings("unchecked")
	public void findAll() throws Exception {
		if (node != null && clazzname == null){
			clazzname = node;
		}
		if (navLoad){
			clazzname = "root";
		}
		if (clazzname != null){
			if (clazzname.equals("root")){
				DefineClass parent = CacheLoaderUtil.getDefineClass(ModelConfig.class);
				if (parent != null){
					List<JSONObject> list = new ArrayList<JSONObject>();
					for(DefineClass child : parent.getChilds()){
						JSONObject object = new JSONObject();
						String clazz = child.getClazzname();
						object.accumulate("id", clazz);
						object.accumulate("clazzname", clazz);
						object.accumulate("name", child.getDescription());
						object.accumulate("leaf", false);
						list.add(object);
					}
					JSONResponse(list);
				}
			}
			else {
				Class<?> objClass = Class.forName(this.getClazzname());
				Class<ModelConfig> clazz = (Class<ModelConfig>) objClass;
				if (clazz != null){
					sqlBuilder.AddFilterWhere(String.format("parent.id = '%s'", this.getParent()));
					List<?> list =  this.dao.findAll(clazz, sqlBuilder,json);
					JSONResponse(list);
				}
				else {
					throw new Exception("枚举类型不匹配");
				}
			}
		}
	}

	public String getNode() {
		return node;
	}

	public void setNode(String node) {
		this.node = node;
	}

	public String getClazzname() {
		return clazzname;
	}

	public void setClazzname(String clazzname) {
		this.clazzname = clazzname;
	}

	public String getParent() {
		return parent;
	}

	public void setParent(String parent) {
		this.parent = parent;
	}
}
