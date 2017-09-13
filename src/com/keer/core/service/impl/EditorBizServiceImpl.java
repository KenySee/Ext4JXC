package com.keer.core.service.impl;


import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.keer.core.bean.model.Editor;
import com.keer.core.service.IEditorBizService;

@Transactional
@Service("editBizService")
public class EditorBizServiceImpl extends GenericBizServiceImpl<Editor> implements	IEditorBizService {

}
