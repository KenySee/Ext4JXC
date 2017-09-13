package com.keer.core.util;

import java.lang.reflect.Modifier;
import java.util.HashSet;
import java.util.Set;

public class DefineClass {
	public DefineClass(Class<?> clazz, String description, String icon, String parent, Integer sort){
		this.clazz = clazz;
		this.icon = icon;
		this.sort = sort;
		this.parent = parent;
		this.description = description;
		this.clazzname = clazz.getName();
		this.isAbstract = Modifier.isAbstract(clazz.getModifiers());
	}
	private Class<?> clazz;
	private String description;
	private String clazzname;
	private String parent;
	private String icon;
	private Integer sort;
	private Set<DefineClass> childs = new HashSet<DefineClass>();
	private Boolean isAbstract;
	
	/**
	 * 获取所有继承的实现类
	 * @return
	 */
	public Set<DefineClass> getAllConcreteDefine(){
		Set<DefineClass> items = new HashSet<DefineClass>();
		if (!this.isAbstract){
			items.add(this);
		}
		for (DefineClass child : childs) {
			items.addAll(child.getAllConcreteDefine());
		}
		return items;
	}
	public Set<DefineClass> getAllDefine(Integer nLevel){
		Set<DefineClass> items = new HashSet<DefineClass>();
		if (nLevel == 0){
			items.add(this);
		}
		for (DefineClass child : childs) {
			items.addAll(child.getAllDefine(nLevel-1));
		}
		return items;
	}
	public Set<DefineClass> getAllDefine(){
		Set<DefineClass> items = new HashSet<DefineClass>();
		items.add(this);
		for (DefineClass child : childs) {
			items.addAll(child.getAllDefine());
		}
		return items;
	}
	public void setClazz(Class<?> clazz) {
		this.clazz = clazz;
	}
	public Class<?> getClazz() {
		return clazz;
	}
	public void setChilds(Set<DefineClass> childs) {
		this.childs = childs;
	}
	public Set<DefineClass> getChilds() {
		return childs;
	}
	public void addChild(DefineClass child){
		this.childs.add(child);
	}
	
	public DefineClass findDefine(Class<?> clazz){
		if (this.clazz.equals(clazz)){
			return this;
		}
		for(DefineClass dc : getChilds()){
			DefineClass def = dc.findDefine(clazz);
			if (def != null){
				return def;
			}
		}
		return null;
	}
	
	public Set<DefineClass> findAllChild(){
		Set<DefineClass> allList = new HashSet<DefineClass>();
		for(DefineClass dc : getChilds()){
			allList.add(dc);
			allList.addAll(dc.findAllChild());
		}
		return allList;
	}
	
	public void printAllChild(){
		System.out.println(this.getDescription());
		for(DefineClass dc : getChilds()){
			dc.printAllChild();
		}
	}
	public void setIsAbstract(Boolean isAbstract) {
		this.isAbstract = isAbstract;
	}
	public Boolean getIsAbstract() {
		return isAbstract;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getDescription() {
		return description;
	}

	public void setClazzname(String clazzname) {
		this.clazzname = clazzname;
	}

	public String getClazzname() {
		return clazzname;
	}
	public String getIcon() {
		return icon;
	}
	public void setIcon(String icon) {
		this.icon = icon;
	}
	public String getParent() {
		return parent;
	}
	public void setParent(String parent) {
		this.parent = parent;
	}
	public Integer getSort() {
		return sort;
	}
	public void setSort(Integer sort) {
		this.sort = sort;
	}
}
