package com.keertech.demo.service.impl;

import com.keer.core.dao.SQLBuilder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.keertech.demo.bean.PartWorkContent;
import com.keertech.demo.service.IPartWorkContentBizService;
import com.keer.core.service.impl.GenericBizServiceImpl;

@Service("partWorkContentBizService")
public class PartWorkContentBizServiceImpl extends GenericBizServiceImpl<PartWorkContent> implements IPartWorkContentBizService {

	@Override
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	public void delete(PartWorkContent bean, SQLBuilder builder)	throws Exception {
		super.delete(bean, builder);
	}
	
	@Override
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	public void update(PartWorkContent bean, SQLBuilder builder)	throws Exception {
		super.update(bean, builder);
	}
	
	@Override
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	public void save(PartWorkContent bean, SQLBuilder builder)	throws Exception {
		super.save(bean, builder);
	}
}