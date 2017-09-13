package com.keer.core.service.impl;

import org.springframework.stereotype.Service;

import com.keer.core.bean.menu.Menu;
import com.keer.core.service.IMenuBizService;

@Service("menuBizService")
public class MenuBizServiceImpl extends MenuResourceBizServiceImpl<Menu> implements IMenuBizService {

}