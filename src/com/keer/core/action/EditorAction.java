package com.keer.core.action;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;

import com.keer.core.base.CRUDAction;
import com.keer.core.bean.base.JSONBean;
import com.keer.core.bean.model.Editor;
import com.keer.core.dao.SQLBuilder;
import com.keer.core.service.IEditorBizService;
import com.keer.core.util.CacheLoaderUtil;
import com.keer.core.util.DefineClass;

@Action("EditorAction")
@SuppressWarnings({"serial","rawtypes"})
public class EditorAction extends CRUDAction<Editor> {
	
	private String clazzname;
	private String node = null;
	
	@Autowired
	private IEditorBizService editorBizService;
	
	@Override
	public JSONBean bizDefaultBean(JSONBean bean) throws Exception {
		return bean;
	}

	@Override
	public Serializable getPrimaryValue(Class<JSONBean> clazz) {
		String id = this.getId();
		return StringUtils.isNotBlank(id) ? Integer.parseInt(id) : null;
	}
	
	@Override
	public void buildFilterString(Class<JSONBean> clazz,SQLBuilder builder) throws Exception {
		
	}
	
	@SuppressWarnings("unchecked")
	public void findAll() throws Exception {
		if (this.clazzname == null) {
			DefineClass parent = CacheLoaderUtil.getDefineClass(Editor.class);
			if (parent != null) {
				List<Editor> list = new ArrayList<Editor>();
				for (DefineClass child : parent.getAllConcreteDefine()) {
					Editor editor = (Editor) child.getClazz().newInstance();
					editor.setName(child.getDescription());
					list.add(editor);
				}
				JSONResponse(list);
			}
		} 
		else {
			if (this.clazzname.equals("")){
				JSONResponse(new ArrayList<Editor>());
			}
			else {
				Class<?> objClass = Class.forName(this.clazzname);
				Class<Editor> clazz = (Class<Editor>) objClass;
				if (clazz != null){
					List<?> list =  editorBizService.findAll(clazz, sqlBuilder,json);
					JSONResponse(list);
				}
				else {
					throw new Exception("枚举类型不匹配");
				}
			}
		}
	}

	public void setClazzname(String clazzname) {
		this.clazzname = clazzname;
	}

	public String getClazzname() {
		return clazzname;
	}

	public void setNode(String node) {
		this.node = node;
	}

	public String getNode() {
		return node;
	}
}
