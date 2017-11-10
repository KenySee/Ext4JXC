package com.keertech.demo.action;
import com.keer.core.dao.SQLBuilder;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;

import com.keertech.demo.bean.PartArtist;
import com.keertech.demo.service.IPartArtistBizService;
import com.keer.core.annotation.Description;
import com.keer.core.base.CRUDAction;
import com.keer.core.bean.base.JSONBean;

@Description(Name="匠人")
@Action("PartArtistAction")
@SuppressWarnings({"serial","rawtypes"})
public class PartArtistAction extends CRUDAction<PartArtist> {

	@Autowired
	private IPartArtistBizService partArtistBizService;
	
	
	@Override
	public JSONBean bizDefaultBean(JSONBean bean) throws Exception {
		return bean;
	}
		
	@Override
	public void buildFilterString(Class<JSONBean> clazz, SQLBuilder builder) throws Exception {
		String beanName = clazz.getSimpleName();
		if (beanName.equals("PartArtist")){
		}
	}
}
