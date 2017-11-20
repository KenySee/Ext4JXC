package com.keertech.demo.service.impl;

import com.keer.core.dao.SQLBuilder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.keertech.demo.bean.PartHomeSwiper;
import com.keertech.demo.service.IPartHomeSwiperBizService;
import com.keer.core.service.impl.GenericBizServiceImpl;

@Service("partHomeSwiperBizService")
public class PartHomeSwiperBizServiceImpl extends GenericBizServiceImpl<PartHomeSwiper> implements IPartHomeSwiperBizService {

	@Override
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	public void delete(PartHomeSwiper bean, SQLBuilder builder)	throws Exception {
		super.delete(bean, builder);
	}
	
	@Override
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	public void update(PartHomeSwiper bean, SQLBuilder builder)	throws Exception {
		super.update(bean, builder);
	}
	
	@Override
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	public void save(PartHomeSwiper bean, SQLBuilder builder)	throws Exception {
		super.save(bean, builder);
	}
}