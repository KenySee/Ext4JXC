package com.keer.core.service;

import com.keer.core.bean.base.JSONBean;
import com.keer.core.service.IAuthorityBizService;

@SuppressWarnings("rawtypes")
public interface IGenericBizService<T extends JSONBean> extends IAuthorityBizService<T> {

}