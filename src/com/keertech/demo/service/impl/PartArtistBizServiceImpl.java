package com.keertech.demo.service.impl;

import com.keer.core.dao.SQLBuilder;
import com.keertech.demo.service.IPartArticleBizService;
import com.keertech.demo.service.IPartStoryBizService;
import com.keertech.demo.service.IPartWorkBizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.keertech.demo.bean.PartArtist;
import com.keertech.demo.service.IPartArtistBizService;
import com.keer.core.service.impl.GenericBizServiceImpl;

@Service("partArtistBizService")
public class PartArtistBizServiceImpl extends GenericBizServiceImpl<PartArtist> implements IPartArtistBizService {

	@Autowired
	private IPartArticleBizService partArticleBizService;

	@Autowired
	private IPartWorkBizService partWorkBizService;

	@Autowired
	private IPartStoryBizService partStoryBizService;

	@Override
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	public void delete(PartArtist bean, SQLBuilder builder)	throws Exception {
		super.delete(bean, builder);
	}
	
	@Override
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	public void update(PartArtist bean, SQLBuilder builder)	throws Exception {
		super.update(bean, builder);
	}
	
	@Override
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	public void save(PartArtist bean, SQLBuilder builder)	throws Exception {
		super.save(bean, builder);
	}
}