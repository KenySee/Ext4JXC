package com.keer.core.util;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.InitializingBean;

import com.keer.core.annotation.Description;
import com.keer.core.bean.base.AbstractBean;
import com.keer.core.bean.enums.IEnumRender;
import com.keer.core.bean.enums.IEnums;
import com.keer.core.util.CacheLoaderUtil;
import com.keer.core.util.ScanClassUtil;
import com.keer.core.util.bean.Stack;

public class ClassInitializeManager implements InitializingBean{

	private List<String> packagesToScan = new ArrayList<String>();

	public void setPackagesToScan(List<String> packagesToScan) {
		this.packagesToScan = packagesToScan;
	}
	public List<String> getPackagesToScan() {
		return packagesToScan;
	}
	
	
	public void afterPropertiesSet() throws Exception {
		DefineClass beanroot = new DefineClass(AbstractBean.class,AbstractBean.class.getName(),"","",0);
		CacheLoaderUtil.setDefineClass(AbstractBean.class, beanroot);
		DefineClass enumroot = new DefineClass(IEnums.class,IEnums.class.getName(),"","",0);
		CacheLoaderUtil.setDefineClass(IEnums.class, enumroot);
		Stack<Class<?>> stack = new Stack<Class<?>>(10);
		if (this.packagesToScan != null && this.packagesToScan.size() > 0){
			for(String pack : this.packagesToScan){
				for(Class<?> clazz : ScanClassUtil.getClasses(pack)){
					if (clazz.isInterface()){
						continue;
					}
					if (AbstractBean.class.isAssignableFrom(clazz)){
						stack.clear();
						for(Class<?> sc = clazz; (sc != null); sc = sc.getSuperclass()){
							DefineClass find = beanroot.findDefine(sc);
							if (find != null){
								DefineClass parent = find;
								while(!stack.isEmpty()){
									Class<?> pop = stack.pop();
									Description desc = pop.getAnnotation(Description.class);
									DefineClass define;
									if (desc != null){
										define = new DefineClass(pop,desc.Name(),desc.Icon(),desc.Parent(),desc.Sort());
									}
									else {
										define = new DefineClass(pop,pop.getName(),"","",0);
									}
									parent.addChild(define);
									parent = define;
									CacheLoaderUtil.setDefineClass(define.getClazz(), define);
								}
							}
							else {
								stack.push(sc);
							}
						}
					}
					else if (IEnums.class.isAssignableFrom(clazz)){
						Description desc = clazz.getAnnotation(Description.class);
						DefineClass define = new DefineClass(clazz,desc.Name(),desc.Icon(),desc.Parent(),desc.Sort());
						enumroot.addChild(define);
					}
					else if (IEnumRender.class.isAssignableFrom(clazz)){
						Description desc = clazz.getAnnotation(Description.class);
						DefineClass define = new DefineClass(clazz,desc.Name(),desc.Icon(),desc.Parent(),desc.Sort());
						enumroot.addChild(define);
					}
				}
			}
		}
//		root.printAllChild();
	}
}
