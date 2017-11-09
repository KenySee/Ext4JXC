package com.keertech.demo.bean.extend;

import com.keer.core.annotation.Description;
import com.singularsys.jep.functions.Str;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * Created by hadoop on 2017/11/9.
 */
@Entity
@Table(name="bs_work")
@Description(Name="作品")
public class BsWork {

    @Description(Name="作品名称")
    private String name;

    @Description(Name="作品主图")
    private String coverImg;

}
