package com.keer.core.bean.base;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.keer.core.annotation.Description;
import com.keer.core.bean.IResource;
import com.keer.core.bean.menu.MenuResource;
import com.keer.core.bean.permission.RoleResourcePermission;
import com.keer.core.bean.permission.data.RoleBundlePermission;
import com.keer.core.bean.permission.data.RoleDataPermission;
import com.keer.core.bean.permission.data.RoleEntityPermission;
import com.keer.core.bean.permission.module.RoleModulePermission;
import com.keer.core.bean.permission.module.action.RoleModuleActionPermission;
import com.keer.core.bean.resource.Resource;

@Entity
@Table(name="ts_role")
@Description(Name="角色管理")
@SuppressWarnings({"serial","rawtypes"})
public abstract class Role extends BaseBean {
	
	@Description(Name="资源权限")
	@OneToMany(mappedBy="role")
	private Set<RoleResourcePermission> permissions = new HashSet<RoleResourcePermission>();
	
	@Description(Name="模块动作")
	@OneToMany(mappedBy="role")
	private Set<RoleModuleActionPermission> moduleActionPermissions = new HashSet<RoleModuleActionPermission>();
	
	@Description(Name="模块权限")
	@Transient
	private Set<RoleModulePermission> modulePermissions;
	
	@Description(Name="数据权限")
	@Transient
	private Set<RoleEntityPermission> dataPermissions;
	
	@Description(Name="打包资源")
	@Transient
	private Set<RoleBundlePermission> bundlePermissions;
	
	public Set<RoleModulePermission> getModulePermissions() {
		modulePermissions = new HashSet<RoleModulePermission>();
		for(RoleResourcePermission permission : permissions){
			if (permission instanceof RoleModulePermission){
				modulePermissions.add((RoleModulePermission) permission);
			}
		}
		return modulePermissions;
	}
	
	public Set<RoleEntityPermission> getDataPermissions() {
		dataPermissions = new HashSet<RoleEntityPermission>();
		for(RoleResourcePermission permission : permissions){
			if (permission instanceof RoleEntityPermission){
				dataPermissions.add((RoleEntityPermission) permission);
			}
		}
		return dataPermissions;
	}
	
	public Set<RoleBundlePermission> getBundlePermissions() {
		bundlePermissions = new HashSet<RoleBundlePermission>();
		for(RoleResourcePermission permission : permissions){
			if (permission instanceof RoleBundlePermission){
				bundlePermissions.add((RoleBundlePermission) permission);
			}
		}
		return bundlePermissions;
	}
	
	public void setModulePermissions(Set<RoleModulePermission> modulePermissions) {
	}
	public void setDataPermissions(Set<RoleDataPermission> dataPermissions) {
	}
	public void setBundlePermissions(Set<RoleBundlePermission> bundlePermissions) {
	}
	public RoleResourcePermission addPermission(RoleResourcePermission permission){
		permission.setRole(this);
		this.getPermissions().add(permission);
		return permission;
	}
	
	public Set<String> getMenuIds(){
		Set<String> ids = new HashSet<String>();
//		for(RoleResourcePermission permission : this.getPermissions()){
//			Resource resource = permission.getResource();
//			if (resource instanceof MenuResource){
//				for(Resource menu : (Set<Resource>)resource.getAllParent()){
//					if (!ids.contains(menu.getId())){
//						ids.add(menu.getId());
//					}
//				}
//			}
//		}
		return ids;
	}
	
	public void fillResourcePermission(IResource propResource,MenuResource findResource){
//		Class clazz = propResource.getClass();
//		String beanid = propResource.getId();
//		String clazzName = clazz.getName();
//		//循环当前角色关联的所有资源包
//		for(RoleResourcePermission permission : this.getBundlePermissions()){
//			BundleResource<?,?,?> bundle = (BundleResource<?,?,?>)permission.getResource();
//			//获取资源包所包装的资源类型
//			Class clazzType = GenericsUtils.getSuperClassGenricType(bundle.getClass());
//			//检查资源类型是否为当前传入的实体类型
//			if (clazzType != null && clazzName.equals(clazzType.getName())){
//				//获取资源包绑定的资源集合
//				for(IResource res : bundle.getResources()){
//					if (res.getId().equals(beanid)){
////						findResource.mergePermission(permission.getPermission());
//						break;
//					}
//				}
//			}
//		}
	}
	
	public void fillResourcePermission(MenuResource findResource){
		Class<?> clazz = findResource.getClass();
		String beanid = findResource.getId();
		for(RoleResourcePermission permission : this.getPermissions()){
			Resource res = permission.getResource();
			if (clazz.isAssignableFrom(res.getClass())){
				if (res.getId().equals(beanid)){
//					findResource.mergePermission(permission.getPermission());
				}
			}
		}
	}
	
	public void fillResourceIds(Class<?> clazz,Set<String> ids) throws Exception{
//		if (MenuResource.class.isAssignableFrom(clazz)){
//			for(RoleResourcePermission permission : this.getPermissions()){
//				Resource resource = permission.getResource();
//				Class<?> cls = Class.forName(resource.getClazzname());
//				if (clazz.isAssignableFrom(cls)){
//					while(resource != null) {
//						if (!ids.contains(resource.getId())){
//							ids.add(resource.getId());
//						}
//						resource = resource.getParent();
//					}
//				}
//			}
//		}
//		else {
////			String clazzName = clazz.getName();
//			//循环当前角色关联的所有资源包
//			for(RoleResourcePermission permission : this.getBundlePermissions()){
//				BundleResource<?,?,?> bundle = (BundleResource<?,?,?>)permission.getResource();
//				//获取资源包所包装的资源类型
//				Class clazzType = GenericsUtils.getSuperClassGenricType(bundle.getClass());
//				//检查资源类型是否为当前转入的实体类型
//				if (clazzType != null && clazzType.isAssignableFrom(clazz)){
//					//获取资源包绑定的资源集合
//					for(IResource res : bundle.getResources()){
//						//检查当前资源ID是否添加
//						if (!ids.contains(res.getId())){
//							ids.add(res.getId());
//						}
//					}
//				}
//			}
//		}
	}
	
	public Set<RoleResourcePermission> getPermissions() {
		return permissions;
	}

	public void setPermissions(Set<RoleResourcePermission> permissions) {
		this.permissions = permissions;
	}

	public Set<RoleModuleActionPermission> getModuleActionPermissions() {
		return moduleActionPermissions;
	}

	public void setModuleActionPermissions(Set<RoleModuleActionPermission> moduleActionPermissions) {
		this.moduleActionPermissions = moduleActionPermissions;
	}
}
