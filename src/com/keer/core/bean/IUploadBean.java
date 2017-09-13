package com.keer.core.bean;

import java.io.File;

public interface IUploadBean {

	public File getUpload();
	
	public void setUpload(File file);
	
	public void setUploadSize(Long size);
	
	public String getUploadPath();
	
	public void setFtpUrlPath(String ftpUrlPath);
	
	public String getUploadName();
	
	public void setUploadName(String ftpFileName);	
}
