package com.keer.core.bean.resource;

import java.util.List;
import java.util.Set;

import javax.persistence.Entity;

import com.keer.core.annotation.Description;
import com.keer.core.bean.IResource;

/**
 * 资源包抽象类
 * @author 周方明
 *
 * @param <T>
 */
@Entity
@Description(Name="打包资源")
@SuppressWarnings({ "serial" })
public abstract class BundleResource<T extends IResource> extends DataResource {

	public abstract Set<T> getResources();
	
	/**
	 * 添加资源
	 * @param resource
	 */
	public abstract void addResource(IResource resource);
	
	/**
	 * 当前签名
	 */
	@Description(Name="当前签名")
	private String signature;
	
	/**
	 * 验证签名
	 * @param bean
	 * @return
	 */
	public abstract Boolean checkSignature(T bean);
	
	/**
	 * 获取签名列表
	 * @return
	 */
	public abstract List<String> getSignatureList();
	

	public void setSignature(String signature) {
		this.signature = signature;
	}

	public String getSignature() {
		return signature;
	}
}
