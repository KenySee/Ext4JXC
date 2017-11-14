package com.keertech.demo.service.impl;

import com.keer.core.dao.SQLBuilder;
import com.keertech.demo.service.IPartWorkContentBizService;
import com.keertech.demo.service.IPartWorkSpecificationBizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.keertech.demo.bean.PartWork;
import com.keertech.demo.service.IPartWorkBizService;
import com.keer.core.service.impl.GenericBizServiceImpl;

@Service("partWorkBizService")
public class PartWorkBizServiceImpl extends GenericBizServiceImpl<PartWork> implements IPartWorkBizService {

	@Autowired
	private IPartWorkSpecificationBizService partWorkSpecificationBizService;

	@Autowired
	private IPartWorkContentBizService partWorkContentBizService;

	@Override
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	public void delete(PartWork bean, SQLBuilder builder)	throws Exception {
		super.delete(bean, builder);
	}
	
	@Override
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	public void update(PartWork bean, SQLBuilder builder)	throws Exception {
		super.update(bean, builder);
	}
	
	@Override
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	public void save(PartWork bean, SQLBuilder builder)	throws Exception {
		super.save(bean, builder);
	}
}