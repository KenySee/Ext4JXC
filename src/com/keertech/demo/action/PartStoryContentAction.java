package com.keertech.demo.action;
import com.keer.core.dao.SQLBuilder;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;

import com.keertech.demo.bean.PartStoryContent;
import com.keertech.demo.service.IPartStoryContentBizService;
import com.keer.core.annotation.Permission;
import com.keertech.demo.bean.PartStory;
import com.keertech.demo.service.IPartStoryBizService;
import com.keer.core.annotation.Description;
import com.keer.core.base.CRUDAction;
import com.keer.core.bean.base.JSONBean;

@Description(Name="故事内容")
@Action("PartStoryContentAction")
@SuppressWarnings({"serial","rawtypes"})
public class PartStoryContentAction extends CRUDAction<PartStoryContent> {

	@Autowired
	private IPartStoryContentBizService partStoryContentBizService;
	
	@Autowired
	private IPartStoryBizService partStoryBizService;
	
	@Permission(action="VIEW_Story",desc="查看故事",bean=PartStory.class)
	public void findStory() throws Exception {
		this.find();
	}
	
	@Permission(action="VIEW_Story",desc="查看故事",bean=PartStory.class)
	public void findAllStory() throws Exception {
		this.findAll();
	}
	
	@Permission(action="ADD_Story",desc="添加故事",bean=PartStory.class)
	public void saveStory() throws Exception {
		this.save();
	}
	
	@Permission(action="EDIT_Story",desc="编辑故事",bean=PartStory.class)
	public void updateStory() throws Exception {
		this.update();
	}
	
	@Permission(action="DEL_Story",desc="删除故事",bean=PartStory.class)
	public void removeStory() throws Exception {
		this.remove();
	}
	
	@Override
	public JSONBean bizDefaultBean(JSONBean bean) throws Exception {
		return bean;
	}
		
	@Override
	public void buildFilterString(Class<JSONBean> clazz, SQLBuilder builder) throws Exception {
		String beanName = clazz.getSimpleName();
		if (beanName.equals("PartStoryContent")){
		}
	}
}
