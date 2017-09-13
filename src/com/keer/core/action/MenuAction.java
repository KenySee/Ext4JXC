package com.keer.core.action;

import java.io.Serializable;

import org.apache.commons.lang.StringUtils;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;

import com.keer.core.bean.base.JSONBean;
import com.keer.core.bean.menu.Menu;
import com.keer.core.service.IMenuBizService;
import com.keer.core.base.CRUDAction;
import com.keer.core.dao.SQLBuilder;

@Action("MenuAction")
@SuppressWarnings({"serial","rawtypes"})
public class MenuAction extends CRUDAction<Menu> {

	@Autowired
	private IMenuBizService menuBizService;
	
	@Override
	public JSONBean bizDefaultBean(JSONBean bean) throws Exception {
		return bean;
	}
	
	@Override
	public Serializable getPrimaryValue(Class<JSONBean> clazz) {
		return this.getId();
	}
	
	private String name;
	
	private String menugroup;
	
	@Override
	public void buildFilterString(Class<JSONBean> clazz,SQLBuilder builder) throws Exception {
		if (StringUtils.isNotBlank(name)) {
			builder.AddFilterWhere("name like '%"+name+"%'");
		}
		if (StringUtils.isNotBlank(menugroup)){
			builder.AddFilterWhere(String.format("parent='%s' or parent.parent='%s'", menugroup, menugroup));
		}
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	public String getMenugroup() {
		return menugroup;
	}
	public void setMenugroup(String menugroup) {
		this.menugroup = menugroup;
	}
}
