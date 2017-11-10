package com.keertech.demo.service.impl;

import com.keer.core.dao.SQLBuilder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.keertech.demo.bean.PartArticleContent;
import com.keertech.demo.service.IPartArticleContentBizService;
import com.keer.core.service.impl.GenericBizServiceImpl;

@Service("partArticleContentBizService")
public class PartArticleContentBizServiceImpl extends GenericBizServiceImpl<PartArticleContent> implements IPartArticleContentBizService {

	@Override
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	public void delete(PartArticleContent bean, SQLBuilder builder)	throws Exception {
		super.delete(bean, builder);
	}
	
	@Override
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	public void update(PartArticleContent bean, SQLBuilder builder)	throws Exception {
		super.update(bean, builder);
	}
	
	@Override
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	public void save(PartArticleContent bean, SQLBuilder builder)	throws Exception {
		super.save(bean, builder);
	}
}