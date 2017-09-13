package com.keer.core.service.impl;

import java.io.FileInputStream;
import java.io.InputStream;
import java.util.Properties;

import org.apache.commons.lang.StringUtils;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.keer.core.bean.IUploadBean;
import com.keer.core.bean.base.AbstractAttachment;
import com.keer.core.dao.SQLBuilder;
import com.keer.core.service.IAbstractAttachmentBizService;
import com.keer.core.util.FTPClientUtil;

public abstract class AbstractAttachmentBizServiceImpl<T extends AbstractAttachment> extends AuthorityBizServiceImpl<T> implements IAbstractAttachmentBizService<T> {
	
	protected static String url;
	protected static Integer port;
	protected static String username;
	protected static String password;
	protected static String swfTools;
	protected static String downLoadUrl;
	protected static Boolean encodeUrl;
	static {
		InputStream is = AbstractAttachmentBizServiceImpl.class.getClassLoader().getResourceAsStream("ftpconfig.properties");
		Properties properties = new Properties();
		try {
			properties.load(is);
			url = properties.getProperty("url");
			port = Integer.parseInt(properties.getProperty("port"));
			downLoadUrl = properties.getProperty("downLoadUrl");
			encodeUrl = Boolean.parseBoolean(properties.getProperty("encodeUrl"));
			username = properties.getProperty("username");
			password = properties.getProperty("password");
			swfTools = properties.getProperty("swfTools");
		}catch (Exception e) {
			throw new RuntimeException(e);
		}		
	}
	public static String getDownLoadUrl(){
		return downLoadUrl;
	}
	
	public static Boolean getEncodeUrl(){
		return encodeUrl;
	}
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	public void delete(T bean, SQLBuilder builder) throws Exception {
		super.delete(bean,builder);
		if (bean instanceof IUploadBean){
			IUploadBean upload = (IUploadBean)bean;
			String name = upload.getUploadName();
			String path = upload.getUploadPath();
			if (StringUtils.isNotBlank(name)){
				name = String.format("[%s]_%s", bean.getId(),name);
				Boolean succ = FTPClientUtil.removeFile(url, port, username, password, path, name);
				if (!succ){
					throw new Exception("删除FTP文件失败");
				}
			}
			else {
				throw new Exception("FTP文件不能为空");
			}
		}
	}
	
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	public void save(T bean, SQLBuilder builder) throws Exception {
		super.save(bean,builder);
		if (bean instanceof IUploadBean){
			IUploadBean upload = (IUploadBean)bean;
			if (upload.getUpload() != null){
				String name = upload.getUploadName();
				String path = upload.getUploadPath();
				if (StringUtils.isNotBlank(name)){
					name = String.format("[%s]_%s", bean.getId(),name);
					FileInputStream input = new FileInputStream(upload.getUpload());
					Boolean succ = FTPClientUtil.uploadFile(url, port, username, password, path, name, input);
					if (!succ){
						throw new Exception("上传FTP失败");
					}
				}
				else {
					throw new Exception("FTP文件不能为空");
				}
			}
		}		
	}
	public void removeFtpFileByURL(String fptUrlPath) throws Exception{
		Integer index = fptUrlPath.indexOf("/com");
		String path = fptUrlPath.substring(index+1);
		index = path.lastIndexOf('/');
		String name = path.substring(index+1);
		path = path.substring(0,index);
		Boolean succ = FTPClientUtil.removeFile(url, port, username, password, path, name);
		if (!succ){
			throw new Exception("删除FTP文件失败");
		}
	}
	
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	public void update(T bean, SQLBuilder builder) throws Exception {
		super.update(bean,builder);
		if (bean instanceof AbstractAttachment){
			AbstractAttachment upload = (AbstractAttachment)bean;
			if (upload.getUpload() != null){
				String name = upload.getUploadName();
				String path = upload.getUploadPath();
				String urlString = String.format("ftp://%s/%s/%s", url,path,name);
				String fptString = upload.getFtpUrlPath();
				if (!urlString.equals(fptString)){
					if (StringUtils.isNotBlank(name)){
						this.removeFtpFileByURL(fptString);
						name = String.format("[%s]_%s", bean.getId(),name);
						FileInputStream input = new FileInputStream(upload.getUpload());
						Boolean succ = FTPClientUtil.uploadFile(url, port, username, password, path, name, input);
						if (!succ){
							throw new Exception("上传FTP失败");
						}
					}
					else {
						throw new Exception("FTP文件不能为空");
					}
				}
			}
		}	
	}
}
