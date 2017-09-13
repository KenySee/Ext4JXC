package com.keer.core.service.impl;

import com.keer.core.dao.SQLBuilder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.keer.core.bean.portal.PortalResource;
import com.keer.core.service.IPortalResourceBizService;
import com.keer.core.service.IPortalWidgetBizService;
import com.keer.core.service.impl.GenericBizServiceImpl;

@Service("portalResourceBizService")
public class PortalResourceBizServiceImpl extends GenericBizServiceImpl<PortalResource> implements IPortalResourceBizService {

	@Autowired
	private IPortalWidgetBizService portalWidgetBizService;
	
	@Override
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	public void delete(PortalResource bean, SQLBuilder builder)	throws Exception {
		super.delete(bean, builder);
	}
	
	@Override
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	public void update(PortalResource bean, SQLBuilder builder)	throws Exception {
		super.update(bean, builder);
	}
	
	@Override
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	public void save(PortalResource bean, SQLBuilder builder)	throws Exception {
		super.save(bean, builder);
	}
}