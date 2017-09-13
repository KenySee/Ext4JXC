package com.keer.core.service.impl;


import java.util.ArrayList;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.keer.core.bean.model.EntityModel;
import com.keer.core.bean.model.ModelConfig;
import com.keer.core.bean.model.ModelDetail;
import com.keer.core.dao.SQLBuilder;
import com.keer.core.service.IEntityModelBizService;
import com.keer.core.service.IModelConfigBizService;

@Transactional
@Service("entityModelBizService")
public class EntityModelBizServiceImpl extends GenericBizServiceImpl<EntityModel> implements
		IEntityModelBizService {

	@Autowired
	private IModelConfigBizService modelConfigBizService;
	
	@Override
	public void delete(EntityModel bean, SQLBuilder builder) throws Exception {
		EntityModel model = this.find(EntityModel.class, bean.getId(), builder, null);
		Set<ModelDetail> childs = model.getDetails();
		this.dao.delete(new ArrayList<ModelDetail>(childs));
		
		Set<ModelConfig> configs = bean.getColumns();
		this.dao.delete(new ArrayList<ModelConfig>(configs));
		
		super.delete(model, builder);
	}
}
