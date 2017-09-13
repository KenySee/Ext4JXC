package com.keer.core.bean.resource;

import java.util.List;
import java.util.Set;

import javax.persistence.Entity;

import com.keer.core.annotation.Description;
import com.keer.core.bean.IResource;
import com.keer.core.bean.organization.member.OrgMember;

@Entity
@Description(Name="组织成员资源")
@SuppressWarnings({ "rawtypes", "serial" })
public class OrgMemberResource extends BundleResource<OrgMember> {

	@Override
	public Set<OrgMember> getResources() {
		return null;
	}

	@Override
	public void addResource(IResource resource) {
		
	}

	@Override
	public Boolean checkSignature(OrgMember bean) {
		return null;
	}

	@Override
	public List<String> getSignatureList() {
		return null;
	}

	@Override
	public String getClazzparent() {
		return Resource.class.getName();
	}
}
