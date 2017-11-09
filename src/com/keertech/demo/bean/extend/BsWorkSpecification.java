package com.keertech.demo.bean.extend;

import com.keer.core.annotation.Description;
import com.keer.core.bean.base.EntityBean;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * Created by hadoop on 2017/11/9.
 */
@Entity
@Table(name="bs_work")
@Description(Name="作品属性")
public class BsWorkSpecification extends EntityBean {

    public Integer getVersion() {
        return null;
    }
    public void setVersion(Integer version) {

    }
}
