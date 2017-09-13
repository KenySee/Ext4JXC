package com.keer.core.util;

import java.beans.IntrospectionException;
import java.beans.PropertyDescriptor;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import javax.persistence.Embedded;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import ognl.OgnlException;
import ognl.OgnlRuntime;

import com.keer.core.annotation.JsonTransient;
import com.keer.core.bean.base.JSONBean;

import net.sf.json.JSONObject;

public class CacheLoaderUtil {

	private static ClassCache fieldCache = new ClassCache();
	private static ClassCache subClassCache = new ClassCache();
	private static Map<String, String> mapingMap = new HashMap<String, String>();
	private static Map<String, JSONObject> jsonMap = new HashMap<String, JSONObject>();
	private final static Map<Class<?>, DefineClass> classMap = new HashMap<Class<?>, DefineClass>();
	

	public static void setMapping(String fieldname, String mapping) {
		mapingMap.put(fieldname, mapping);
	}

	public static String getMapping(String fieldname) {
		return mapingMap.get(fieldname);
	}
	
	public static void setDefineClass(Class<?> clazz, DefineClass define) {
		classMap.put(clazz, define);
	}

	public static DefineClass getDefineClass(Class<?> clazz) {
		return classMap.get(clazz);
	}
	
	public static JSONObject loadJsonObject(Class<?> clazz, Integer clazzLevel, Integer propLevel) throws Exception{
		String idString = String.format("%s-[%d%d]", clazz.getName(),clazzLevel,propLevel);
		JSONObject result;
		synchronized (jsonMap) {
			if ((result = (JSONObject)jsonMap.get(idString)) == null){
				result = getJSONObject(clazz, clazzLevel, propLevel);
				jsonMap.put(idString, result);
			}	
		}
		return result;
	}
	public static PropertyDescriptor getPropertyDescriptor(Class<?> clazz, String field) throws IntrospectionException, OgnlException{
		PropertyDescriptor pd = OgnlRuntime.getPropertyDescriptor(clazz, field);
		if (pd == null){
			DefineClass parent = CacheLoaderUtil.getDefineClass(clazz);
			if (parent != null){
				Set<DefineClass> childs = parent.getChilds();
				for(DefineClass child : childs){
					pd = getPropertyDescriptor(child.getClazz(),field);
					if (pd != null){
						break;
					}
				}
			}
		}
		return pd;
	}
	@SuppressWarnings({ "unchecked", "rawtypes" })
	private static JSONObject getJSONObject(Class<?> clazz,Integer clazzLevel, Integer propLevel) throws Exception {
		JSONObject result = new JSONObject();
		Map<String, Field> fieldMap = CacheLoaderUtil.getAllSubclassFields(clazz, true);
		for(String key : fieldMap.keySet()){
			Field field = fieldMap.get(key);
			JsonTransient tranAnnotation = field.getAnnotation(JsonTransient.class);
			if (tranAnnotation == null){
				Object manyAnnotation = field.getAnnotation(OneToMany.class);
				if(manyAnnotation == null){
					manyAnnotation = field.getAnnotation(ManyToMany.class);
				}
				ManyToOne oneAnnotation = field.getAnnotation(ManyToOne.class);
				OneToOne singleAnnotation = field.getAnnotation(OneToOne.class);
				Embedded embeddedAnnotation = field.getAnnotation(Embedded.class);
				if (manyAnnotation != null){
					if (clazzLevel > 0){
						PropertyDescriptor pd = CacheLoaderUtil.getPropertyDescriptor(clazz, key);
						if (pd != null){
							Method method = pd.getReadMethod();
							if (method != null){
								Class<JSONBean> clazz1 = (Class<JSONBean>)GenericsUtils.getMethodGenericReturnType(method);
								JSONObject obj = getJSONObject(clazz1,clazzLevel-1,propLevel);
								result.accumulate(key, obj);
							}
						}
					}
				}
				else if (oneAnnotation != null || singleAnnotation != null || embeddedAnnotation != null){
					if (propLevel <= 0 && embeddedAnnotation == null)	{
						result.accumulate(key,JSONObject.fromObject("{id:null,version:null,clazzname:null,name:null}"));
					}
					else {
						Class<JSONBean> clazz1 = (Class<JSONBean>)field.getType();
						JSONObject obj = getJSONObject(clazz1,0,propLevel-1);
						result.accumulate(key, obj);
					}
				}
				else {
					result.accumulate(key,null);
				}
			}
		}
		return result;
	}
	
	@SuppressWarnings({ "unchecked" })
	public static final Map<String, Field> getAllSubclassFields(Class<?> inClass, Boolean isReadOnly) {
		Map<String, Field> result = null;
		synchronized (subClassCache) {
			Object object = subClassCache.get(inClass);
			if (object == null) {
				result = new HashMap<String, Field>(24);
				for (Class<?> sc = inClass; (sc != null); sc = sc.getSuperclass())
				{
					Field[] fa = sc.getDeclaredFields();
					for (int i = 0; i < fa.length; i++) {
						int modifier = fa[i].getModifiers();
						if (!Modifier.isFinal(modifier) &&	!Modifier.isStatic(modifier)){
							if (!fa[i].isAnnotationPresent(JsonTransient.class)){
								result.put(fa[i].getName(), fa[i]);
							}
						}
					}
					String className = sc.getSimpleName();
					if (className.equals("JSONBean")){
						break;
					}
				}				
				DefineClass parent = CacheLoaderUtil.getDefineClass(inClass);
				Set<DefineClass> allSubclass = parent.getAllDefine();
				for(DefineClass sc : allSubclass){
					Field[] fa = sc.getClazz().getDeclaredFields();
					for (int i = 0; i < fa.length; i++) {
						int modifier = fa[i].getModifiers();
						if (!Modifier.isFinal(modifier) &&	!Modifier.isStatic(modifier)){
							if (!fa[i].isAnnotationPresent(JsonTransient.class)){
								result.put(fa[i].getName(), fa[i]);
							}
						}
					}
				}
				subClassCache.put(inClass, result);
			}
			else {
				result = (HashMap<String, Field>)object;
			}
		}
		Map<String, Field> map = result;
		if (!isReadOnly){
			map= new HashMap<String, Field>(result.size() + 1);
			map.putAll(result);
		}
		return map;
	}
	@SuppressWarnings({ "unchecked" })
	public static final Map<String, Field> getFields(Class<?> inClass, Boolean isReadOnly) {
		Map<String, Field> result = null;
		synchronized (fieldCache) {
			Object object = fieldCache.get(inClass);
			if (object == null) {
				result = new HashMap<String, Field>(24);
				for (Class<?> sc = inClass; (sc != null); sc = sc.getSuperclass())
				{
					Field[] fa = sc.getDeclaredFields();
					for (int i = 0; i < fa.length; i++) {
						int modifier = fa[i].getModifiers();
						if (!Modifier.isFinal(modifier) &&	!Modifier.isStatic(modifier)){
							if (!fa[i].isAnnotationPresent(JsonTransient.class)){
								result.put(fa[i].getName(), fa[i]);
							}
						}
					}
					String className = sc.getSimpleName();
					if (className.equals("JSONBean")){
						break;
					}
				}				
				fieldCache.put(inClass, result);
			}
			else {
				result = (HashMap<String, Field>)object;
			}
		}
		Map<String, Field> map = result;
		if (!isReadOnly){
			map= new HashMap<String, Field>(result.size() + 1);
			map.putAll(result);
		}
		return map;
	}
	
	private static class ClassCache extends Object {

		private static final int TABLE_SIZE = 512;

		private static final int TABLE_SIZE_MASK = TABLE_SIZE - 1;

		private Entry[] table;

		private static class Entry extends Object {
			protected Entry next;
			protected Class<?> key;
			protected Object value;

			public Entry(Class<?> key, Object value) {
				super();
				this.key = key;
				this.value = value;
			}
		}

		public ClassCache() {
			super();
			this.table = new Entry[TABLE_SIZE];
		}

		public final Object get(Class<?> key) {
			Object result = null;
			int i = key.hashCode() & TABLE_SIZE_MASK;

			for (Entry entry = table[i]; entry != null; entry = entry.next) {
				if (entry.key == key) {
					result = entry.value;
					break;
				}
			}
			return result;
		}

		public final Object put(Class<?> key, Object value) {
			Object result = null;
			int i = key.hashCode() & TABLE_SIZE_MASK;
			Entry entry = table[i];

			if (entry == null) {
				table[i] = new Entry(key, value);
			} else {
				if (entry.key == key) {
					result = entry.value;
					entry.value = value;
				} else {
					while (true) {
						if (entry.key == key) {
							/* replace value */
							result = entry.value;
							entry.value = value;
							break;
						} else {
							if (entry.next == null) {
								/* add value */
								entry.next = new Entry(key, value);
								break;
							}
						}
						entry = entry.next;
					}
				}
			}
			return result;
		}
	}	
}
