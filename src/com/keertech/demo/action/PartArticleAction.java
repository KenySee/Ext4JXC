package com.keertech.demo.action;
import org.apache.commons.lang.StringUtils;
import com.keer.core.dao.SQLBuilder;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;

import com.keertech.demo.bean.PartArticle;
import com.keertech.demo.service.IPartArticleBizService;
import com.keer.core.annotation.Permission;
import com.keertech.demo.bean.PartArtist;
import com.keertech.demo.service.IPartArtistBizService;
import com.keer.core.annotation.Description;
import com.keer.core.base.CRUDAction;
import com.keer.core.bean.base.JSONBean;

@Description(Name="文章")
@Action("PartArticleAction")
@SuppressWarnings({"serial","rawtypes"})
public class PartArticleAction extends CRUDAction<PartArticle> {

	@Autowired
	private IPartArticleBizService partArticleBizService;
	
	private String title;

	private String artist;
	@Autowired
	private IPartArtistBizService partArtistBizService;
	
	@Permission(action="VIEW_Artist",desc="查看匠人",bean=PartArtist.class)
	public void findArtist() throws Exception {
		this.find();
	}
	
	@Permission(action="VIEW_Artist",desc="查看匠人",bean=PartArtist.class)
	public void findAllArtist() throws Exception {
		this.findAll();
	}
	
	@Permission(action="ADD_Artist",desc="添加匠人",bean=PartArtist.class)
	public void saveArtist() throws Exception {
		this.save();
	}
	
	@Permission(action="EDIT_Artist",desc="编辑匠人",bean=PartArtist.class)
	public void updateArtist() throws Exception {
		this.update();
	}
	
	@Permission(action="DEL_Artist",desc="删除匠人",bean=PartArtist.class)
	public void removeArtist() throws Exception {
		this.remove();
	}
	
	@Override
	public JSONBean bizDefaultBean(JSONBean bean) throws Exception {
		return bean;
	}
		
	@Override
	public void buildFilterString(Class<JSONBean> clazz, SQLBuilder builder) throws Exception {
		String beanName = clazz.getSimpleName();
		if (beanName.equals("PartArticle")){
			if (StringUtils.isNotBlank(title)) {
				builder.AddFilterWhere("title like '%"+title+"%'");
			}
			if (StringUtils.isNotBlank(artist)) {
				builder.AddFilterWhere("artist.id='"+artist+"'");
			}
		}
	}
	
	public String getTitle() {
		return title;
	}
	
	public void setTitle(String title) {
		this.title = title;
	}

	public String getArtist() {
		return artist;
	}

	public void setArtist(String artist) {
		this.artist = artist;
	}
}
