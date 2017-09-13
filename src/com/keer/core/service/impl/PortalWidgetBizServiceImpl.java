package com.keer.core.service.impl;

import com.keer.core.dao.SQLBuilder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.keer.core.bean.portal.PortalWidget;
import com.keer.core.service.IPortalItemBizService;
import com.keer.core.service.IPortalWidgetBizService;
import com.keer.core.service.impl.GenericBizServiceImpl;

@Service("portalWidgetBizService")
public class PortalWidgetBizServiceImpl extends GenericBizServiceImpl<PortalWidget> implements IPortalWidgetBizService {

	@Autowired
	private IPortalItemBizService portalItemBizService;
	
	@Override
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	public void delete(PortalWidget bean, SQLBuilder builder)	throws Exception {
		super.delete(bean, builder);
	}
	
	@Override
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	public void update(PortalWidget bean, SQLBuilder builder)	throws Exception {
		super.update(bean, builder);
	}
	
	@Override
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	public void save(PortalWidget bean, SQLBuilder builder)	throws Exception {
		super.save(bean, builder);
	}
}