package com.keer.core.service.impl;

import org.springframework.stereotype.Service;

import com.keer.core.bean.menu.MenuGroup;
import com.keer.core.service.IMenuGroupBizService;


@Service("menuGroupBizService")
public class MenuGroupBizServiceImpl extends GenericBizServiceImpl<MenuGroup>
		implements IMenuGroupBizService {

}
