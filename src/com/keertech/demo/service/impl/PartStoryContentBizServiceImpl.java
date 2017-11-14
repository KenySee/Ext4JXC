package com.keertech.demo.service.impl;

import com.keer.core.dao.SQLBuilder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.keertech.demo.bean.PartStoryContent;
import com.keertech.demo.service.IPartStoryContentBizService;
import com.keer.core.service.impl.GenericBizServiceImpl;

@Service("partStoryContentBizService")
public class PartStoryContentBizServiceImpl extends GenericBizServiceImpl<PartStoryContent> implements IPartStoryContentBizService {

	@Override
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	public void delete(PartStoryContent bean, SQLBuilder builder)	throws Exception {
		super.delete(bean, builder);
	}
	
	@Override
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	public void update(PartStoryContent bean, SQLBuilder builder)	throws Exception {
		super.update(bean, builder);
	}
	
	@Override
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	public void save(PartStoryContent bean, SQLBuilder builder)	throws Exception {
		super.save(bean, builder);
	}
}