package com.keertech.demo.service.impl;

import com.keer.core.dao.SQLBuilder;
import com.keertech.demo.service.IPartStoryContentBizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.keertech.demo.bean.PartStory;
import com.keertech.demo.service.IPartStoryBizService;
import com.keer.core.service.impl.GenericBizServiceImpl;

@Service("partStoryBizService")
public class PartStoryBizServiceImpl extends GenericBizServiceImpl<PartStory> implements IPartStoryBizService {

	@Autowired
	private IPartStoryContentBizService partStoryContentBizService;

	@Override
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	public void delete(PartStory bean, SQLBuilder builder)	throws Exception {
		super.delete(bean, builder);
	}
	
	@Override
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	public void update(PartStory bean, SQLBuilder builder)	throws Exception {
		super.update(bean, builder);
	}
	
	@Override
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	public void save(PartStory bean, SQLBuilder builder)	throws Exception {
		super.save(bean, builder);
	}
}