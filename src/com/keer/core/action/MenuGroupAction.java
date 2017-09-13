package com.keer.core.action;

import java.io.Serializable;

import org.apache.commons.lang.StringUtils;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;

import com.keer.core.base.CRUDAction;
import com.keer.core.bean.base.JSONBean;
import com.keer.core.bean.menu.MenuGroup;
import com.keer.core.dao.SQLBuilder;
import com.keer.core.service.IMenuGroupBizService;

@Action("MenuGroupAction")
@SuppressWarnings({"serial","rawtypes"})
public class MenuGroupAction extends CRUDAction<MenuGroup> {

	@Autowired
	private IMenuGroupBizService menuGroupBizService;
	
	@Override
	public JSONBean bizDefaultBean(JSONBean bean) throws Exception {
		return bean;
	}
	
	@Override
	public Serializable getPrimaryValue(Class<JSONBean> clazz) {
		return this.getId();
	}
	
	private String node;
	private String parent;
	
	@Override
	public void buildFilterString(Class<JSONBean> clazz,SQLBuilder builder) throws Exception {
		if (StringUtils.isNotBlank(parent)){
			this.node = parent;
		}
		if (navLoad){
			if (node != null && (node.equals("NaN") || node.indexOf("root") >= 0 || node.equals(""))){
				builder.AddFilterWhere("parent is null");
			}
			else {
				builder.AddFilterWhere(String.format("parent = '%s'",getNode()));
			}
		}
		else {
			builder.AddFilterWhere(String.format("parent = '%s'",node));
		}
		builder.AddOrderBy("sortno");
	}

	public String getNode() {
		return node;
	}

	public void setNode(String node) {
		this.node = node;
	}

	public String getParent() {
		return parent;
	}

	public void setParent(String parent) {
		this.parent = parent;
	}
}
