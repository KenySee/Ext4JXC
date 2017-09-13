package com.keertech.demo.bean.extend;

import javax.persistence.Entity;

import com.keer.core.annotation.Description;
import com.keer.core.bean.base.Post;

@Entity
@Description(Name="岗位",Icon="status_online")
@SuppressWarnings("serial")
public class GenericPost extends Post {

}
