package ${javafolder}.action;
<#assign itemlist = toToolbarModel()>
<#if (itemlist?size > 0)>
import org.apache.commons.lang.StringUtils;
</#if>
import com.keer.core.dao.SQLBuilder;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;

import ${fullname};
import ${javafolder}.service.I${appfolder?cap_first}BizService;
<#if categoryField != 'parent'>
import com.keer.core.annotation.Permission;
import ${javafolder}.bean.${categoryNav.appfolder?cap_first};
import ${javafolder}.service.I${categoryNav.appfolder?cap_first}BizService;
</#if>
import com.keer.core.annotation.Description;
import com.keer.core.base.CRUDAction;
import com.keer.core.bean.base.JSONBean;

@Description(Name="${name}")
@Action("${appfolder?cap_first}Action")
@SuppressWarnings({"serial","rawtypes"})
public class ${appfolder?cap_first}Action extends CRUDAction<${appfolder?cap_first}> {

	@Autowired
	private I${appfolder?cap_first}BizService ${appfolder?uncap_first}BizService;
	
	<#list itemlist as item>
	private String ${item.dataIndex};
	</#list>
	<#if categoryField != 'parent'>
	@Autowired
	private I${categoryNav.appfolder?cap_first}BizService ${categoryNav.appfolder?uncap_first}BizService;
	
	@Permission(action="VIEW_${categoryField?cap_first}",desc="查看${categoryNav.name}",bean=${categoryNav.appfolder?cap_first}.class)
	public void find${categoryField?cap_first}() throws Exception {
		this.find();
	}
	
	@Permission(action="VIEW_${categoryField?cap_first}",desc="查看${categoryNav.name}",bean=${categoryNav.appfolder?cap_first}.class)
	public void findAll${categoryField?cap_first}() throws Exception {
		this.findAll();
	}
	
	@Permission(action="ADD_${categoryField?cap_first}",desc="添加${categoryNav.name}",bean=${categoryNav.appfolder?cap_first}.class)
	public void save${categoryField?cap_first}() throws Exception {
		this.save();
	}
	
	@Permission(action="EDIT_${categoryField?cap_first}",desc="编辑${categoryNav.name}",bean=${categoryNav.appfolder?cap_first}.class)
	public void update${categoryField?cap_first}() throws Exception {
		this.update();
	}
	
	@Permission(action="DEL_${categoryField?cap_first}",desc="删除${categoryNav.name}",bean=${categoryNav.appfolder?cap_first}.class)
	public void remove${categoryField?cap_first}() throws Exception {
		this.remove();
	}
	</#if>
	
	@Override
	public JSONBean bizDefaultBean(JSONBean bean) throws Exception {
		return bean;
	}
		
	@Override
	public void buildFilterString(Class<JSONBean> clazz, SQLBuilder builder) throws Exception {
		String beanName = clazz.getSimpleName();
		if (beanName.equals("${appfolder?cap_first}")){
			<#list itemlist as item>
			if (StringUtils.isNotBlank(${item.dataIndex})) {
				<#if item.dataType == 'STRING'>
				<#if item.columnWidth == 100>
				builder.AddFilterWhere(String.format("${item.dataIndex} = '%s'", ${item.dataIndex}));
				<#else>
				builder.AddFilterWhere("${item.dataIndex} like '%"+${item.dataIndex}+"%'");
				</#if>
				</#if>
				<#if item.dataType == 'OBJECT'>
				builder.AddFilterWhere(String.format("${item.dataIndex}.id = %s", ${item.dataIndex}));
				</#if>
				<#if item.dataType == 'INT'>
				builder.AddFilterWhere(String.format("${item.dataIndex} = %s", ${item.dataIndex}));
				</#if>
				<#if item.dataType == 'ENUM' || item.dataType == 'AUTO' || item.dataType == 'BOOLEAN' || item.dataType == 'DATE'>
				builder.AddFilterWhere(String.format("${item.dataIndex} = '%s'", ${item.dataIndex}));
				</#if>
			}
			</#list>			
		}
	}
	<#list itemlist as item>
	
	public String get${item.dataIndex?cap_first}() {
		return ${item.dataIndex};
	}
	
	public void set${item.dataIndex?cap_first}(String ${item.dataIndex}) {
		this.${item.dataIndex} = ${item.dataIndex};
	}
	</#list>
}
