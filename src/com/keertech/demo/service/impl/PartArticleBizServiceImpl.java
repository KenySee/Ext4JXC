package com.keertech.demo.service.impl;

import com.keer.core.dao.SQLBuilder;
import com.keertech.demo.service.IPartArticleContentBizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.keertech.demo.bean.PartArticle;
import com.keertech.demo.service.IPartArticleBizService;
import com.keer.core.service.impl.GenericBizServiceImpl;

@Service("partArticleBizService")
public class PartArticleBizServiceImpl extends GenericBizServiceImpl<PartArticle> implements IPartArticleBizService {

	@Autowired
	private IPartArticleContentBizService partArticleContentBizService;

	@Override
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	public void delete(PartArticle bean, SQLBuilder builder)	throws Exception {
		super.delete(bean, builder);
	}
	
	@Override
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	public void update(PartArticle bean, SQLBuilder builder)	throws Exception {
		super.update(bean, builder);
	}
	
	@Override
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	public void save(PartArticle bean, SQLBuilder builder)	throws Exception {
		super.save(bean, builder);
	}
}