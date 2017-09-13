package com.keer.core.action;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;

import com.keer.core.annotation.Description;
import com.keer.core.base.CRUDAction;
import com.keer.core.bean.base.JSONBean;
import com.keer.core.bean.enums.entity.EntityEnum;
import com.keer.core.bean.model.Widget;
import com.keer.core.dao.SQLBuilder;
import com.keer.core.service.IWidgetBizService;
import com.keer.core.util.CacheLoaderUtil;
import com.keer.core.util.DefineClass;

@Action("WidgetAction")
@SuppressWarnings({"serial","rawtypes"})
public class WidgetAction extends CRUDAction<Widget> {
	
	private String clazzname;
	private String node = null;
	
	@Autowired
	private IWidgetBizService widgetBizService;
	
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
		if (this.node != null){
			this.clazzname = this.node;
		}
		if (getNavLoad()) {
			DefineClass parent = CacheLoaderUtil.getDefineClass(Widget.class);
			if (parent != null) {
				List<JSONObject> list = new ArrayList<JSONObject>();
				for (DefineClass child : parent.getChilds()) {
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
			if (StringUtils.isNotBlank(this.clazzname)) {
				Class<?> objClass = Class.forName(this.clazzname);
				Class<Widget> clazz = (Class<Widget>) objClass;
				if (clazz != null) {
					List<?> list = widgetBizService.findAll(clazz,sqlBuilder,json);
					JSONResponse(list);
				} 
				else {
					throw new Exception("枚举类型不匹配");
				}				
			} 
			else {
				JSONResponse(new ArrayList<EntityEnum>());
			}
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
}
