package com.keer.core.service.impl;

import java.io.Serializable;
import java.util.List;

import org.hibernate.proxy.HibernateProxy;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.keer.core.bean.base.JSONBean;
import com.keer.core.dao.IDaoSupport;
import com.keer.core.dao.SQLBuilder;
import com.keer.core.service.IAuthorityBizService;

/**
 * 动作权限控制服务类
 * @author Administrator
 *
 * @param <T>
 */
@SuppressWarnings({"rawtypes","unchecked"})
public abstract class AuthorityBizServiceImpl<T extends JSONBean>  implements InitializingBean,IAuthorityBizService<T> {

	@Autowired
	protected IDaoSupport dao;

	public void setDao(IDaoSupport dao) {
		this.dao = dao;
	}

	public IDaoSupport getDao() {
		return dao;
	}
	
	public void afterPropertiesSet() throws Exception {
		
	}
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	public T getBean(T bean) throws Exception {
		if (bean != null){
			Class<T> clazz = (Class<T>) bean.getClass();
			if (bean instanceof HibernateProxy){
				this.dao.getHibernateTemplate().evict(bean);
			}
			bean = this.dao.find(clazz, bean.getId(), null);
			bean.setJson(null);
			return bean;
		}
		else {
			return null;
		}
	}
	/**
	 * 保存前置处理
	 * @param bean
	 * @param builder
	 * @throws Exception
	 */
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	public void savePreHandler(T bean, SQLBuilder builder) throws Exception{
		
	}
	/**
	 * 保存后置处理
	 * @param bean
	 * @param builder
	 * @throws Exception
	 */
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	public void savePostHandler(T bean, SQLBuilder builder) throws Exception {
		
	}
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	public void save(T bean, SQLBuilder builder) throws Exception {
		this.savePreHandler(bean, builder);
		dao.save(bean);
		JSONBean tmp = dao.find(bean.getClass(), bean.getId(), null);
		if (tmp == null){
			throw new Exception("用户没有该记录的新增权限");
		}
		this.savePostHandler(bean, builder);
	}
	
	/**
	 * 更新前置处理
	 * @param bean
	 * @param builder
	 * @throws Exception
	 */
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	public void updatePreHandler(T bean, SQLBuilder builder) throws Exception{
		
	}
	
	/**
	 * 更新后置处理
	 * @param bean
	 * @param builder
	 * @throws Exception
	 */
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	public void updatePostHandler(T bean, SQLBuilder builder) throws Exception {
		
	}
	
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	public void update(T bean, SQLBuilder builder) throws Exception {
		if (builder != null){
			T result = (T)dao.find(bean.getClass(), bean.getId(), null);
			if (result != null){
				builder.clearFilterWhere();
				builder.AddFilterWhere("id=:id");
				builder.AddParam("id", bean.getId());
				List<T> list = (List<T>) dao.findAll(bean.getClass(), builder, null);
				if (list == null || list.size() == 0){
					throw new Exception("用户没有该记录的更新权限");
				}
			}
		}
		//保存前先调用dao的merge方法将数据库中的属性和前台转入要修改的属性合并
		dao.merge(bean);
		
		this.updatePreHandler(bean, builder);
		dao.save(bean);
		this.updatePostHandler(bean, builder);
	}
	
	/**
	 * 删除前置处理
	 * @param bean
	 * @param builder
	 * @throws Exception
	 */
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	public void deletePreHandler(T bean, SQLBuilder builder) throws Exception{
		
	}
	
	/**
	 * 删除后置处理
	 * @param bean
	 * @param builder
	 * @throws Exception
	 */
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	public void deletePostHandler(T bean, SQLBuilder builder) throws Exception {
		
	}
	
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	public void delete(T bean, SQLBuilder builder) throws Exception {
		if (builder != null){
			T result = (T)dao.find(bean.getClass(), bean.getId(), null);
			if (result != null){
				builder.clearFilterWhere();
				builder.AddFilterWhere("id=:id");
				builder.AddParam("id", bean.getId());
				List<T> list = (List<T>) dao.findAll(bean.getClass(), builder, null);
				if (list == null || list.size() == 0){
					throw new Exception("用户没有该记录的删除权限");
				}
			}
		}
		this.deletePreHandler(bean, builder);
		dao.delete(bean);
		this.deletePostHandler(bean, builder);
	}
		
	public T find(Class<T> clazz, Serializable id, SQLBuilder builder, String json) throws Exception {
		if (builder != null){
			builder.clearFilterWhere();
			builder.AddFilterWhere("id=:id");
			builder.AddParam("id", id);
			List<T> list = (List<T>) dao.findAll(clazz, builder, null);
			if (list == null || list.size() == 0){
				throw new Exception("用户没有该记录的查看权限");
			}
		}
		return dao.find(clazz, id, json);
	}
	
	public T find(Class<T> clazz, SQLBuilder builder, String json) throws Exception {

		return dao.find(clazz, builder, json);
	}
	public List<T> findAll(Class<T> clazz, SQLBuilder builder, String json)  throws Exception{
		List<T> beanList = dao.findAll(clazz, builder,json);
		return beanList;
	}

	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	public void save(List<T> beanlist, SQLBuilder builder) throws Exception {
		for(T bean : beanlist){
			save(bean, builder);
		}
	}

	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	public void update(List<T> beanlist, SQLBuilder builder) throws Exception {
		for(T bean : beanlist){
			update(bean, builder);
		}
	}
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	public void delete(List<T> beanlist, SQLBuilder builder) throws Exception {
		for(T bean : beanlist){
			delete(bean, builder);
		}
	}	
}
