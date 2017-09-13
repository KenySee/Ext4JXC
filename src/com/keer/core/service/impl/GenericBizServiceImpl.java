package com.keer.core.service.impl;

import java.beans.PropertyDescriptor;
import java.io.Serializable;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.keer.core.annotation.TopSubClass;
import com.keer.core.bean.base.JSONBean;
import com.keer.core.dao.SQLBuilder;
import com.keer.core.service.IAuthorityBizService;
import com.keer.core.service.IGenericBizService;
import com.keer.core.util.BeanUtils;
import com.keer.core.util.CacheLoaderUtil;
import com.keer.core.util.GenericsUtils;

/**
 * 通用业务服务实现类
 * @author 周方明
 *
 */
@SuppressWarnings({"unchecked","rawtypes"})
public abstract class GenericBizServiceImpl<T extends JSONBean> extends AuthorityBizServiceImpl<T> implements IGenericBizService<T> {

	protected Map<Class<?>, IAuthorityBizService> bizServiceMap = new HashMap<Class<?>, IAuthorityBizService>();
	
	protected IAuthorityBizService getBizService(Class<?> clazz) throws Exception{
		for(Class<?> bizClazz : bizServiceMap.keySet()){
			if (bizClazz.isAssignableFrom(clazz)){
				return bizServiceMap.get(bizClazz);
			}
		}
		throw new Exception(String.format("在[%s]中没为实体类[%s]注入相应的服务类", this.getClass().getName(),clazz.getName()));
	}
	
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	public void delete(T bean, SQLBuilder builder) throws Exception {
		super.delete(bean, builder);
		this.removeOneToOneEntity(bean);
	}

	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	public void update(T bean, SQLBuilder builder) throws Exception {
		this.handlerOneToOneEntity(bean);
		super.update(bean,builder);
		this.syncCollection(bean);
	}
	
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	public void save(T bean, SQLBuilder builder) throws Exception {
		this.handlerOneToOneEntity(bean);
		super.save(bean,builder);
		this.syncCollection(bean);
	}
	
	public void afterPropertiesSet() throws Exception {
		Map<String, Field> fields = CacheLoaderUtil.getFields(this.getClass(), true);
		bizServiceMap.clear();
		for(String key : fields.keySet()){
			Field field = GenericsUtils.getDeclaredField(this, key);
			if (field != null){
				Autowired autowired = field.getAnnotation(Autowired.class);
				if (autowired != null){
					Class<?> serviceClazz = field.getType();
					Class<JSONBean> beanClazz = null;
					TopSubClass topClass = serviceClazz.getAnnotation(TopSubClass.class);
					if (topClass != null){
						beanClazz = (Class<JSONBean>) topClass.value();
					}
					else {
						beanClazz = (Class<JSONBean>) GenericsUtils.getInterfaceGenericType(serviceClazz, 0);
					}
					if (JSONBean.class.isAssignableFrom(beanClazz)){
						IAuthorityBizService bizService = (IAuthorityBizService) BeanUtils.forceGetProperty(this,key);
						bizServiceMap.put(beanClazz, bizService);
					}
				}
			}
		}		
		super.afterPropertiesSet();
	}	
	/**
	 * 获取指定实体所有明细集合
	 * @param map
	 * @param bean
	 * @return
	 * @throws Exception
	 */
	private Map<Class<?>, Set<JSONBean>> getCollectionMap(Map<Class<?>, IAuthorityBizService> map,T bean) throws Exception {
		Map<Class<?>, Set<JSONBean>> collectionMap = new HashMap<Class<?>, Set<JSONBean>>();
		Class<T> beanClazz = (Class<T>) bean.getClass();
		Map<String, Field> fieldMap = CacheLoaderUtil.getAllSubclassFields(beanClazz, true);
		for(Class<?> clazz : map.keySet()){
			for (String key : fieldMap.keySet()) {
				Field field = fieldMap.get(key);
				Class<?> propClass = field.getType();
				if (Collection.class.isAssignableFrom(propClass)){
					Class<?> fieldType = GenericsUtils.getFieldGenericType(field);
					OneToMany many = field.getAnnotation(OneToMany.class);
					if (many != null && clazz.isAssignableFrom(fieldType)){
						String parentProp = many.mappedBy();
						PropertyDescriptor pd = CacheLoaderUtil.getPropertyDescriptor(beanClazz, key);
						Method read = pd.getReadMethod();
						Set<JSONBean> beans = (Set<JSONBean>) read.invoke(bean);
						if (beans != null){
							String flag = bean.getModifyFlag();
							for(JSONBean child : beans){
								child.addJSONValue(parentProp, "ADD".equals(flag) ? bean : bean.getJSONBean());
							}
							collectionMap.put(clazz, beans);
						}
					}
				}
			}
		}
		return collectionMap;
	}
	
	/**
	 * 同步更新实体Bean所有一对多集合
	 * @param bean
	 * @throws Exception
	 */
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	private void syncCollection(T bean)  throws Exception {
		
		Map<Class<?>, Set<JSONBean>> collectionMap = this.getCollectionMap(bizServiceMap, bean);

		for(Class<?> clazz : collectionMap.keySet()){
			Set<JSONBean> beans = collectionMap.get(clazz);
			IAuthorityBizService bizService = this.getBizService(clazz);
			if (bizService != null && beans != null){
				for(JSONBean value : beans){
					String flag = value.getModifyFlag();
					if ("ADD".equals(flag)){
						bizService.save(value, null);
					}
					if ("DEL".equals(flag)){
						bizService.delete(value, null);
					}
					if ("EDIT".equals(flag)){
						bizService.update(value, null);
					}
				}
			}
		}
	}
	/**
	 * 级联删除OneToOne实体
	 * @param bean
	 * @throws Exception
	 */
	public void removeOneToOneEntity(T bean) throws Exception {
		Class<T> beanClazz = (Class<T>) bean.getClass();
		Map<String, Field> fieldMap = CacheLoaderUtil.getAllSubclassFields(beanClazz, true);
		for (String key : fieldMap.keySet()) {
			Field field = fieldMap.get(key);
			OneToOne many = field.getAnnotation(OneToOne.class);
			if (many != null){
				PropertyDescriptor pd = CacheLoaderUtil.getPropertyDescriptor(beanClazz, key);
				Method read = pd.getReadMethod();
				Object object = read.invoke(bean);
				if (object != null){
					JSONBean result = (JSONBean)object;
					Serializable id = result.getId();
					if (id != null){
						IAuthorityBizService bizService = getBizService(result.getClass());
						bizService.delete(result, null);
					}
				}
			}
		}
	}
	/**
	 * 处理OneToOne实体,避免Hiberate自动创建
	 * @param bean
	 * @throws Exception
	 */
	public void handlerOneToOneEntity(T bean) throws Exception {
		Class<T> beanClazz = (Class<T>) bean.getClass();
		Map<String, Field> fieldMap = CacheLoaderUtil.getAllSubclassFields(beanClazz, true);
		for (String key : fieldMap.keySet()) {
			Field field = fieldMap.get(key);
			OneToOne many = field.getAnnotation(OneToOne.class);
			if (many != null){
				PropertyDescriptor pd = CacheLoaderUtil.getPropertyDescriptor(beanClazz, key);
				Method read = pd.getReadMethod();
				Object object = read.invoke(bean);
				if (object != null){
					JSONBean result = (JSONBean)object;
					IAuthorityBizService bizService = getBizService(result.getClass());
					Serializable id = result.getId();
					if (id == null){
						bizService.save(result, null);
					}
					else {
						bizService.update(result, null);
					}					
				}
			}
		}
	}
}
