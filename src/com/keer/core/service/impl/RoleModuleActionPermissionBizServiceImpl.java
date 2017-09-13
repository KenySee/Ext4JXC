package com.keer.core.service.impl;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.keer.core.bean.menu.Menu;
import com.keer.core.bean.menu.MenuResource;
import com.keer.core.bean.permission.module.RoleModulePermission;
import com.keer.core.bean.permission.module.action.RoleModuleActionPermission;
import com.keer.core.dao.SQLBuilder;
import com.keer.core.service.IRoleModuleActionPermissionBizService;
import com.keer.core.service.impl.GenericBizServiceImpl;

@Service("roleModuleActionPermissionBizService")
public class RoleModuleActionPermissionBizServiceImpl extends GenericBizServiceImpl<RoleModuleActionPermission> implements IRoleModuleActionPermissionBizService {

	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	public Set<MenuResource> findMenuResourceByRole(String roleid,String json)	throws Exception {
		Set<MenuResource> menus = new HashSet<MenuResource>();
		SQLBuilder builder = new SQLBuilder();
		builder.AddFilterWhere("role='"+roleid+"'");
		List<RoleModuleActionPermission> permissions = this.findAll(RoleModuleActionPermission.class, builder, json);
		Set<Menu> menuList = new HashSet<Menu>();
		for(RoleModuleActionPermission permission : permissions){
			Menu menu = permission.getMenu();
			if (!menuList.contains(menu)){
				menuList.add(menu);
			}
		}
		if (menuList.size() == 0){
			List<RoleModulePermission> modules = this.dao.findAll(RoleModulePermission.class, builder, null);
			for(RoleModulePermission module : modules){
				Menu menu = module.getResource();
				if (!menuList.contains(menu)){
					menuList.add(menu);
				}
			}
		}
		for(MenuResource menu : menuList){
			while(menu != null){
				if (!menus.contains(menu)){
					menus.add(menu);
				}
				menu = menu.getParent();
			}			
		}
		return menus;
	}
	
	@Override
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	public void save(RoleModuleActionPermission bean, SQLBuilder builder)	throws Exception {
//		if (bean instanceof RoleOrganizationActionPermission){
//			RoleOrganizationActionPermission org = (RoleOrganizationActionPermission)bean;
//			String clazz = org.getClazzScope();
//			if (!StringUtils.isNotBlank(clazz)){
//				throw new Exception("访问范围为空,无法保存");
//			}
//		}
		super.save(bean, builder);
	}
}