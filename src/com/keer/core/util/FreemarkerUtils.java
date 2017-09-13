package com.keer.core.util;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStreamWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Properties;

import com.keer.core.bean.model.EntityModel;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;

public class FreemarkerUtils {

	protected static final String uiPath;
	protected static final String javaPath;
	protected static final String tplPath;
	protected static final String storePath;
	protected static final String selwinPath;
	public static final String reportPath;
	static {
		InputStream is = FreemarkerUtils.class.getClassLoader().getResourceAsStream("app.properties");
		Properties properties = new Properties();
		try {
			properties.load(is);
			uiPath = properties.getProperty("uiPath");
			javaPath = properties.getProperty("javaPath");
			tplPath = properties.getProperty("tplPath");
			storePath = properties.getProperty("storePath");
			selwinPath = properties.getProperty("selwinPath");
			reportPath = properties.getProperty("reportPath");
		}catch (Exception e) {
			throw new RuntimeException(e);
		}		
	}
	public static void BuildJava(EntityModel model) throws IOException, TemplateException {
		FreemarkerUtils.doBuildJava(model, false, false);
	}
	
	public static void doBuildJava(EntityModel bean,Boolean coverAction,Boolean coverService)  throws IOException, TemplateException{
		String packgePath = bean.getJavafolder().replace('.', '/');
		String srcPath = javaPath + "/"+packgePath;
		String ftlPath = tplPath + "/java";
		String javaPath = "java";
		Map<String, String> ftlMap = new HashMap<String, String>();
		List<String> strList = FileManageUtil.getFiles(ftlPath);
		for(String str : strList){
			if (str.lastIndexOf(".svn") == -1 && str.lastIndexOf(".ftl") != -1){
				int index = str.lastIndexOf(javaPath);
				String tmpFolder = str.substring(index + javaPath.length()).replace('\\', '/');
				String appFolder = tmpFolder.replace(".ftl", ".java").replace("Class", bean.getAppfolder());
				String sumFolder = srcPath+appFolder;
				if (FileManageUtil.CreateFile(sumFolder)){
					ftlMap.put(tmpFolder, sumFolder);
				}
				else {
					int lastIndex = appFolder.lastIndexOf('/');
					if (lastIndex != -1){
						String lastFile = appFolder.substring(lastIndex+1);
						if (lastFile.endsWith("Action.java") && coverAction){
							ftlMap.put(tmpFolder, sumFolder);
						}
						else if (lastFile.endsWith("BizService.java") && coverService){
							ftlMap.put(tmpFolder, sumFolder);
						}
						else if (lastFile.endsWith("BizServiceImpl.java") && coverService){
							ftlMap.put(tmpFolder, sumFolder);
						}
					}
				}
			}
		}
		Configuration cfg = new Configuration();
		cfg.setEncoding(Locale.getDefault(), "utf-8");
		cfg.setDirectoryForTemplateLoading(new File(ftlPath));
		for(String ftl : ftlMap.keySet()){
			String app = ftlMap.get(ftl);
			try{
				Template template = cfg.getTemplate(ftl);
				template.setEncoding("utf-8");
				BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(app),"UTF-8"));
				template.process(bean, writer);
				writer.flush();
				writer.close();
			} catch (Exception e) {
				e.printStackTrace();
				FileManageUtil.deleteFile(app);
			}
		}
	}
	
	public static void BuildExtjs(EntityModel model) throws IOException, TemplateException {
		FreemarkerUtils.doBuildExtjs(model,false,false,false,false,false,false,false,false,false,false,false);
	}
	
	public static void doBuildExtjs(EntityModel bean,
			Boolean mainContainer,
			Boolean mainController, 
			Boolean childContainer,
			Boolean childController,
			Boolean editWindow, 
			Boolean editController,
			Boolean findWindow,
			Boolean findController,
			Boolean store,
			Boolean model,
			Boolean allWrite) throws IOException, TemplateException {
		String upFolder = bean.getUpfolder();
		
		/**
		 * 生成UI
		 */
		String findFolder = "extjs_ui";
		String ftlPath = String.format("%s/%s",tplPath,findFolder);
		String xuiPath = String.format("%s/%s/%s",uiPath,upFolder.replace('.', '/'),bean.getAppfolder());
		
		List<String> strList = FileManageUtil.getFiles(ftlPath);
		Map<String, String> ftlMap = new HashMap<String, String>();
		for(String str : strList){
			if (!mainContainer && str.lastIndexOf("MainContainer") > 0){
				continue;
			}
			if(!mainController && str.lastIndexOf("MainController") > 0){
				continue;
			}
			if(!childContainer && str.lastIndexOf("ChildContainer") > 0){
				continue;
			}
			if(!childController && str.lastIndexOf("ChildController") > 0){
				continue;
			}
			if(!editWindow && str.lastIndexOf("EditWindow") > 0){
				continue;
			}
			if(!editController && str.lastIndexOf("EditController") > 0){
				continue;
			}
			if(!findWindow && str.lastIndexOf("FindWindow") > 0){
				continue;
			}
			if(!findController && str.lastIndexOf("FindController") > 0){
				continue;
			}
			if (str.lastIndexOf(".svn") == -1 && str.lastIndexOf(".ftl") != -1){
				int index = str.lastIndexOf(findFolder);
				String tmpFolder = str.substring(index + findFolder.length()).replace('\\', '/');
				String appFolder = tmpFolder.replaceAll(".ftl", ".js");
				String sumFolder = xuiPath+appFolder;
				if (FileManageUtil.CreateFile(sumFolder) || allWrite){
					ftlMap.put(tmpFolder, sumFolder);
				}
			}
		}
		Configuration cfg = new Configuration();
		cfg.setEncoding(Locale.getDefault(), "utf-8");
		cfg.setDirectoryForTemplateLoading(new File(ftlPath));
		for(String ftl : ftlMap.keySet()){
			String app = ftlMap.get(ftl);
			try{
				Template template = cfg.getTemplate(ftl);
				template.setEncoding("utf-8");
				BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(app),"UTF-8"));
				template.process(bean, writer);
				writer.flush();
				writer.close();
			} catch (Exception e) {
				e.printStackTrace();
				FileManageUtil.deleteFile(app);
			}
		}
		
		
		/**
		 * 生成Store
		 */
		findFolder = "extjs_store";
		ftlPath = String.format("%s/%s",tplPath,findFolder);
		xuiPath = String.format("%s/%s",storePath,bean.getAppfolder());
		
		strList = FileManageUtil.getFiles(ftlPath);
		ftlMap = new HashMap<String, String>();
		for(String str : strList){
			if(!store && str.lastIndexOf("Store") > 0){
				continue;
			}
			if(!model && str.lastIndexOf("Model") > 0){
				continue;
			}
			if (str.lastIndexOf(".svn") == -1 && str.lastIndexOf(".ftl") != -1){
				int index = str.lastIndexOf(findFolder);
				String tmpFolder = str.substring(index + findFolder.length()).replace('\\', '/');
				String appFolder = tmpFolder.replaceAll(".ftl", ".js");
				String sumFolder = xuiPath+appFolder;
				if (FileManageUtil.CreateFile(sumFolder) || allWrite){
					ftlMap.put(tmpFolder, sumFolder);
				}
			}
		}
		cfg = new Configuration();
		cfg.setEncoding(Locale.getDefault(), "utf-8");
		cfg.setDirectoryForTemplateLoading(new File(ftlPath));
		for(String ftl : ftlMap.keySet()){
			String app = ftlMap.get(ftl);
			try{
				Template template = cfg.getTemplate(ftl);
				template.setEncoding("utf-8");
				BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(app),"UTF-8"));
				template.process(bean, writer);
				writer.flush();
				writer.close();
			} catch (Exception e) {
				e.printStackTrace();
				FileManageUtil.deleteFile(app);
			}
		}
		
		/**
		 * 生成selwin
		 */
		findFolder = "extjs_selwin";
		ftlPath = String.format("%s/%s",tplPath,findFolder);
		xuiPath = String.format("%s/%s",selwinPath,bean.getAppfolder());
		
		strList = FileManageUtil.getFiles(ftlPath);
		ftlMap = new HashMap<String, String>();
		for(String str : strList){
			if (str.lastIndexOf(".svn") == -1 && str.lastIndexOf(".ftl") != -1){
				int index = str.lastIndexOf(findFolder);
				String tmpFolder = str.substring(index + findFolder.length()).replace('\\', '/');
				String appFolder = tmpFolder.replaceAll(".ftl", ".js");
				String sumFolder = xuiPath+appFolder;
				if (FileManageUtil.CreateFile(sumFolder)){
					ftlMap.put(tmpFolder, sumFolder);
				}
			}
		}
		cfg = new Configuration();
		cfg.setEncoding(Locale.getDefault(), "utf-8");
		cfg.setDirectoryForTemplateLoading(new File(ftlPath));
		for(String ftl : ftlMap.keySet()){
			String app = ftlMap.get(ftl);
			try{
				Template template = cfg.getTemplate(ftl);
				template.setEncoding("utf-8");
				BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(app),"UTF-8"));
				template.process(bean, writer);
				writer.flush();
				writer.close();
			} catch (Exception e) {
				e.printStackTrace();
				FileManageUtil.deleteFile(app);
			}
		}
		
	}
}
