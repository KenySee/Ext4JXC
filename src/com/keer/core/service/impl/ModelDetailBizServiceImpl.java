package com.keer.core.service.impl;


import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.keer.core.bean.model.ModelDetail;
import com.keer.core.service.IModelDetailBizService;

@Transactional
@Service("modelDetailBizService")
public class ModelDetailBizServiceImpl extends GenericBizServiceImpl<ModelDetail> implements
		IModelDetailBizService {

}
