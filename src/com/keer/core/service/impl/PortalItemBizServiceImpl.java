package com.keer.core.service.impl;

import com.keer.core.dao.SQLBuilder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.keer.core.bean.portal.PortalItem;
import com.keer.core.service.IPortalItemBizService;
import com.keer.core.service.impl.GenericBizServiceImpl;

@Service("portalItemBizService")
public class PortalItemBizServiceImpl extends GenericBizServiceImpl<PortalItem> implements IPortalItemBizService {

	@Override
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	public void delete(PortalItem bean, SQLBuilder builder)	throws Exception {
		super.delete(bean, builder);
	}
	
	@Override
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	public void update(PortalItem bean, SQLBuilder builder)	throws Exception {
		super.update(bean, builder);
	}
	
	@Override
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	public void save(PortalItem bean, SQLBuilder builder)	throws Exception {
		super.save(bean, builder);
	}
}