package com.keer.core.action;

import java.io.Serializable;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javassist.Modifier;

import javax.persistence.Enumerated;
import javax.persistence.ManyToMany;
import javax.persistence.Transient;

import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;

import com.keer.core.annotation.Description;
import com.keer.core.annotation.Permission;
import com.keer.core.base.CRUDAction;
import com.keer.core.bean.base.JSONBean;
import com.keer.core.bean.enums.DataType;
import com.keer.core.bean.enums.IEnums;
import com.keer.core.bean.model.EntityModel;
import com.keer.core.bean.model.ModelConfig;
import com.keer.core.bean.model.ModelDetail;
import com.keer.core.dao.SQLBuilder;
import com.keer.core.service.IEntityModelBizService;
import com.keer.core.service.IModelConfigBizService;
import com.keer.core.service.IModelDetailBizService;
import com.keer.core.util.CacheLoaderUtil;
import com.keer.core.util.DefineClass;
import com.keer.core.util.FreemarkerUtils;
import com.keer.core.util.GenericsUtils;

@Action("EntityModelAction")
@SuppressWarnings({"serial","rawtypes"})
public class EntityModelAction extends CRUDAction<EntityModel> {

	@Autowired
	private IEntityModelBizService entityModelBizService;
	
	@Autowired
	private IModelConfigBizService modelConfigBizService;
	
	@Autowired
	private IModelDetailBizService modelDetailBizService;
	
	@Override
	public Serializable getPrimaryValue(Class<JSONBean> clazz) {
		return this.getId();
	}
	private String parent;
	private String fullname;
	private Boolean canAuthorize;
	private String name;
	private String clazzname;
	private String appfolder;
	private Boolean mainContainer = true;		
	private Boolean mainController = true;
	private Boolean childContainer = true;		
	private Boolean childController = true;	
	private Boolean editWindow = true;		
	private Boolean editController = true;		
	private Boolean findWindow = true;	
	private Boolean findController = true;
	private Boolean store = true;
	private Boolean model = true;
	private Boolean coverAction = true;	
	private Boolean coverService = true;	
	private Boolean allWrite; 		//全部覆盖
	
	@Permission(action="VIEW",desc="",bean=ModelDetail.class,ignore=true)
	public void findAllModelDetail() throws Exception {
		this.findAll();
	}
	
	@Permission(action="VIEW",desc="",bean=ModelConfig.class,ignore=true)
	public void findAllModelConfig() throws Exception {
		if (node != null && clazzname == null){
			clazzname = node;
		}
		if (navLoad){
			clazzname = "root";
		}
		if (clazzname != null){
			if (clazzname.equals("root")){
				DefineClass parent = CacheLoaderUtil.getDefineClass(ModelConfig.class);
				if (parent != null){
					List<JSONObject> list = new ArrayList<JSONObject>();
					for(DefineClass child : parent.getChilds()){
						JSONObject object = new JSONObject();
						String clazz = child.getClazzname();
						object.accumulate("id", clazz);
						object.accumulate("clazzname", clazz);
						object.accumulate("name", child.getDescription());
						object.accumulate("leaf", false);
						list.add(object);
					}
					JSONResponse(list);
				}
			}
			else {
				Class<?> objClass = Class.forName(this.getClazzname());
				@SuppressWarnings("unchecked")
				Class<ModelConfig> clazz = (Class<ModelConfig>) objClass;
				if (clazz != null){
					sqlBuilder.AddFilterWhere(String.format("parent.id = '%s'", this.parent));
					List<?> list =  this.dao.findAll(clazz, sqlBuilder,json);
					JSONResponse(list);
				}
				else {
					throw new Exception("枚举类型不匹配");
				}
			}
		}
	}
	
	@Override
	public void buildFilterString(Class<JSONBean> clazz,SQLBuilder builder) throws Exception {
		String beanName = clazz.getSimpleName();
		if ("EntityModel".equals(beanName)){
			if (name != null && !"".equals(name)){
				builder.AddFilterWhere("name like :name");
				builder.AddParam("name", "%"+name+"%");
			}
			if (appfolder != null &&  !"".equals(appfolder)){
				builder.AddFilterWhere("appfolder = :appfolder");
				builder.AddParam("appfolder", appfolder);
			}
			if (fullname != null && !"".equals(fullname)){
				builder.AddFilterWhere("fullname like :fullname");
				builder.AddParam("fullname", "%"+fullname+"%");
			}
			if (canAuthorize != null){
				builder.AddFilterWhere("canAuthorize=:canAuthorize");
				builder.AddParam("canAuthorize", canAuthorize);
			}
		}
		else if ("ModelDetail".equals(beanName)){
			builder.AddFilterWhere(String.format("parent.id = '%s'", this.parent));
			builder.AddFilterWhere(String.format("(isTransient is null or isTransient = false or dataIndex = 'indexCls')"));			
		}
	}
	
	@SuppressWarnings({ "unchecked" })
	@Override
	public List<JSONBean> bizFindAll(Class<JSONBean> clazz, SQLBuilder builder) throws Exception {
		if (StringUtils.isNotBlank(clazzname)){
			Class<?> objClass = Class.forName(clazzname);
			Map<String, Field> fieldMap = CacheLoaderUtil.getAllSubclassFields(objClass, true);
			List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
			List<EntityModel> modelList = dao.findAll(EntityModel.class, new SQLBuilder(), null);
			Map<Class<JSONBean>, EntityModel> modelMap = new HashMap<Class<JSONBean>, EntityModel>();
			for(EntityModel model : modelList){
				Class<JSONBean> modelClazz = null;
				try {
					modelClazz = (Class<JSONBean>) Class.forName(model.getFullname());
				} catch (Exception e) {
				}
				if (modelClazz != null){
					modelMap.put(modelClazz, model);
				}
			}
			for(String name : fieldMap.keySet()){
				Field field = fieldMap.get(name);
				Class<?> fieldClass = field.getType();
				if (JSONBean.class.isAssignableFrom(fieldClass)){
					Description desc = field.getAnnotation(Description.class);
					if (desc != null){
						for(Class<JSONBean> keyClzz : modelMap.keySet()){
							if (fieldClass.isAssignableFrom(keyClzz) || keyClzz.isAssignableFrom(fieldClass)){
								EntityModel beanmodel = modelMap.get(keyClzz);
								Map<String, Object> map = new HashMap<String, Object>();
								map.put("id", beanmodel.getId());
								map.put("name", String.format("%s[%s]", desc.Name(),beanmodel.getName()));
								map.put("version", beanmodel.getVersion());
								map.put("clazzname", beanmodel.getClazzname());
								map.put("categoryField", field.getName());
								list.add(map);
							}
						}
					}
				}
			}
			JSONResponse(list);			
			return null;
		}
		else {
			return super.bizFindAll(clazz, builder);
		}
	}
	
	public void BuildExtjs() throws Exception {
		String id = this.getId();
		EntityModel bean = dao.find(EntityModel.class, id, "{categoryNav:{details:{id:null},columns:{id:null}},details:null,columns:null}");
		FreemarkerUtils.doBuildExtjs(bean, mainContainer, mainController, childContainer, childController, editWindow, editController,findWindow,findController,store,model,allWrite);
		this.response("{\"success\":true}");
	}
	
	public void BuildJava() throws Exception {
		String id = this.getId();
		EntityModel model = dao.find(EntityModel.class, id, "{details:null,columns:null}");
		FreemarkerUtils.doBuildJava(model, coverAction, coverService);
		this.response("{\"success\":true}");
	}
	
	public void register() throws Exception {
		Class<?> clazz = Class.forName(fullname);
		String shutName = "";
		Description ds = clazz.getAnnotation(Description.class);
		if (ds != null){
			shutName = ds.Name();
		}
		EntityModel model = null;
		SQLBuilder sqlBuilder = new SQLBuilder();
		sqlBuilder.AddFilterWhere(String.format("fullname='%s'", fullname));
		List<EntityModel> list = dao.findAll(EntityModel.class,sqlBuilder,"{details:null}");
		if (list.size() > 0){
			model = list.get(0);
			for(ModelDetail child : model.getDetails()){
				dao.delete(child);
			}
			model.getDetails().clear();
		}
		else {
			model = new EntityModel();
		}
		if (ds != null){
			model.setName(shutName);
		}
		String[] arr = fullname.split("\\.");
		if (arr != null && arr.length > 0){
			model.setAppfolder(arr[arr.length-1]);
		}
		model.setFullname(fullname);
		model.setJavafolder(fullname.substring(0,fullname.lastIndexOf(".bean")));
		model.setJson(null);
		dao.save(model);
		Map<String, Field> fieldMap = null;
		int modifier = clazz.getModifiers();
		if (Modifier.isAbstract(modifier)){
			fieldMap = CacheLoaderUtil.getAllSubclassFields(clazz, true);
		}
		else {
			fieldMap = CacheLoaderUtil.getFields(clazz, true);
		}
		for (String key : fieldMap.keySet()) {
			Field field = fieldMap.get(key);
			Description desc = field.getAnnotation(Description.class);
			Transient trans = field.getAnnotation(Transient.class);
			if (desc != null){
				ModelDetail detail = new ModelDetail();
				detail.setText(desc.Name());
				detail.setDataIndex(field.getName());
				Class<?> propClass = field.getType();
				detail.setFieldType(propClass.getSimpleName());
				if (Collection.class.isAssignableFrom(propClass)){
					Class<?> fieldType = GenericsUtils.getFieldGenericType(field);
					detail.setFieldType(fieldType.getSimpleName());
					ManyToMany many = field.getAnnotation(ManyToMany.class);
					if (many != null){
						detail.setDataType(DataType.RELATION);
					}
					else {
						detail.setDataType(DataType.COLLECT);
					}
				}
				else if(GenericsUtils.IsInterface(propClass, IEnums.class)){
					detail.setDataType(DataType.ENUM);
				}
				else if (JSONBean.class.isAssignableFrom(propClass)){
					detail.setDataType(DataType.OBJECT);
				}
				else if (String.class.isAssignableFrom(propClass)){
					Enumerated enumType = propClass.getAnnotation(Enumerated.class);
					if (enumType != null){
						detail.setDataType(DataType.ENUM);
						detail.setFieldType(field.getName());
					}
					else {
						detail.setDataType(DataType.STRING);
					}
				}
				else if (Boolean.class.isAssignableFrom(propClass)){
					detail.setDataType(DataType.BOOLEAN);
				}
				else if (Integer.class.isAssignableFrom(propClass)){
					detail.setDataType(DataType.INT);
				}
				else if (java.util.Date.class.isAssignableFrom(propClass)){
					detail.setDataType(DataType.DATE);
				}
				else {
					detail.setFieldType(field.getName());
				}
				detail.setValid(true);
				detail.setColumnWidth(120);
				detail.setIsTransient(trans != null);
				detail.setParent(model);
				detail.setJson(null);
				dao.save(detail);
			}
		}
		this.response("{\"success\":true}");		
	}
	
	@Override
	public JSONBean bizDefaultBean(JSONBean bean) throws Exception {
		return bean;
	}
	
	public void setName(String name) {
		this.name = name;
	}

	public void setAppfolder(String appfolder) {
		this.appfolder = appfolder;
	}

	public String getAppfolder() {
		return appfolder;
	}

	public String getName() {
		return name;
	}
	public void setFullname(String fullname) {
		this.fullname = fullname;
	}

	public String getFullname() {
		return fullname;
	}

	public Boolean getCoverAction() {
		return coverAction;
	}

	public void setCoverAction(Boolean coverAction) {
		this.coverAction = coverAction;
	}

	public Boolean getCoverService() {
		return coverService;
	}

	public void setCoverService(Boolean coverService) {
		this.coverService = coverService;
	}
	public Boolean getCanAuthorize() {
		return canAuthorize;
	}
	public void setCanAuthorize(Boolean canAuthorize) {
		this.canAuthorize = canAuthorize;
	}
	public String getClazzname() {
		return clazzname;
	}
	public void setClazzname(String clazzname) {
		this.clazzname = clazzname;
	}
	public Boolean getAllWrite() {
		return allWrite;
	}
	public void setAllWrite(Boolean allWrite) {
		this.allWrite = allWrite;
	}
	public Boolean getMainContainer() {
		return mainContainer;
	}
	public void setMainContainer(Boolean mainContainer) {
		this.mainContainer = mainContainer;
	}
	public Boolean getMainController() {
		return mainController;
	}
	public void setMainController(Boolean mainController) {
		this.mainController = mainController;
	}
	public Boolean getChildContainer() {
		return childContainer;
	}
	public void setChildContainer(Boolean childContainer) {
		this.childContainer = childContainer;
	}
	public Boolean getChildController() {
		return childController;
	}
	public void setChildController(Boolean childController) {
		this.childController = childController;
	}
	public Boolean getEditWindow() {
		return editWindow;
	}
	public void setEditWindow(Boolean editWindow) {
		this.editWindow = editWindow;
	}
	public Boolean getEditController() {
		return editController;
	}
	public void setEditController(Boolean editController) {
		this.editController = editController;
	}
	public Boolean getFindWindow() {
		return findWindow;
	}
	public void setFindWindow(Boolean findWindow) {
		this.findWindow = findWindow;
	}
	public Boolean getFindController() {
		return findController;
	}
	public void setFindController(Boolean findController) {
		this.findController = findController;
	}

	public String getParent() {
		return parent;
	}

	public void setParent(String parent) {
		this.parent = parent;
	}

	public Boolean getModel() {
		return model;
	}

	public void setModel(Boolean model) {
		this.model = model;
	}

	public Boolean getStore() {
		return store;
	}

	public void setStore(Boolean store) {
		this.store = store;
	}
}
