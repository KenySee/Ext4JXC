package com.keer.core.bean.model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import com.keer.core.annotation.Description;
import com.keer.core.bean.base.BaseBean;
import com.keer.core.bean.enums.DataType;
import com.keer.core.bean.enums.Grid;
import com.keer.core.bean.enums.Layout;
import com.keer.core.util.StringUtils;

@Entity
@Table(name="ts_view_model")
@SuppressWarnings("serial")
@Description(Name="实体模型")
public class EntityModel extends BaseBean {

	/**
	 * Java目录
	 */
	@Description(Name="Java目录")
	private String javafolder;
	
	/**
	 * 模型类名
	 */
	@Description(Name="模型类名")
	private String fullname;
	
	/**
	 * 所在目录
	 */
	@Description(Name="所在目录")
	private String upfolder;
	
	
	/**
	 * 模型简写
	 */
	@Description(Name="模型简写")
	private String appfolder;
	
	
	/**
	 * 布局方式(Tree,Panel)
	 */
	@Enumerated(EnumType.STRING)
	@Column(length=10)
	@Description(Name="布局方式")
	private Layout layout;
	
	/**
	 * 编辑方式(Pop,Inline)
	 */
	@Enumerated(EnumType.STRING)
	@Column(length=10)
	@Description(Name="编辑方式")
	private Grid grid;
	
	
	@ManyToOne
	@Fetch(FetchMode.JOIN)
	@Description(Name="分类导航")
	private EntityModel categoryNav;
	
	@ManyToOne
	@Fetch(FetchMode.JOIN)
	@Description(Name="父模型")
	private EntityModel parentModel;
	
	@Description(Name="父属性名")
	private String parentField;
	
	/**
	 * 分类属性名
	 */
	@Description(Name="分类属性名")
	private String categoryField;
	
	/**
	 * 标题属性名
	 */
	@Description(Name="标题属性名")
	private String displayField;
	
	/**
	 * 原始明细
	 */
	@OneToMany(mappedBy="parent")
	@Description(Name="原始明细")
	private Set<ModelDetail> details = new HashSet<ModelDetail>();
	
	/**
	 * 配置明细
	 */
	@OneToMany(mappedBy="parent")
	@Description(Name="配置明细")
	private Set<ModelConfig> columns = new HashSet<ModelConfig>();
	

	public String getAliasPrefix(){
		String alias = this.upfolder.replace('.', '-');
		return alias;
	}
	
	public String getActionBean(){
		int index = this.upfolder.indexOf('.');
		return index == -1 ? "" : this.appfolder;
	}
	
	public void setFullname(String fullname) {
		this.fullname = fullname;
	}

	public String getFullname() {
		return fullname;
	}

	public void setDetails(Set<ModelDetail> details) {
		this.details = details;
	}

	public Set<ModelDetail> getDetails() {
		return details;
	}

	public void setColumns(Set<ModelConfig> columns) {
		this.columns = columns;
	}

	public Set<ModelConfig> getColumns() {
		return columns;
	}

	public void setLayout(Layout layout) {
		this.layout = layout;
	}

	public Layout getLayout() {
		return layout;
	}

	public void setGrid(Grid grid) {
		this.grid = grid;
	}

	public Grid getGrid() {
		return grid;
	}

	public void setUpfolder(String upfolder) {
		this.upfolder = upfolder;
	}

	public String getUpfolder() {
		return upfolder;
	}

	public void setAppfolder(String appfolder) {
		this.appfolder = appfolder;
	}

	public String getAppfolder() {
		return StringUtils.toUpperCaseFirstOne(appfolder);
	}
	
	public List<String> toModelCollect(){
		List<String> outList = new ArrayList<String>();
		List<ModelDetail> list = new ArrayList<ModelDetail>(details);
		for(ModelDetail model : list){
			DataType type = model.getDataType();
			if (type != null && type == DataType.COLLECT){
				String dataIndex = model.getDataIndex();
				if (!outList.contains(dataIndex)){
					outList.add(dataIndex);
				}
			}
		}
		return outList;
	}
	
	public List<String> toModelAllCollect(){
		List<String> outList = new ArrayList<String>();
		List<ModelDetail> list = new ArrayList<ModelDetail>(details);
		for(ModelDetail model : list){
			DataType type = model.getDataType();
			if (type != null && (type == DataType.COLLECT || type == DataType.RELATION)){
				String dataIndex = model.getDataIndex();
				if (!outList.contains(dataIndex)){
					outList.add(dataIndex);
				}
			}
		}
		return outList;
	}
	public List<String> toModelConfig(){
		List<String> outList = new ArrayList<String>();
		List<ModelDetail> list = new ArrayList<ModelDetail>(details);
		Collections.sort(list);
		for(ModelDetail model : list){
			outList.add(model.toConfig());
		}
		return outList;
	}
	
	public List<String> toToolbarRequires(){
		List<String> outList = new ArrayList<String>();
		List<ModelConfig> list = new ArrayList<ModelConfig>();
		for(ModelConfig config : columns){
			if (config instanceof ModelToolbar){
				list.add(config);
			}
		}
		Collections.sort(list);
		for(ModelConfig model : list){
			List<String> sublist = model.toRequires();
			if (sublist != null){
				for(String sub : sublist){
					if (!outList.contains(sub)){
						outList.add(sub);
					}
				}
			}
		}
		return outList;
	}
	public List<ModelConfig> toChildHiddenModel(){
		List<ModelConfig> list = new ArrayList<ModelConfig>();
		for(ModelConfig config : columns){
			Editor editor = config.getEditor();
			if (editor instanceof EditorHidden){
				list.add(config);
			}
		}
		Collections.sort(list);
		return list;
	}
	public List<ModelConfig> toToolbarModel(){
		List<ModelConfig> list = new ArrayList<ModelConfig>();
		for(ModelConfig config : columns){
			if (config instanceof ModelToolbar){
				list.add(config);
			}
		}
		Collections.sort(list);
		return list;
	}
	public List<String> toToolbarConfig(){
		List<String> outList = new ArrayList<String>();
		List<ModelConfig> list = new ArrayList<ModelConfig>();
		for(ModelConfig config : columns){
			if (config instanceof ModelToolbar){
				list.add(config);
			}
		}
		Collections.sort(list);
		for(ModelConfig model : list){
			outList.add(model.toConfig());
		}
		return outList;
	}
	
	public List<String> toFieldRequires(){
		List<String> outList = new ArrayList<String>();
		List<ModelConfig> list = new ArrayList<ModelConfig>();
		for(ModelConfig config : columns){
			if (config instanceof ModelField){
				list.add(config);
			}
		}
		Collections.sort(list);
		for(ModelConfig model : list){
			List<String> sublist = model.toRequires();
			if (sublist != null){
				for(String sub : sublist){
					if (!outList.contains(sub)){
						outList.add(sub);
					}
				}
			}
		}
		return outList;
	}
	public List<String> toFieldConfig(){
		List<String> outList = new ArrayList<String>();
		List<ModelConfig> list = new ArrayList<ModelConfig>();
		for(ModelConfig config : columns){
			if (config instanceof ModelField){
				list.add(config);
			}
		}
		Collections.sort(list);
		for(ModelConfig model : list){
			if (outList.size() == 0 && model instanceof ModelField){
				((ModelField)model).setFoucs(true);
			}
			outList.add(model.toConfig());
		}
		return outList;
	}
	
	public List<String> toColumnRequires(){
		List<String> outList = new ArrayList<String>();
		List<ModelConfig> list = new ArrayList<ModelConfig>();
		for(ModelConfig config : columns){
			if (config instanceof ModelColumn){
				list.add(config);
			}
		}
		Collections.sort(list);
		for(ModelConfig model : list){
			List<String> sublist = model.toRequires();
			if (sublist != null){
				for(String sub : sublist){
					if (!outList.contains(sub)){
						outList.add(sub);
					}
				}
			}
		}
		return outList;
	}
	
	public List<String> toColumnConfig(){
		List<String> outList = new ArrayList<String>();
		List<ModelConfig> list = new ArrayList<ModelConfig>();
		for(ModelConfig config : columns){
			if (config instanceof ModelColumn){
				list.add(config);
			}
		}
		Collections.sort(list);
		for(ModelConfig model : list){
			outList.add(model.toConfig());
		}
		return outList;
	}
	
	
	public List<String> toCommonRequires(){
		List<String> outList = new ArrayList<String>();
		List<ModelConfig> list = new ArrayList<ModelConfig>();
		for(ModelConfig config : columns){
			if (config instanceof ModelCommon){
				ModelCommon column = (ModelCommon)config;
				Editor editor = column.getEditor();
				if (editor != null && editor instanceof EditorTrigger){
					continue;
				}
				list.add(config);
			}
		}
		Collections.sort(list);
		for(ModelConfig model : list){
			List<String> sublist = model.toRequires();
			if (sublist != null){
				for(String sub : sublist){
					if (!outList.contains(sub)){
						outList.add(sub);
					}
				}
			}
		}
		return outList;
	}	
	public List<String> toCommonConfig(){
		List<String> outList = new ArrayList<String>();
		List<ModelConfig> list = new ArrayList<ModelConfig>();
		for(ModelConfig config : columns){
			if (config instanceof ModelCommon){
				ModelCommon column = (ModelCommon)config;
				Editor editor = column.getEditor();
				if (editor != null && editor instanceof EditorTrigger){
					continue;
				}
				list.add(config);
			}
		}
		Collections.sort(list);
		for(ModelConfig model : list){
			outList.add(model.toConfig());
		}
		return outList;
	}	
	public String getCategoryField() {
		return categoryField == null ? "parent" : categoryField;
	}
	
	public void setCategoryField(String categoryField) {
		this.categoryField = categoryField;
	}
	
	public String getJavafolder() {
		return javafolder;
	}

	public void setJavafolder(String javafolder) {
		this.javafolder = javafolder;
	}

	public EntityModel getCategoryNav() {
		return categoryNav == null ? this : categoryNav;
	}

	public void setCategoryNav(EntityModel categoryNav) {
		this.categoryNav = categoryNav;
	}
	public String getDisplayField() {
		return displayField == null ? "name" : displayField;
	}
	public void setDisplayField(String displayField) {
		this.displayField = displayField;
	}
	
	public EntityModel getParentModel() {
		return parentModel == null ? this : parentModel;
	}
	public void setParentModel(EntityModel parentModel) {
		this.parentModel = parentModel;
	}
	public String getParentField() {
		return parentField == null ? "parent" : parentField;
	}
	public void setParentField(String parentField) {
		this.parentField = parentField;
	}
}
