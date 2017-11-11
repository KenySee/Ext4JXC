package com.keertech.demo.action;
import com.google.gson.Gson;
import com.keer.core.annotation.Permission;
import com.keer.core.dao.SQLBuilder;
import com.qiniu.common.Zone;
import com.qiniu.http.Response;
import com.qiniu.storage.Configuration;
import com.qiniu.storage.UploadManager;
import com.qiniu.storage.model.DefaultPutRet;
import com.qiniu.util.Auth;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;

import com.keertech.demo.bean.PartArtist;
import com.keertech.demo.service.IPartArtistBizService;
import com.keer.core.annotation.Description;
import com.keer.core.base.CRUDAction;
import com.keer.core.bean.base.JSONBean;

@Description(Name="匠人")
@Action("PartArtistAction")
@SuppressWarnings({"serial","rawtypes"})
public class PartArtistAction extends CRUDAction<PartArtist> {

	String accessKey = "wjwYxf8h5jQOC8QrWhnoBBXNdczuSiMzKycJB5WN";
	String secretKey = "lOei7RqoxaGGUBdO48G2f20EdCRa0SZWMYOO8xM2";
	String bucket = "zallhy-gam";
	Auth auth = Auth.create(accessKey, secretKey);
	Configuration cfg = new Configuration(Zone.zone0());
	UploadManager uploadManager = new UploadManager(cfg);
	@Autowired
	private IPartArtistBizService partArtistBizService;
	
	@Override
	public JSONBean bizDefaultBean(JSONBean bean) throws Exception {
		return bean;
	}
	@Permission(action="ADD",desc="编辑")
	public void uploadArit() throws Exception {
//		Configuration cfg = new Configuration(Zone.zone0());
//		UploadManager uploadManager = new UploadManager(cfg);
//		String localFilePath = "/Users/hadoop/Desktop/img_07.png";
		String upToken = auth.uploadToken(bucket);
		String key = null;
		Response response = uploadManager.put(upload.getAbsolutePath(), key, upToken);
		DefaultPutRet putRet = new Gson().fromJson(response.bodyString(), DefaultPutRet.class);
		response(String.format("{\"success\":true,\"url\":\"https://gam.zallhy.com/%s\"}",putRet.key));
	}
	@Override
	public void buildFilterString(Class<JSONBean> clazz, SQLBuilder builder) throws Exception {
		String beanName = clazz.getSimpleName();
		if (beanName.equals("PartArtist")){
		}
	}
}
