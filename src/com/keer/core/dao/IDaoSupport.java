package com.keer.core.dao;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;
import java.util.Map;

import org.springframework.orm.hibernate3.HibernateTemplate;

import com.keer.core.bean.base.JSONBean;

public interface IDaoSupport {

	public HibernateTemplate getHibernateTemplate();
	
	public <C extends JSONBean<?>> void merge(C bean) throws Exception;
	
	public Object findObjectByHql(final String hql) throws Exception;
	
	public Object findObjectBySql(final String sql) throws Exception;
	
	public <T extends JSONBean<?>> List<T> find(String hql, SQLBuilder sqlBuilder)  throws Exception;
	/**
	 * 将本地SQL查询结果封装成Map返回
	 * @param sql
	 * @return
	 * @throws Exception
	 */
	public List<Map<String,Object>> findListBySql(String sql, SQLBuilder sqlBuilder)  throws Exception;
	
	public List<?> findListByHql(String hql, Integer start, Integer limit) throws Exception;
	
	/**
	 * 将本地SQL查询结果封装成对象返回
	 * @param params 命名参数
	 * @param start 第一条记录序号 >-1
	 * @param limit 每页要显示的记录数 >0
	 */
	public <T> List<T> findListBySql(String sql, Class<T> beanClass, SQLBuilder sqlBuilder)  throws Exception;
	
	/**
	 * 执行本地SQL更新查询
	 * @param sqlString
	 * @return
	 * @throws Exception
	 */
	public Integer executeUpdate(String sqlString) throws Exception;
	
	/**
	 * 执行HQL更新查询
	 * @param hqlString
	 * @return
	 * @throws Exception
	 */
	public Integer executeHqlUpdate(String hqlString) throws Exception;
	
	/**
	 * HQL查询统计行数
	 * @param clazz
	 * @return
	 */
	public Integer findRecordCount(Class<?> clazz, SQLBuilder sqlBuilder)  throws Exception;
	
	/**
	 * 本地查询统计行数
	 * @param sqlString
	 * @return
	 */
	public Integer findRecordCount(String sqlString) throws Exception;
	
	public <C extends JSONBean<?>> List<C> findAll(Class<C> clazz, SQLBuilder sqlBuilder, String json) throws Exception;
	
	public <C extends JSONBean<?>> C find(Class<C> clazz, Serializable id, String json) throws Exception;
	
	public <C extends JSONBean<?>> C find(Class<C> clazz, SQLBuilder sqlBuilder, String json) throws Exception;
	
	public <C extends JSONBean<?>> void save(C bean) throws Exception;
	
	public <C extends JSONBean<?>> void save(Collection<C> beanList) throws Exception;
	
	public <C extends JSONBean<?>> void delete(C bean) throws Exception;
	
	public <C extends JSONBean<?>> void delete(Collection<C> beanList) throws Exception;
}
