package com.keertech.demo.action;
import com.keer.core.dao.SQLBuilder;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;

import com.keertech.demo.bean.PartWorkContent;
import com.keertech.demo.service.IPartWorkContentBizService;
import com.keer.core.annotation.Permission;
import com.keertech.demo.bean.PartWork;
import com.keertech.demo.service.IPartWorkBizService;
import com.keer.core.annotation.Description;
import com.keer.core.base.CRUDAction;
import com.keer.core.bean.base.JSONBean;

@Description(Name="作品详情")
@Action("PartWorkContentAction")
@SuppressWarnings({"serial","rawtypes"})
public class PartWorkContentAction extends CRUDAction<PartWorkContent> {

	@Autowired
	private IPartWorkContentBizService partWorkContentBizService;
	
	@Autowired
	private IPartWorkBizService partWorkBizService;
	
	@Permission(action="VIEW_Work",desc="查看作品",bean=PartWork.class)
	public void findWork() throws Exception {
		this.find();
	}
	
	@Permission(action="VIEW_Work",desc="查看作品",bean=PartWork.class)
	public void findAllWork() throws Exception {
		this.findAll();
	}
	
	@Permission(action="ADD_Work",desc="添加作品",bean=PartWork.class)
	public void saveWork() throws Exception {
		this.save();
	}
	
	@Permission(action="EDIT_Work",desc="编辑作品",bean=PartWork.class)
	public void updateWork() throws Exception {
		this.update();
	}
	
	@Permission(action="DEL_Work",desc="删除作品",bean=PartWork.class)
	public void removeWork() throws Exception {
		this.remove();
	}
	
	@Override
	public JSONBean bizDefaultBean(JSONBean bean) throws Exception {
		return bean;
	}
		
	@Override
	public void buildFilterString(Class<JSONBean> clazz, SQLBuilder builder) throws Exception {
		String beanName = clazz.getSimpleName();
		if (beanName.equals("PartWorkContent")){
		}
	}
}
