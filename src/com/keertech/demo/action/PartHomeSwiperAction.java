package com.keertech.demo.action;
import org.apache.commons.lang.StringUtils;
import com.keer.core.dao.SQLBuilder;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;

import com.keertech.demo.bean.PartHomeSwiper;
import com.keertech.demo.service.IPartHomeSwiperBizService;
import com.keer.core.annotation.Description;
import com.keer.core.base.CRUDAction;
import com.keer.core.bean.base.JSONBean;

@Description(Name="首页轮播")
@Action("PartHomeSwiperAction")
@SuppressWarnings({"serial","rawtypes"})
public class PartHomeSwiperAction extends CRUDAction<PartHomeSwiper> {

	@Autowired
	private IPartHomeSwiperBizService partHomeSwiperBizService;
	
	private String title;
	
	@Override
	public JSONBean bizDefaultBean(JSONBean bean) throws Exception {
		return bean;
	}
		
	@Override
	public void buildFilterString(Class<JSONBean> clazz, SQLBuilder builder) throws Exception {
		String beanName = clazz.getSimpleName();
		if (beanName.equals("PartHomeSwiper")){
			if (StringUtils.isNotBlank(title)) {
				builder.AddFilterWhere("title like '%"+title+"%'");
			}
		}
	}
	
	public String getTitle() {
		return title;
	}
	
	public void setTitle(String title) {
		this.title = title;
	}
}
