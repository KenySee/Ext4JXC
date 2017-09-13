package com.keer.core.bean.model;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import net.sf.json.JSONObject;

import com.keer.core.annotation.Description;
import com.keer.core.bean.base.JSONBean;
import com.keer.core.bean.enums.DataType;
import com.keer.core.util.CacheLoaderUtil;
import com.keer.core.util.GenericsUtils;

@SuppressWarnings({"serial","unchecked","rawtypes"})
@Entity
@Table(name="ts_view_modeldetail")
@Description(Name="界面模型明细")
public class ModelDetail extends ModelDesc {

	@ManyToOne
	@JoinColumn(name="parentid")
	@Description(Name="界面模型")
	private EntityModel parent;

	public void setParent(EntityModel parent) {
		this.parent = parent;
	}

	public EntityModel getParent() {
		return parent;
	}

	/**
	 * 获取指定Class类型的所有非集合属性
	 * @param beanClazz
	 * @return
	 */
	private JSONObject getWithOutCollection(Class<JSONBean> beanClazz, int limit){
		JSONObject map = new JSONObject();
		Map<String, Field> fieldMap = CacheLoaderUtil.getAllSubclassFields(beanClazz, true);
		for(String key : fieldMap.keySet()){
			Field field = fieldMap.get(key);
			Class<?> cls = field.getType();
			Description desc = field.getAnnotation(Description.class);
			if (desc != null){
				if (!Collection.class.isAssignableFrom(cls)){
					if (JSONBean.class.isAssignableFrom(cls)){
						if (limit > 0){
							JSONObject result = getWithOutCollection((Class<JSONBean>)cls, limit-1);
							map.accumulate(key, result);
						}
					}
					else {
						map.accumulate(key, null);
					}
				}
			}			
		}
		return map;
	}
	
	/**
	 * 获取指定属性名对应的Class类型
	 * @param prop
	 * @return
	 */
	private Class<JSONBean> getPropClazz(String prop){
		String className = this.parent.getFullname();
		try{
			Class<JSONBean> clazz = (Class<JSONBean>) Class.forName(className);
			Map<String, Field> fieldMap = CacheLoaderUtil.getAllSubclassFields(clazz, true);
			Field field = fieldMap.get(prop);
			Class<JSONBean> propClass = (Class<JSONBean>) field.getType();
			if (Collection.class.isAssignableFrom(propClass)){
				propClass = (Class<JSONBean>)GenericsUtils.getFieldGenericType(field);
			}
			return propClass;
		}
		catch(Exception ex){
			ex.printStackTrace();
		}
		return null;
	}
	
	@Override
	public String toConfig() {
		JSONObject config = new JSONObject();
		String dataIndex = this.getDataIndex();
		config.accumulate("name", this.AsString(dataIndex));
		DataType type = this.getDataType();
		if (dataIndex.equals("id")){
			type = DataType.AUTO;
		}
		if (type != null){
			if (type == DataType.INT || type == DataType.STRING || type == DataType.BOOLEAN){
				config.accumulate("type", this.AsString(type.value().toLowerCase()));
				if (type == DataType.BOOLEAN){
					config.accumulate("defaultValue",false);
				}
			}
			else if (type == DataType.OBJECT || type == DataType.COLLECT || type == DataType.RELATION){
				Class<JSONBean> clazz = getPropClazz(dataIndex);
				JSONObject map = getWithOutCollection(clazz,type == DataType.COLLECT ? 1 : 0);
				config.accumulate("configMap",map);
				config.accumulate("defaultValue", type == DataType.OBJECT ? null : new ArrayList<Object>());
			}
			else if (type == DataType.DATE){
				config.accumulate("type", "'date'");
				config.accumulate("dateFormat", "'Y-m-d H:i:s'");
			}
			else {
				config.accumulate("type", "'auto'");
			}
		}
		String temp = config.toString();
		return temp.replaceAll("\"", "");
	}
}
