package com.keer.core.bean.base;

import java.io.File;
import java.net.URLEncoder;

import javax.persistence.MappedSuperclass;
import javax.persistence.Transient;

import org.apache.commons.lang.StringUtils;

import com.keer.core.annotation.Description;
import com.keer.core.annotation.JsonTransient;
import com.keer.core.bean.IUploadBean;
import com.keer.core.service.impl.AbstractAttachmentBizServiceImpl;

@Description(Name="附件基础类")
@MappedSuperclass
@SuppressWarnings("serial")
public abstract class AbstractAttachment extends BaseBean implements IUploadBean {

	@Description(Name="关联ID")
	private String relationId;
	
	@Description(Name="关联类名")
	private String relationClazz;
	
	@Description(Name="上传文件路径")
	private String uploadPath;
	
	@Description(Name="上传文件名称")
	private String uploadName;
	
	@Description(Name="上传文件大小")
	private Long uploadSize;
	
	@Transient
	@Description(Name="FTP全路径")
	private String ftpUrlPath;
	
	@Transient
	@JsonTransient
	private File upload;
	
	public String getFtpUrlPath() throws Exception {
		if (ftpUrlPath == null){
			String name = this.getUploadName();
			String path = this.getUploadPath();
			String id = this.getId();
			if (StringUtils.isNotBlank(name)){
				Boolean encode = AbstractAttachmentBizServiceImpl.getEncodeUrl();
				if (encode){
					name = URLEncoder.encode(name,"GBK");
				}
				ftpUrlPath = String.format("%s/%s/[%s]_%s", AbstractAttachmentBizServiceImpl.getDownLoadUrl(),path,id,name);
			}
			else {
//				throw new Exception("文件不能为空");
			}
		}
		return ftpUrlPath;
	}

	public void setFtpUrlPath(String ftpUrlPath) {
		this.ftpUrlPath = ftpUrlPath;
	}

	public File getUpload() {
		return upload;
	}

	public void setUpload(File upload) {
		this.upload = upload;
	}

	public String getRelationId() {
		return relationId;
	}

	public void setRelationId(String relationId) {
		this.relationId = relationId;
	}

	public String getRelationClazz() {
		return relationClazz;
	}

	public void setRelationClazz(String relationClazz) {
		this.relationClazz = relationClazz;
	}

	public String getUploadPath() {
		return uploadPath;
	}

	public void setUploadPath(String uploadPath) {
		this.uploadPath = uploadPath;
	}

	public Long getUploadSize() {
		return uploadSize;
	}

	public void setUploadSize(Long uploadSize) {
		this.uploadSize = uploadSize;
	}

	public String getUploadName() {
		return uploadName;
	}

	public void setUploadName(String uploadName) {
		this.uploadName = uploadName;
	}
}
