package com.keer.core.action;
import com.keer.core.dao.SQLBuilder;

import org.apache.commons.lang.StringUtils;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;

import com.keer.core.bean.portal.PortalItem;
import com.keer.core.bean.portal.PortalResource;
import com.keer.core.bean.portal.PortalWidget;
import com.keer.core.service.IPortalResourceBizService;
import com.keer.core.service.IPortalWidgetBizService;
import com.keer.core.annotation.Description;
import com.keer.core.annotation.Permission;
import com.keer.core.base.CRUDAction;
import com.keer.core.bean.base.JSONBean;

@Description(Name="首页门户")
@Action("PortalResourceAction")
@SuppressWarnings({"serial","rawtypes"})
public class PortalResourceAction extends CRUDAction<PortalResource> {

	@Autowired
	private IPortalResourceBizService portalResourceBizService;
	
	@Autowired
	private IPortalWidgetBizService portalWidgetBizService;
	
	private String resource;
	
	private String parent;
	
	@Override
	public JSONBean bizDefaultBean(JSONBean bean) throws Exception {
		return bean;
	}
		
	@Override
	public void buildFilterString(Class<JSONBean> clazz, SQLBuilder builder) throws Exception {
		String beanName = clazz.getSimpleName();
		if (beanName.equals("PortalResource")){
		}
		else if (beanName.equals("PortalWidget")){
			if (StringUtils.isNotBlank(resource)){
				builder.AddParamWhere("resource=:resource", resource);
			}
		}
		else if(beanName.equals("PortalItem")){
			if(StringUtils.isNotBlank(parent)){
				builder.AddParamWhere("parent=:parent", parent);
			}			
		}
	}
	@Permission(action="VIEW_ITEM",desc="",bean=PortalItem.class,ignore=true)
	public void findPortalItem() throws Exception {
		this.find();
	}
	
	@Permission(action="VIEW_ITEM",desc="",bean=PortalItem.class,ignore=true)
	public void findAllPortalItem() throws Exception {
		this.findAll();
	}

	@Permission(action="SAVE_ITEM",desc="",bean=PortalItem.class,ignore=true)
	public void savePortalItem()throws Exception {
		this.save();
	}
	
	@Permission(action="UPDATE_ITEM",desc="",bean=PortalItem.class,ignore=true)
	public void updatePortalItem()throws Exception {
		this.save();
	}
	
	@Permission(action="REMOVE_ITEM",desc="",bean=PortalItem.class,ignore=true)
	public void removePortalItem()throws Exception {
		this.save();
	}

	
	
	@Permission(action="VIEW_WIDGET",desc="",bean=PortalWidget.class,ignore=true)
	public void findPortalWidget() throws Exception {
		this.find();
	}
	
	@Permission(action="VIEW_WIDGET",desc="",bean=PortalWidget.class,ignore=true)
	public void findAllPortalWidget() throws Exception {
		this.findAll();
	}

	@Permission(action="SAVE_WIDGET",desc="",bean=PortalWidget.class,ignore=true)
	public void savePortalWidget()throws Exception {
		this.save();
	}
	
	@Permission(action="UPDATE_WIDGET",desc="",bean=PortalWidget.class,ignore=true)
	public void updatePortalWidget()throws Exception {
		this.save();
	}
	
	@Permission(action="REMOVE_WIDGET",desc="",bean=PortalWidget.class,ignore=true)
	public void removePortalWidget()throws Exception {
		this.save();
	}
	
	public String getResource() {
		return resource;
	}

	public void setResource(String resource) {
		this.resource = resource;
	}

	public String getParent() {
		return parent;
	}

	public void setParent(String parent) {
		this.parent = parent;
	}
}
