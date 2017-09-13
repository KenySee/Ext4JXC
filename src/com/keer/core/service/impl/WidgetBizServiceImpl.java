package com.keer.core.service.impl;


import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.keer.core.bean.model.Widget;
import com.keer.core.service.IWidgetBizService;

@Transactional
@Service("widgetBizService")
public class WidgetBizServiceImpl extends GenericBizServiceImpl<Widget> implements
		IWidgetBizService {

}
