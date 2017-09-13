package com.keertech.demo.bean.extend;

import javax.persistence.Entity;

import com.keer.core.annotation.Description;
import com.keer.core.bean.organization.Corporation;

@Entity
@Description(Name="公司",Icon="folder_home")
@SuppressWarnings("serial")
public class GenericCorporation extends Corporation {
	
}
