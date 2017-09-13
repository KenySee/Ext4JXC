package com.keertech.demo.bean.extend;

import javax.persistence.Entity;

import com.keer.core.annotation.Description;
import com.keer.core.bean.organization.Department;

@Entity
@Description(Name="部门",Icon="folder_key")
@SuppressWarnings("serial")
public class GenericDepartment extends Department {

}
