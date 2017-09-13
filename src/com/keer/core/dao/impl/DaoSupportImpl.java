package com.keer.core.dao.impl;

import java.io.Serializable;
import java.lang.reflect.Field;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.transform.BasicTransformerAdapter;
import org.hibernate.transform.Transformers;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.keer.core.annotation.LogicDelete;
import com.keer.core.bean.base.JSONBean;
import com.keer.core.dao.IDaoSupport;
import com.keer.core.dao.SQLBuilder;
import com.keer.core.util.CacheLoaderUtil;

@Transactional
@Repository("dao")
public class DaoSupportImpl extends HibernateDaoSupport implements IDaoSupport {

	@Resource(name = "defaultSessionFactory")
	public void setSuperSessionFactory(SessionFactory sessionFactory) {
		super.setSessionFactory(sessionFactory);
	}
	public Object findObjectByHql(final String hql) throws Exception {
		HibernateTemplate template = getHibernateTemplate();
		Object result = (Object) template.execute(new HibernateCallback<Object>() {
			public Object doInHibernate(Session session) throws HibernateException, SQLException {
				Query query = session.createQuery(hql);
				@SuppressWarnings("rawtypes")
				Iterator queryResult = query.iterate();
				if (queryResult.hasNext()) {
					return queryResult.next();
				}
				return null;
			}
		});
		return result;
	}

	public Object findObjectBySql(final String sql) throws Exception {
		HibernateTemplate template = getHibernateTemplate();
		Object result = (Object) template.execute(new HibernateCallback<Object>() {
			public Object doInHibernate(Session session) throws HibernateException, SQLException {
				SQLQuery query = session.createSQLQuery(sql);
				return query.uniqueResult();
			}
		});
		return result;
	}
	public List<?> findListByHql(final String hql, final Integer start,
			final Integer limit) throws Exception {
		HibernateTemplate template = getHibernateTemplate();
		List<?> result = template.executeFind(new HibernateCallback<Object>() {

			public Object doInHibernate(Session session)
					throws HibernateException, SQLException {
				Query query = session.createQuery(hql);
				if (start != null && start.intValue() >= 0 && limit != null
						&& limit.intValue() > 0) {
					query.setFirstResult(start);
					query.setMaxResults(limit);
				}
				return query.list();
			}
		});
		return result;
	}	
	@SuppressWarnings("unchecked")
	
	public <C extends JSONBean<?>> void delete(C bean) throws Exception {
		if (bean != null) {
			Boolean isUpdate = false;
			if (bean.getClass().getAnnotation(LogicDelete.class) != null){
				isUpdate = true;
			}
			HibernateTemplate template = getHibernateTemplate();
			bean = (C) template.get(bean.getClass(), bean.getId());
			if (isUpdate){
				bean.setValid(false);
				template.update(bean);
			}
			else {
				if (bean != null)	template.delete(bean);
			}
		} else {
			throw new Exception("实体不能为空");
		}
	}

	
	public <C extends JSONBean<?>> void delete(Collection<C> beanList)	throws Exception {
		for(C bean : beanList){
			delete(bean);
		}
	}

	@SuppressWarnings("unchecked")
	public <C extends JSONBean<?>> void merge(C bean) throws Exception {
		if (bean != null) {
			C result = (C) find(bean.getClass(), bean.getId(), null);
			result.fromJson(bean.getJson());
			result.setJson(null);
			result.initialize((JSONObject)null);
			bean.fromJson(result.getJson());
			getHibernateTemplate().evict(result);
		}
		else {
			throw new Exception("实体不能为空");
		}
	}
	
	@SuppressWarnings("unchecked")
	public <C extends JSONBean<?>> void save(C bean) throws Exception {
		if (bean != null) {
			C result = (C) find(bean.getClass(), bean.getId(), null);
			HibernateTemplate template = getHibernateTemplate();
			bean.setValid(Boolean.TRUE);
			if (result != null) {
				template.evict(result);
				template.saveOrUpdate(bean);
			} 
			else {
				bean.GeneratorKey();
				bean.setCreateDate(new Date());
				template.save(bean);
			}
		} 
		else {
			throw new Exception("实体不能为空");
		}
	}

	
	public <C extends JSONBean<?>> void save(Collection<C> beanList) throws Exception {
		for(C bean : beanList){
			save(bean);
		}
	}
	
	
	public Integer executeHqlUpdate(final String hqlString) throws Exception {
		HibernateTemplate template = getHibernateTemplate();
		Integer result = (Integer) template.execute(new HibernateCallback<Object>() {
			
			public Object doInHibernate(Session session) throws HibernateException, SQLException {
				Query query = session.createQuery(hqlString);
				return query.executeUpdate();
			}
		});
		return result;
	}

	
	
	public Integer executeUpdate(final String sqlString) throws Exception {
		HibernateTemplate template = getHibernateTemplate();
		Integer result = (Integer) template.execute(new HibernateCallback<Object>() {
			
			public Object doInHibernate(Session session) throws HibernateException, SQLException {
				SQLQuery query = session.createSQLQuery(sqlString);
				return query.executeUpdate();
			}
		});
		return result;
	}

	
	public <T extends JSONBean<?>> List<T> find(String hql,	SQLBuilder sqlBuilder) throws Exception {
		return null;
	}
	
	public <C extends JSONBean<?>> C find(Class<C> clazz, Serializable id, String json) throws Exception{
		HibernateTemplate template = getHibernateTemplate();
		if (id != null){
			C result = (C)template.get(clazz, id);
			if (result != null){
				if (json == null){
					JSONObject obj = CacheLoaderUtil.loadJsonObject(clazz, 1, 1);
					json = obj.toString();
				}
				result.initialize(json);
			}
			return result;
		}
		else {
			return null;
		}
	}
	
	public <C extends JSONBean<?>> C find(Class<C> clazz, SQLBuilder sqlBuilder, String json) throws Exception{
		List<C> list = (List<C>) this.findAll(clazz, sqlBuilder, json);
		if (list != null && list.size() > 0){
			return list.get(0);
		}
		else {
			return null;
		}
	}
	
	@SuppressWarnings({ "unchecked" })
	public <C extends JSONBean<?>> List<C> findAll(Class<C> clazz, SQLBuilder sqlBuilder, String json)  throws Exception{
		if (sqlBuilder == null){
			sqlBuilder = new SQLBuilder();
		}
		sqlBuilder.AddFrom(clazz.getName());
		sqlBuilder.AddFilterWhere("valid=1");
		final String hql = sqlBuilder.sql();
//		System.out.println(hql);
		final Object map = sqlBuilder.map();
		final Integer start = sqlBuilder.start();
		final Integer limit = sqlBuilder.limit();
		HibernateTemplate template = getHibernateTemplate();
		List<C> result = template.executeFind(new HibernateCallback<Object>() {
			
			public Object doInHibernate(Session session) throws HibernateException, SQLException {
				Query query = session.createQuery(hql);
				preQueryParams(query, map);
				if (start != null && start.intValue() >= 0) {
					query.setFirstResult(start);
				}
				if (limit != null && limit.intValue() > 0) {
					query.setMaxResults(limit);
				}
				return query.list();
			}
		});
		if (json == null){
			Integer clazzLevel = sqlBuilder.clazzLevel();
			Integer propLevel = sqlBuilder.propLevel();
			JSONObject obj = CacheLoaderUtil.loadJsonObject(clazz, clazzLevel, propLevel);
			json = obj.toString();
		}
		for(C bean : result){
			bean.initialize(json);
		}
		return result;
	}

	
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> findListBySql(String sql,	SQLBuilder sqlBuilder)  throws Exception{
		final Object map = sqlBuilder.map();
		final Integer start = sqlBuilder.start();
		final Integer limit = sqlBuilder.limit();
		return (List<Map<String, Object>>) findListBySql(sql, null, null, map, start, limit);
	}

	@SuppressWarnings("unchecked")
	public <T> List<T> findListBySql(final String sql, final Class<T> beanClass, SQLBuilder sqlBuilder)  throws Exception{
		final List<String> fieldList = new ArrayList<String>();
		if (beanClass != null){
			Map<String, Field> fieldMap =  CacheLoaderUtil.getAllSubclassFields(beanClass, true);
			for (String name :  fieldMap.keySet()) {
				Field field = fieldMap.get(name);
				fieldList.add(field.getName());
			}
		}
		if (sqlBuilder != null){
			final Object map = sqlBuilder.map();
			final Integer start = sqlBuilder.start();
			final Integer limit = sqlBuilder.limit();
			return (List<T>) findListBySql(sql, beanClass, fieldList, map, start, limit);
		}
		else {
			return (List<T>) findListBySql(sql, beanClass, fieldList, null, null, null);
		}
		
	}

	@SuppressWarnings("unchecked")
	public Integer findRecordCount(Class<?> clazz, SQLBuilder sqlBuilder)  throws Exception{
		sqlBuilder.AddFrom(clazz.getName());
		sqlBuilder.AddFilterWhere("valid=true");
		final String hql = String.format("select count(*) %s", sqlBuilder.sqlCount());
//		System.err.println(hql);
		final Object map = sqlBuilder.map();
		HibernateTemplate template = getHibernateTemplate();
		Integer result = (Integer) template.execute(new HibernateCallback<Object>() {
			public Object doInHibernate(Session session)
					throws HibernateException, SQLException {
				Query query = session.createQuery(hql);
				preQueryParams(query, map);
				Iterator<Long> queryResult = (Iterator<Long>) query.iterate();
				if (queryResult.hasNext()) {
					return queryResult.next().intValue();
				}
				return 0;
			}
		});
		return result;
	}

	
	public Integer findRecordCount(final String sqlString)  throws Exception{
		HibernateTemplate template = getHibernateTemplate();
		Number result = (Number) template.execute(new HibernateCallback<Object>() {
			
			public Object doInHibernate(Session session)
					throws HibernateException, SQLException {
				SQLQuery query = session.createSQLQuery(sqlString);
				return query.uniqueResult();
			}
		});
		return result.intValue();
	}
	
	private List<?> findListBySql(final String sql, final Class<?> beanClass, final List<String> fieldList, final Object params, final Integer start, final Integer limit) {
		List<?> list = getHibernateTemplate().executeFind(
			new HibernateCallback<Object>() 
			{
				public Object doInHibernate(Session session) throws HibernateException, SQLException 
				{
					SQLQuery query = session.createSQLQuery(sql);
					if (beanClass != null && fieldList != null && fieldList.size() > 0) {
						AddScalar.addSclar(query, beanClass, fieldList);
						query.setResultTransformer(Transformers.aliasToBean(beanClass));
					} 
					else {
						query.setResultTransformer(ImprovedMapResultTransformer.INSTANCE);
					}
					preQueryParams(query, params);
					if (start != null && start.intValue() >= 0) {
						query.setFirstResult(start);
					}
					if (limit != null && limit.intValue() > 0) {
						query.setMaxResults(limit);
					}
					return query.list();
				}
			}
		);
		return list;
	}
	@SuppressWarnings({ "unchecked", "unused" })
	private void preQueryParams(Query query, Object params) {
		if (params != null){
			if (params instanceof Map<?,?>){
				Map<String, Object> paramsMap = (Map<String, Object>)params;
				if (paramsMap != null && !paramsMap.isEmpty()) {
					for (Map.Entry<String, Object> entry : paramsMap.entrySet()) {
						if (entry.getValue() instanceof Collection<?>) {
							query.setParameterList(entry.getKey(),(Collection<?>) entry.getValue());
						} else if (entry.getValue() instanceof JSONBean<?>) {
							query.setEntity(entry.getKey(), entry.getValue());
						} else if (entry.getValue() instanceof String) {
							query.setString(entry.getKey(), (String) entry.getValue());
						} else {
							query.setParameter(entry.getKey(), entry.getValue());
						}
					}
				}			
			}
		}
		else {
			Object[] paramsArray = (Object[])params;
			if (paramsArray != null && paramsArray.length > 0){
				for (int i = 0; i < paramsArray.length; i++) {
					query.setParameter(i, paramsArray[i]);
				}		
			}
		}
	}
	
	@SuppressWarnings({ "serial" })
	private static final class ImprovedMapResultTransformer extends
			BasicTransformerAdapter {
		static final ImprovedMapResultTransformer INSTANCE = new ImprovedMapResultTransformer();
		private ImprovedMapResultTransformer() {

		}
		
		public Object transformTuple(Object tuple[], String aliases[]) {
			HashMap<String, Object> result = new HashMap<String, Object>(tuple.length);
			for (int i = 0; i < tuple.length; i++) {
				String alias = columnToProperty(aliases[i]);
				if (alias != null)
					result.put(alias, tuple[i]);
			}
			return result;
		}
		private String columnToProperty(final String column) {
			StringBuffer buf = new StringBuffer(column.toLowerCase());
			for (int i = buf.length() - 1; i > 0; i--) {
				if (buf.charAt(i - 1) == '_') {
					buf.insert(i, Character.toTitleCase(buf.charAt(i)));
					buf.deleteCharAt(i + 1);
					buf.deleteCharAt(i - 1);
				}
			}
			return buf.toString();
		}
	}
}
