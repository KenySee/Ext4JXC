package com.keer.core.bean.base;

import java.beans.IntrospectionException;
import java.beans.PropertyDescriptor;
import java.io.Serializable;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.persistence.MappedSuperclass;
import javax.persistence.OneToOne;
import javax.persistence.Transient;

import org.apache.commons.lang.StringUtils;
import org.hibernate.proxy.HibernateProxy;

import net.sf.json.JSONArray;
import net.sf.json.JSONNull;
import net.sf.json.JSONObject;
import ognl.OgnlException;

import com.keer.core.bean.ICoreBean;
import com.keer.core.annotation.Description;
import com.keer.core.annotation.JsonTransient;
import com.keer.core.bean.comm.SystemVar;
import com.keer.core.bean.enums.IEnums;
import com.keer.core.util.CacheLoaderUtil;
import com.keer.core.util.GenericsUtils;

@MappedSuperclass
@SuppressWarnings({"serial","rawtypes","unchecked"})
public abstract class JSONBean<T extends Serializable> extends AbstractBean implements ICoreBean<T> {
	
	@Transient
	@Description(Name="实体类名")
	private String clazzname;

	@Transient
	@JsonTransient
	private JSONObject json;

	/**
	 * 记录上次按需解析JSON字符长度
	 */
	@Transient
	@JsonTransient
	private Integer jsonLenght = 0;
	
	private Boolean valid;
	
	@Description(Name="权限集合")
	@Transient
	private Map<String, Boolean> privilegeMap;
	
	@Description(Name="修改标志")
	@Transient//ADD: 新增, DEL 删除,  EDIT 修改
	private String modifyFlag;
	
	@Transient
	@Description(Name="图标")
	private String indexCls;
	
	@Transient
	@JsonTransient
	private Set<String> dirtyFields = new HashSet<String>();
	
	public JSONBean getJSONBean() throws Exception{
		Class<JSONBean> clazz = (Class<JSONBean>)this.getClass();
		if (clazz != null){
			JSONBean<Serializable> result = clazz.newInstance();
			JSONObject json = new JSONObject();
			json.put("id", this.getId());
			json.put("version",this.getVersion());
			json.put("clazzname", this.getClazzname());
			result.setId(this.getId());
			result.setVersion(this.getVersion());
			result.setJson(json);
			return result;
		}
		else {
			return null;
		}
	}
	public  String convertToString(String field,Object value){
		return value != null ? value.toString() : null;
	}
	
	public Object convertToObject(String field,Object json){
		return json;
	}
	
	public void addJSONValue(String field,Object value) throws Exception{
		PropertyDescriptor pd = CacheLoaderUtil.getPropertyDescriptor(this.getClass(), field);
		if (this.json != null){
			Class<?> clazz = value != null ? value.getClass() : Object.class;
			if (JSONBean.class.isAssignableFrom(clazz)){
				JSONBean bean = (JSONBean)value;
				json.put(field, bean.Bean2Json());
			}
			else if (value instanceof Collection){
				Collection<JSONBean> beanlist = (Collection<JSONBean>)value;
				List<Object> jsonlist = new ArrayList<Object>(beanlist.size());
				Class genericsClass=GenericsUtils.getMethodGenericReturnType(pd.getReadMethod());
				if (genericsClass!=null){
					if (JSONBean.class.isAssignableFrom(genericsClass)){
						JSONObject jsonObject = CacheLoaderUtil.loadJsonObject(genericsClass, 0, 1);
						for (JSONBean jsonBean : beanlist) {
							jsonlist.add(jsonBean.initialize(jsonObject).toString());
						}
					}
					else {
						if (IEnums.class.isAssignableFrom(genericsClass)){
							for (Object bean : beanlist) {
								IEnums nums = (IEnums)bean;
								Map<String, Object> map = new HashMap<String, Object>();
								map.put("id", nums.value());
								map.put("text", nums.text());
								map.put("type", nums.type());
								jsonlist.add(map);
							}
						}
						else {
							for (JSONBean jsonBean : beanlist) {
								jsonlist.add(jsonBean.toString());
							}
						}
					}
					JSONArray jsonArr = JSONArray.fromObject(jsonlist);
					json.put(field, jsonArr.toString());
				}
			}
			else {
				if (value instanceof java.util.Date){
					SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
					String str = sdf.format(value);
					json.put(field, str);
				}
				else if(value instanceof java.sql.Date){
					SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
					String str = sdf.format(value);
					json.put(field, str);					
				}
				else {
					String str = this.convertToString(field, value);
					json.put(field,str);
				}
			}
		}
		Method method = pd.getWriteMethod();
		method.invoke(this, value);
	}
	/**
	 * 检查指定属性是否更改
	 * @param field
	 * @return
	 */
	public Boolean isDirty(String field){
		if (this.getId() == null){
			PropertyDescriptor pd = null;
			try {
				pd = CacheLoaderUtil.getPropertyDescriptor(this.getClass(), field);
			} catch (IntrospectionException e) {
				e.printStackTrace();
			} catch (OgnlException e) {
				e.printStackTrace();
			}
			if (pd != null){
				Method method = pd.getReadMethod();
				Object obj = null;
				try {
					obj = method.invoke(this);
				} catch (IllegalArgumentException e) {
					e.printStackTrace();
				} catch (IllegalAccessException e) {
					e.printStackTrace();
				} catch (InvocationTargetException e) {
					e.printStackTrace();
				}
				if (obj != null){
					return true;
				}
			}
		}
		return dirtyFields.contains(field);
	}
	public void addDirty(String field){
		if (!dirtyFields.contains(field)){
			dirtyFields.add(field);
		}
	}
	
	public void clearDirty(){
		dirtyFields.clear();
	}
	
	
	@Override
	public boolean equals(Object obj) {
		JSONBean bean = (JSONBean)obj;
		if (this.getId() != null && bean.getId() != null){
			return this.getId().equals(bean.getId());
		}
		else {
			return false;
		}
	}
	
	public JSONObject initialize(Integer clazzLevel, Integer propLevel) throws Exception{
		Class<JSONBean> clazz = (Class<JSONBean>) this.getClass();
		JSONObject temp = CacheLoaderUtil.loadJsonObject(clazz, clazzLevel, propLevel);
		return initialize(temp);
	}
	
	public JSONObject initialize(String jsonStr) throws Exception{
		JSONObject temp = null;
		if (jsonStr != null){
			temp = JSONObject.fromObject(jsonStr);
		}
		return initialize(temp);
	}
	
	public JSONObject initialize(JSONObject temp) throws Exception{
		if (temp == null){
			Class<JSONBean> clazz = (Class<JSONBean>) this.getClass();
			temp = CacheLoaderUtil.loadJsonObject(clazz, 0, 1);
		}
		Integer len = temp.toString().length();
		//如果这次解析JSON内容比上次多,就允许解析,否则直接返回
		//解决Hibernate一级缓存中相同对象只有一个引用但同时又被多次解析的情形
		if (len > jsonLenght){
			jsonLenght = len;
		}
		else {
			if (this.json != null){
				return this.json;
			}
		}
		JSONObject result = new JSONObject();
		Class beanclazz = this.getClass();
		for(Object tmp : temp.keySet()){
			String key = tmp.toString();
			PropertyDescriptor pd = null;
			try {
				pd = CacheLoaderUtil.getPropertyDescriptor(beanclazz, key);
			} catch (IntrospectionException e) {
				e.printStackTrace();
			} catch (OgnlException e) {
				e.printStackTrace();
			}
			if (pd != null){
				Method method = pd.getReadMethod();
				Object obj = null;
				try {
					obj = method.invoke(this);
				} catch (IllegalArgumentException e) {
					e.printStackTrace();
				} catch (IllegalAccessException e) {
					e.printStackTrace();
				} catch (InvocationTargetException e) {
					e.printStackTrace();
				}
				if (obj instanceof JSONBean) {
					JSONBean jsonBean = (JSONBean)obj;
					JSONObject jsonObject = null;
					Object object = temp.get(key);
					if (object instanceof JSONObject){
						jsonObject = (JSONObject)object;
						result.put(key, jsonBean.initialize(jsonObject));
					}
				}
				else if (obj instanceof Collection){
					Collection<JSONBean> beanlist = (Collection<JSONBean>)obj;
					List<Object> jsonlist = new ArrayList<Object>(beanlist.size());
					Class genericsClass = null;
					try{
						genericsClass=GenericsUtils.getMethodGenericReturnType(method);
					}catch (Exception e) {
						
					}
					if (genericsClass!=null){
						if (JSONBean.class.isAssignableFrom(genericsClass)){
							JSONObject jsonObject = null;
							Object object = temp.get(key);
							if (object instanceof JSONObject){
								jsonObject = (JSONObject)object;
								for (JSONBean jsonBean : beanlist) {
									jsonlist.add(jsonBean.initialize(jsonObject).toString());
								}
							}
						}
						else {
							if (IEnums.class.isAssignableFrom(genericsClass)){
								for (Object bean : beanlist) {
									IEnums nums = (IEnums)bean;
									Map<String, Object> map = new HashMap<String, Object>();
									map.put("id", nums.value());
									map.put("text", nums.text());
									map.put("type", nums.type());
									jsonlist.add(map);
								}
							}
							else {
								for (JSONBean jsonBean : beanlist) {
									jsonlist.add(jsonBean.toString());
								}
							}
						}
						JSONArray jsonArr = JSONArray.fromObject(jsonlist);
						result.put(key, jsonArr.toString());
					}
				}
				else {
					if (obj instanceof java.util.Date){
						Field field = CacheLoaderUtil.getFields(beanclazz, true).get(key);
						String formatString = "yyyy-MM-dd HH:mm:ss";
						if (field != null){
							Description description = field.getAnnotation(Description.class);
							if (description != null && StringUtils.isNotBlank(description.Format())){
								formatString = description.Format();
							}
						}
						SimpleDateFormat sdf = new SimpleDateFormat(formatString);
						String str = sdf.format(obj);
						result.put(key, str);
					}
					else if (obj instanceof java.sql.Date){
						Field field = CacheLoaderUtil.getFields(beanclazz, true).get(key);
						String formatString = "yyyy-MM-dd";
						if (field != null){
							Description description = field.getAnnotation(Description.class);
							if (description != null && StringUtils.isNotBlank(description.Format())){
								formatString = description.Format();
							}
						}
						SimpleDateFormat sdf = new SimpleDateFormat(formatString);
						String str = sdf.format(obj);
						result.put(key, str);
					}
					else {
						String str = this.convertToString(key, obj);
						result.put(key, str);
					}
				}
			}
		}
		return this.json = attachJson(result);
	}

	public String Bean2Json() throws Exception{
		if (this.json == null)	
		{
			Class<JSONBean> clazz = (Class<JSONBean>) this.getClass();
			JSONObject temp = CacheLoaderUtil.loadJsonObject(clazz, 0, 1);
			initialize(temp);
		}
		return json.toString();
	}
	
	public String Bean2Json(String jsonstr) throws Exception{
		if (jsonstr != null){
			initialize(JSONObject.fromObject(jsonstr));	
		}
		if (json != null){
			return json.toString();
		}
		else {
			return "{}";
		}
	}
	
	public void Json2Bean(String jsonstr) throws Exception{
		this.json = JSONObject.fromObject(jsonstr);
		fromJson(this.json);
	}
	
	protected Class fetchClass(JSONObject json) throws Exception{
		String clazzName = json.getString("clazzname");
		Class clazz = null;
		if (StringUtils.isNotBlank(clazzName)){
			try {
				clazz = Class.forName(clazzName);
			} catch (ClassNotFoundException e) {
				e.printStackTrace();
			}
		}
		if (clazz == null){
			throw new Exception("JSON数据中没有clazzname");
		}
		return clazz;
	}
	/**
	 * 根据JSON对象填充实体
	 * @param json
	 * @throws Exception
	 */
	public void fromJson(JSONObject json) throws Exception{
		this.json = json;
		Class beanclazz = this.getClass();
		for(Object k : json.keySet()){
			String name = k.toString();
			PropertyDescriptor pd = null;
			try {
				pd = CacheLoaderUtil.getPropertyDescriptor(beanclazz, name);
			} catch (IntrospectionException e) {
				e.printStackTrace();
			} catch (OgnlException e) {
				e.printStackTrace();
			}
			if (pd != null){
				Method method = pd.getWriteMethod();
				Class propclazz = pd.getPropertyType();
				Object object = json.get(k);
//				System.out.println("propclazz="+propclazz+" object="+object);
				if (JSONBean.class.isAssignableFrom(propclazz) && !propclazz.isEnum()  && !(object instanceof JSONNull) && !"{}".equals(object.toString())){
					JSONObject jsonbean = (JSONObject)object;
					Class clazz = fetchClass(jsonbean);
					Method read = pd.getReadMethod();
					Object bean = null;
					try {
						bean = read.invoke(this);
						Object id = jsonbean.get("id");
						if (id instanceof JSONNull){
							id = null;
						}
						//如果实体属性为空或者实体属性与要更新的属性不是同一个实例时
						if (bean == null || (id != null && !id.equals(((JSONBean)bean).getId()))){
							bean = clazz.newInstance();
							if (bean instanceof JSONBean){
								((JSONBean)bean).fromJson(jsonbean);
							}
						}
						else {
							Field field = CacheLoaderUtil.getFields(beanclazz, true).get(name);
							if (field != null){
								OneToOne oneToOne = field.getAnnotation(OneToOne.class);
								//只能在OneToOne时才能更新,如果是ManyToOne就导致One的一方也被更新
								if (oneToOne != null && bean instanceof JSONBean){
									((JSONBean)bean).fromJson(jsonbean);
								}
							}
						}
					} catch (InstantiationException e) {
						e.printStackTrace();
					} catch (IllegalAccessException e) {
						e.printStackTrace();
					} catch (IllegalArgumentException e) {
						e.printStackTrace();
					} catch (InvocationTargetException e) {
						e.printStackTrace();
					}
					object = bean;
				}
				else if (object instanceof JSONArray){
					Method readMethod = pd.getReadMethod();
					Class<?> returnType = GenericsUtils.getMethodGenericReturnType(readMethod);
					if (JSONBean.class.isAssignableFrom(returnType)){
						JSONArray jsonArray = (JSONArray)object;
						Set<JSONBean> beanlist = new HashSet<JSONBean>();
						Iterator<JSONObject> it = jsonArray.iterator();
						while (it.hasNext()) {
							Object obj = it.next();
							if (obj instanceof net.sf.json.JSONNull){
								continue;
							}
							JSONObject jsonbean = (JSONObject)obj;
							Class clazz = fetchClass(jsonbean);
							if (Modifier.isAbstract(clazz.getModifiers())){
								throw new Exception(String.format("抽象类[%s],无法实例化", clazz.getName()));
							}						
							JSONBean bean = null;
							try {
								bean = (JSONBean)clazz.newInstance();
							} catch (InstantiationException e) {
								e.printStackTrace();
							} catch (IllegalAccessException e) {
								e.printStackTrace();
							}
							bean.fromJson(jsonbean);
							beanlist.add(bean);
						}
						object = beanlist;
					}
					else {
						object = null;
					}
				}
				else if (object instanceof JSONObject){
					object = object.toString();
				}
				else if (object instanceof JSONNull) {
					object = null;
				}
				else {
					if ("Serializable".equals(propclazz.getSimpleName())){
						for(Class<?> clazz = beanclazz ; clazz != Object.class ; clazz = clazz.getSuperclass()){ 
							propclazz = GenericsUtils.getSuperClassGenricType(clazz);
							if (propclazz != Object.class){
								break;
							}
						}
					}
					if (Integer.class.isAssignableFrom(propclazz)) {
						if (object == null || "".equals(object.toString())){
							object = null;
						}
						else {
							object = Integer.parseInt(object.toString());
						}					
					}
					else if (Long.class.isAssignableFrom(propclazz)) {
						if (object == null || "".equals(object.toString())){
							object = null;
						}
						else {
							object = Long.parseLong(object.toString());
						}					
					}
					else if (Float.class.isAssignableFrom(propclazz)) {
						if (object == null || "".equals(object.toString())){
							object = null;
						}
						else {
							object = Float.parseFloat(object.toString());
						}				
						
					} 
					else if (BigDecimal.class.isAssignableFrom(propclazz)){
						if (object == null || "".equals(object.toString())){
							object = new BigDecimal(0);
						}
						else {
							object = new BigDecimal(object.toString());
						}
					} 
					else if (Boolean.class.isAssignableFrom(propclazz)){
						object = Boolean.parseBoolean(object != null ? object.toString() : null);
					}
					else if (propclazz.isEnum()){
						if (object instanceof JSONObject){
							JSONObject jsonbean = (JSONObject)object;
							object = jsonbean.get("id");
						}
						if (object == null ||"".equals(object.toString())){
							object = null;
						}
						else {
							try {
								Method method2 = propclazz.getMethod("valueOf",String.class);
								object = method2.invoke(propclazz, object.toString());
							} catch (SecurityException e) {
								e.printStackTrace();
							} catch (NoSuchMethodException e) {
								e.printStackTrace();
							} catch (IllegalArgumentException e) {
								e.printStackTrace();
							} catch (IllegalAccessException e) {
								e.printStackTrace();
							} catch (InvocationTargetException e) {
								e.printStackTrace();
							}
						}
					}
					else if (java.sql.Date.class.isAssignableFrom(propclazz)) {
						Field field = CacheLoaderUtil.getFields(beanclazz, true).get(name);
						String formatString = "yyyy-MM-dd";
						if (field != null){
							Description description = field.getAnnotation(Description.class);
							if (description != null && StringUtils.isNotBlank(description.Format())){
								formatString = description.Format();
							}
						}
						DateFormat df= new SimpleDateFormat(formatString);
						if ("".equals(object)){
							object = null;
						}
						else {
							try {
								String text = object.toString();
								long time = df.parse(text.replace('T', ' ')).getTime();
								object = new java.sql.Date(time);
							} catch (ParseException e) {
								e.printStackTrace();
							}
						}
					}
					else if (java.util.Date.class.isAssignableFrom(propclazz)) {
						Field field = CacheLoaderUtil.getFields(beanclazz, true).get(name);
						String formatString = "yyyy-MM-dd HH:mm:ss";
						if (field != null){
							Description description = field.getAnnotation(Description.class);
							if (description != null && StringUtils.isNotBlank(description.Format())){
								formatString = description.Format();
							}
						}
						DateFormat df= new SimpleDateFormat(formatString);
						if ("".equals(object)){
							object = null;
						}
						else {
							try {
								String text = object.toString();
								object = df.parse(text.replace('T', ' '));
							} catch (ParseException e) {
								e.printStackTrace();
							}
						}
					}
					else {
						object = this.convertToObject(name, object);
					}
				}
				try {
					if (SystemVar.JSONDebugger){
						System.err.println(beanclazz.getName()+"--->"+propclazz.getName()+"-->key:"+name +"<>object:"+object);
					}
					if (object != null && ("".equals(object.toString()) || object instanceof JSONArray)){
						object = null;
					}
					if (method != null){
						method.invoke(this, object);
					}
				} catch (IllegalArgumentException e) {
					e.printStackTrace();
				} catch (IllegalAccessException e) {
					e.printStackTrace();
				} catch (InvocationTargetException e) {
					e.printStackTrace();
				}				
			}
		}
	}
	
	protected JSONObject attachJson(JSONObject json){
		String indexCls = this.getIndexCls();
		if (indexCls == null){
			Class<?> clazz = this.getClass();
			Description desc = clazz.getAnnotation(Description.class);
			if (desc != null){
				json.put("indexCls", desc.Icon());
			}
		}
		return json;
	}
	
	public void setClazzname(String clazzname) {
		this.clazzname = clazzname;
	}

	public String getClazzname() {
		if (clazzname == null){
			if (this instanceof HibernateProxy){
				HibernateProxy proxy = (HibernateProxy)this;
				Class<?> clazz = proxy.getHibernateLazyInitializer().getPersistentClass();
				clazzname = clazz.getName();
			}
			else {
				clazzname = this.getClass().getName();
			}
		}
		return clazzname;
	}
	public void setValid(Boolean valid) {
		this.valid = valid;
	}

	public Boolean getValid() {
		return valid;
	}

	public void setJson(JSONObject json) {
		this.json = json;
	}

	public JSONObject getJson() {
		return json;
	}

	public Map<String, Boolean> getPrivilegeMap() {
		return privilegeMap;
	}
	public void setPrivilegeMap(Map<String, Boolean> privilegeMap) {
		this.privilegeMap = privilegeMap;
	}
	public String getModifyFlag() {
		return modifyFlag;
	}
	public void setModifyFlag(String modifyFlag) {
		this.modifyFlag = modifyFlag;
	}
	public String getIndexCls() {
		return indexCls;
	}
	public void setIndexCls(String indexCls) {
		this.indexCls = indexCls;
	}
	public abstract Date getCreateDate();
	
	public abstract void setCreateDate(Date createDate);	
}
