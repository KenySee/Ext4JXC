package com.keer.core.base;

import java.io.Serializable;
import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;

import com.keer.core.annotation.Permission;
import com.keer.core.annotation.TopSubClass;
import com.keer.core.bean.base.GenericBean;
import com.keer.core.bean.base.JSONBean;
import com.keer.core.dao.SQLBuilder;
import com.keer.core.service.IAuthorityBizService;
import com.keer.core.util.BeanUtils;
import com.keer.core.util.CacheLoaderUtil;
import com.keer.core.util.GenericsUtils;

@SuppressWarnings({ "serial", "rawtypes", "unchecked" })
public abstract class CRUDAction<T extends JSONBean> extends JSONAction {
	
	protected List<JSONBean> beanList;
	
	/**
	 * 请求默认值实体类型
	 */
	private String defaultclazz;
	
	protected Map<Class<?>, IAuthorityBizService> bizServiceMap = new HashMap<Class<?>, IAuthorityBizService>();
	
	protected abstract void buildFilterString(Class<JSONBean> clazz,SQLBuilder builder) throws Exception;
	
	protected abstract JSONBean bizDefaultBean(JSONBean bean) throws Exception;
	
	protected Serializable getPrimaryValue(Class<JSONBean> clazz){
		String id = this.getId();
		if (GenericBean.class.isAssignableFrom(clazz)){
			return id;
		}
		else {
			return StringUtils.isNotBlank(id) ? Integer.parseInt(id) : null;
		}
	}
	
	protected IAuthorityBizService getBizService(Class<JSONBean> clazz) throws Exception{
		for(Class<?> bizClazz : bizServiceMap.keySet()){
			if (bizClazz.isAssignableFrom(clazz)){
				return bizServiceMap.get(bizClazz);
			}
		}
		throw new Exception(String.format("在[%s]中没为实体类[%s]注入相应的服务类", this.getClass().getName(),clazz.getName()));
	}
	
	@Override
	public void prepare() throws Exception {
		super.prepare();
		Map<String, Field> fields = CacheLoaderUtil.getFields(this.getClass(), true);
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
	}
	
	public Class<JSONBean> getGenricType() throws Exception{
		Class<JSONBean> clazz = super.getGenricType();
		if (clazz == null){
			clazz = (Class<JSONBean>) GenericsUtils.getSuperClassGenricType(this.getClass());
		}
		return clazz;
	}
	
	public void findDefault() throws Exception {
		Class<JSONBean> clazz = (Class<JSONBean>) Class.forName(this.defaultclazz);
		if(clazz != null){
			JSONBean bean = clazz.newInstance();
			JSONBean result = bizDefaultBean(bean);
			Integer clazzLevel = this.getClazzlevel();
			Integer propLevel = this.getProplevel();
			result.initialize(clazzLevel, propLevel);
			JSONResponse(result);
		}
	}
	
	@Permission(action="VIEW",desc="查看",ignore=true)
	public void find() throws Exception {
		Integer clazzInteger = clazzlevel > 1 ? clazzlevel : 1;
		Integer propInteger = proplevel > 1 ? proplevel : 1;
		sqlBuilder.AddParseLevel(clazzInteger, propInteger);		
		JSONResponse(bizFind());
	}
	@Permission(action="VIEW", desc="查看",ignore=true)
	public void findAllNoPaging() throws Exception{
		Class<JSONBean> clazz = this.getGenricType();
		buildFilterString(clazz,sqlBuilder);
		this.setTotalCount(dao.findRecordCount(clazz, sqlBuilder));
		
		Integer clazzLevel = this.getClazzlevel();
		Integer propLevel = this.getProplevel();
		if (clazzLevel != null && propLevel != null){
			sqlBuilder.AddParseLevel(clazzLevel, propLevel);
		}
		
		JSONResponse(bizFindAll(clazz,sqlBuilder));
	}
	
	@Permission(action="VIEW", desc="查看",ignore=true)
	public void findAll() throws Exception{
		Class<JSONBean> clazz = this.getGenricType();
		buildFilterString(clazz,sqlBuilder);
		this.setTotalCount(dao.findRecordCount(clazz, sqlBuilder));
		
		Integer start = this.getStart();
		Integer limit = this.getLimit();
		if (start != null && limit != null){
			sqlBuilder.AddPaging(start, limit);
		}
		
		Integer clazzLevel = this.getClazzlevel();
		Integer propLevel = this.getProplevel();
		if (clazzLevel != null && propLevel != null){
			sqlBuilder.AddParseLevel(clazzLevel, propLevel);
		}
		
		JSONResponse(bizFindAll(clazz,sqlBuilder));
	}
	
	@Permission(action="ADD", desc="添加")
	public void save() throws Exception {
		Class<JSONBean> clazz = this.getGenricType();
		beanList = (List<JSONBean>) RequestJSONList();
		if (beanList.size() > 0){
			bizSave(beanList,clazz,sqlBuilder);
		}
		String iniValue = "";
		for(JSONBean bean : beanList){
			if (iniValue != ""){
				iniValue += ",";
			}
			if (bean.getId() instanceof String){
				iniValue += String.format("'%s'", bean.getId().toString());
			}
			else {
				iniValue += String.format("%s", bean.getId().toString());
			}
		}
		SQLBuilder builder = new SQLBuilder();
		builder.AddFilterWhere(String.format("id in(%s)", iniValue));
		Integer clazzInteger = clazzlevel > 1 ? clazzlevel : 1;
		Integer propInteger = proplevel > 1 ? proplevel : 1;
		builder.AddParseLevel(clazzInteger, propInteger);
		beanList = dao.findAll(getGenricType(), builder, json);
		JSONResponse(beanList,true);
	}
	
	@Permission(action="EDIT",desc="编辑")
	public void update() throws Exception {
		Class<JSONBean> clazz = this.getGenricType();
		beanList = (List<JSONBean>) RequestJSONList();
		if (beanList.size() > 0){
			bizUpdate(beanList,clazz,sqlBuilder);
		}
		String iniValue = "";
		for(JSONBean bean : beanList){
			if (iniValue != ""){
				iniValue += ",";
			}
			Serializable id = bean.getId();
			if (id instanceof String){
				iniValue += String.format("'%s'", id.toString());
			}
			else {
				iniValue += String.format("%s", id.toString());
			}
		}
		SQLBuilder builder = new SQLBuilder();
		builder.AddFilterWhere(String.format("id in(%s)", iniValue));
		Integer clazzInteger = clazzlevel > 1 ? clazzlevel : 1;
		Integer propInteger = proplevel > 1 ? proplevel : 1;
		builder.AddParseLevel(clazzInteger, propInteger);
		beanList = dao.findAll(getGenricType(), builder, json);	
		JSONResponse(beanList,false);
	}
	
	@Permission(action="DEL", desc="删除")
	public void remove() throws Exception {
		Class<JSONBean> clazz = this.getGenricType();
		beanList = (List<JSONBean>) RequestJSONList();
		if (beanList.size() > 0){
			bizRemove(beanList, clazz, sqlBuilder);
		}
		JSONResponse(beanList,true);
	}
	
	@Permission(action="EDIT",desc="编辑")
	public String saveReturn() throws Exception {
		this.save();
		return NONE;
	}
	
	@Permission(action="EDIT",desc="编辑")
	public String updateReturn() throws Exception {
		this.update();
		return NONE;
	}
	
	protected JSONBean bizFind() throws Exception{
		Class<JSONBean> clazz = getGenricType();
		JSONBean bean = this.getBizService(clazz).find(clazz, this.getPrimaryValue(clazz),sqlBuilder,json);
		return bean;
	}
	
	protected List<JSONBean> bizFindAll(Class<JSONBean> clazz, SQLBuilder builder) throws Exception {
		List<JSONBean> results = null;
		if (allLoad){
			builder.clearFilterWhere();
			results = this.getBizService(clazz).findAll(clazz, builder, null);
		}
		else {
			results = this.getBizService(clazz).findAll(clazz, builder, json);
		}
		return results;
	}
	
	protected void bizSave(List<JSONBean> list,Class<JSONBean> clazz, SQLBuilder builder) throws Exception{
		this.getBizService(clazz).save(list, builder);
	}
	
	protected void bizUpdate(List<JSONBean> list,Class<JSONBean> clazz, SQLBuilder builder) throws Exception{
		getBizService(clazz).update(list, builder);
	}

	protected void bizRemove(List<JSONBean> list,Class<JSONBean> clazz, SQLBuilder builder) throws Exception{
		getBizService(clazz).delete(list, builder);
	}
	
	public String getDefaultclazz() {
		return defaultclazz;
	}

	public void setDefaultclazz(String defaultclazz) {
		this.defaultclazz = defaultclazz;
	}
}