package com.keer.core.service.impl;


import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.keer.core.bean.model.ModelDesc;
import com.keer.core.service.IModelDescBizService;

@Transactional
@Service("modelDescBizService")
public class ModelDescBizServiceImpl extends GenericBizServiceImpl<ModelDesc> implements
		IModelDescBizService {

}
