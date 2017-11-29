package com.keertech.demo.service.impl;

import com.keer.core.dao.SQLBuilder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.keertech.demo.bean.PartReserve;
import com.keertech.demo.service.IPartReserveBizService;
import com.keer.core.service.impl.GenericBizServiceImpl;

@Service("partReserveBizService")
public class PartReserveBizServiceImpl extends GenericBizServiceImpl<PartReserve> implements IPartReserveBizService {

	@Override
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	public void delete(PartReserve bean, SQLBuilder builder)	throws Exception {
		super.delete(bean, builder);
	}
	
	@Override
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	public void update(PartReserve bean, SQLBuilder builder)	throws Exception {
		super.update(bean, builder);
	}
	
	@Override
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	public void save(PartReserve bean, SQLBuilder builder)	throws Exception {
		super.save(bean, builder);
	}
}