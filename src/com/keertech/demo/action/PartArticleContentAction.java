package com.keertech.demo.action;
import org.apache.commons.lang.StringUtils;
import com.keer.core.dao.SQLBuilder;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;

import com.keertech.demo.bean.PartArticleContent;
import com.keertech.demo.service.IPartArticleContentBizService;
import com.keer.core.annotation.Permission;
import com.keertech.demo.bean.PartArticle;
import com.keertech.demo.service.IPartArticleBizService;
import com.keer.core.annotation.Description;
import com.keer.core.base.CRUDAction;
import com.keer.core.bean.base.JSONBean;

@Description(Name="文章内容")
@Action("PartArticleContentAction")
@SuppressWarnings({"serial","rawtypes"})
public class PartArticleContentAction extends CRUDAction<PartArticleContent> {

	@Autowired
	private IPartArticleContentBizService partArticleContentBizService;
	
	private String contentValue;
	@Autowired
	private IPartArticleBizService partArticleBizService;
	
	@Permission(action="VIEW_Article",desc="查看文章",bean=PartArticle.class)
	public void findArticle() throws Exception {
		this.find();
	}
	
	@Permission(action="VIEW_Article",desc="查看文章",bean=PartArticle.class)
	public void findAllArticle() throws Exception {
		this.findAll();
	}
	
	@Permission(action="ADD_Article",desc="添加文章",bean=PartArticle.class)
	public void saveArticle() throws Exception {
		this.save();
	}
	
	@Permission(action="EDIT_Article",desc="编辑文章",bean=PartArticle.class)
	public void updateArticle() throws Exception {
		this.update();
	}
	
	@Permission(action="DEL_Article",desc="删除文章",bean=PartArticle.class)
	public void removeArticle() throws Exception {
		this.remove();
	}
	
	@Override
	public JSONBean bizDefaultBean(JSONBean bean) throws Exception {
		return bean;
	}
		
	@Override
	public void buildFilterString(Class<JSONBean> clazz, SQLBuilder builder) throws Exception {
		String beanName = clazz.getSimpleName();
		if (beanName.equals("PartArticleContent")){
			if (StringUtils.isNotBlank(contentValue)) {
				builder.AddFilterWhere("contentValue like '%"+contentValue+"%'");
			}
		}
	}
	
	public String getContentValue() {
		return contentValue;
	}
	
	public void setContentValue(String contentValue) {
		this.contentValue = contentValue;
	}
}
