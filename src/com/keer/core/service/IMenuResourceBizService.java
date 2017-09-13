package com.keer.core.service;


import java.util.Set;

import com.keer.core.annotation.TopSubClass;
import com.keer.core.bean.menu.MenuResource;
import com.keer.core.bean.organization.UserMember;

@TopSubClass(MenuResource.class)
public interface IMenuResourceBizService<T extends MenuResource> extends IAuthorityBizService<T> {

	public void InitializerMenu(UserMember user) throws Exception;
	
	/**
	 * 获取某一个菜单下的所有菜单资源
	 * @param menuid
	 * @return
	 * @throws Exception
	 */
	public Set<MenuResource> getAllChilds(String menuid) throws Exception;
	
}