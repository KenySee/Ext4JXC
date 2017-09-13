package com.keer.core.dao.impl;

import java.lang.reflect.Field;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.hibernate.Hibernate;
import org.hibernate.SQLQuery;

import com.keer.core.util.CacheLoaderUtil;

/**
 * 
 * @author 周方明
 *
 */
public class AddScalar {
	/**
	 * 将field type 和 Hibernate的类型进行了对应。这里其实不是多余的，如果不进行一定的对应可能会有问题。
	 * 问题有两个：
	 * 	1. 在oracle中我们可能把一些字段设为NUMBER(%)，而在Bean中的字段定的是long。那么查询时可能会报：
	 * 	   java.math.BeigDecimal不能转换成long等错误
	 *  2. 如果不这样写的话，可能Bean中的field就得是大写的，如：name就得写成NAME,userCount就得写成USERCOUNT
	 *     这样是不是很扯(V_V)
	 * 
	 * @param <T>
	 * @param sqlQuery
	 *            SQLQuery
	 * @param clazz
	 *            T.class
	 * @param fieldList
	 *            要查询的成员变量名称
	 */
	public static <T> void addSclar(SQLQuery sqlQuery, Class<T> clazz, List<String> fieldList) {
		if (clazz == null) {
			throw new NullPointerException("[clazz] could not be null!");
		}

		if ((fieldList != null) && (fieldList.size() > 0)) {

			Map<String, Field> fieldMap =  CacheLoaderUtil.getAllSubclassFields(clazz, true);
			
			for (String fieldName : fieldList) {
				for (String name :  fieldMap.keySet()) {
					Field field = fieldMap.get(name);
					if (fieldName.equals(field.getName())) {
						if ((field.getType() == long.class) || (field.getType() == Long.class)) {
							sqlQuery.addScalar(field.getName(), Hibernate.LONG);
						} else if ((field.getType() == int.class) || (field.getType() == Integer.class)) {
							sqlQuery.addScalar(field.getName(), Hibernate.INTEGER);
						} else if ((field.getType() == char.class) || (field.getType() == Character.class)) {
							sqlQuery.addScalar(field.getName(), Hibernate.CHARACTER);
						} else if ((field.getType() == short.class) || (field.getType() == Short.class)) {
							sqlQuery.addScalar(field.getName(), Hibernate.SHORT);
						} else if ((field.getType() == double.class) || (field.getType() == Double.class)) {
							sqlQuery.addScalar(field.getName(), Hibernate.DOUBLE);
						} else if ((field.getType() == float.class) || (field.getType() == Float.class)) {
							sqlQuery.addScalar(field.getName(), Hibernate.FLOAT);
						} else if ((field.getType() == boolean.class) || (field.getType() == Boolean.class)) {
							sqlQuery.addScalar(field.getName(), Hibernate.BOOLEAN);
						} else if (field.getType() == String.class) {
							sqlQuery.addScalar(field.getName(), Hibernate.STRING);
						} else if (field.getType() == Date.class) {
							sqlQuery.addScalar(field.getName(), Hibernate.TIMESTAMP);
						}
					}
				}
			}
		}
	}
}
