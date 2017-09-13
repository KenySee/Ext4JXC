package com.keer.core.service.impl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.keer.core.bean.enums.DataType;
import com.keer.core.bean.model.Editor;
import com.keer.core.bean.model.ModelColumn;
import com.keer.core.bean.model.ModelConfig;
import com.keer.core.bean.model.ModelField;
import com.keer.core.dao.SQLBuilder;
import com.keer.core.service.IEditorBizService;
import com.keer.core.service.IModelConfigBizService;

@Transactional
@Service("modelConfigBizService")
public class ModelConfigBizServiceImpl extends GenericBizServiceImpl<ModelConfig> implements
		IModelConfigBizService {

	@Autowired
	private IEditorBizService editorBizService;
	
	public void save(ModelConfig bean, SQLBuilder builder) throws Exception {
		if (bean instanceof ModelColumn){
			ModelConfig config = (ModelConfig)bean;
			DataType type = config.getDataType();
			Editor edit = config.getEditor();
			if (edit == null && (type == DataType.ENUM || bean instanceof ModelField)){
				throw new Exception(String.format("[%s]列的编辑部件不能为空", config.getText()));
			}
		}
		super.save(bean, builder);
	}
}
