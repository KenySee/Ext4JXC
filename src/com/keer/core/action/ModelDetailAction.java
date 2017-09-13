package com.keer.core.action;

import java.io.Serializable;

import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;

import com.keer.core.base.CRUDAction;
import com.keer.core.bean.base.JSONBean;
import com.keer.core.bean.model.ModelDetail;
import com.keer.core.dao.SQLBuilder;
import com.keer.core.service.IModelDetailBizService;

@Action("ModelDetailAction")
@SuppressWarnings({"serial","rawtypes"})
public class ModelDetailAction extends CRUDAction<ModelDetail> {

	private String parent = null;
	
	@Autowired
	private IModelDetailBizService modelDetailBizService;
	
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
		builder.AddFilterWhere(String.format("parent.id = '%s'", this.getParent()));
		builder.AddFilterWhere(String.format("(isTransient is null or isTransient = false)"));
	}
	
	public String getParent() {
		return parent;
	}

	public void setParent(String parent) {
		this.parent = parent;
	}
}
