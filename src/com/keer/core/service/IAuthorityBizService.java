package com.keer.core.service;

import java.io.Serializable;
import java.util.List;

import com.keer.core.bean.base.JSONBean;
import com.keer.core.dao.SQLBuilder;

/**
 * 通用业务服务接口
 * @author 周方明
 *
 */
@SuppressWarnings("rawtypes")
public interface IAuthorityBizService<T extends JSONBean> {

	public T getBean(T bean) throws Exception;
	
	public void save(T bean, SQLBuilder builder) throws Exception;
	
	public void update(T bean, SQLBuilder builder) throws Exception;
	
	public void save(List<T> beanlist, SQLBuilder builder) throws Exception;
	
	public void update(List<T> beanlist, SQLBuilder builder) throws Exception;
	
	public void delete(T bean, SQLBuilder builder) throws Exception;
	
	public void delete(List<T> beanlist, SQLBuilder builder) throws Exception;
	
	public T find(Class<T> clazz, Serializable id, SQLBuilder builder, String json)  throws Exception;
	
	public T find(Class<T> clazz, SQLBuilder builder, String json)  throws Exception;
	
	public List<T> findAll(Class<T> clazz, SQLBuilder builder, String json)  throws Exception;
}
