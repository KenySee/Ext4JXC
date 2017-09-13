package com.keer.core.service;

import java.util.List;

import com.keer.core.bean.menu.MenuActionDesc;
import com.keer.core.service.IAuthorityBizService;

public interface IMenuActionBizService extends IAuthorityBizService<MenuActionDesc> {

	public List<MenuActionDesc> findActionList(String clazzAction) throws Exception;
}