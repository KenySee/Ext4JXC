package com.keertech.demo.service.impl;

import com.keer.core.dao.SQLBuilder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.keertech.demo.bean.PartWorkSpecification;
import com.keertech.demo.service.IPartWorkSpecificationBizService;
import com.keer.core.service.impl.GenericBizServiceImpl;

@Service("partWorkSpecificationBizService")
public class PartWorkSpecificationBizServiceImpl extends GenericBizServiceImpl<PartWorkSpecification> implements IPartWorkSpecificationBizService {

	@Override
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	public void delete(PartWorkSpecification bean, SQLBuilder builder)	throws Exception {
		super.delete(bean, builder);
	}
	
	@Override
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	public void update(PartWorkSpecification bean, SQLBuilder builder)	throws Exception {
		super.update(bean, builder);
	}
	
	@Override
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	public void save(PartWorkSpecification bean, SQLBuilder builder)	throws Exception {
		super.save(bean, builder);
	}
}