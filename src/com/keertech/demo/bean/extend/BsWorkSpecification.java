package com.keertech.demo.bean.extend;

import com.keer.core.annotation.Description;
import com.keer.core.bean.base.EntityBean;
import com.keer.core.bean.menu.Menu;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * Created by hadoop on 2017/11/9.
 */
@Entity
@Table(name="bs_work_specification")
@Description(Name="作品属性")
public class BsWorkSpecification extends EntityBean {

    @Description(Name="作品")
    @ManyToOne
    private BsWork work;

    @Description(Name="属性名")
    private String labelName;

    @Description(Name="属性值")
    private String valueName;

    public BsWork getWork() {
        return work;
    }

    public void setWork(BsWork work) {
        this.work = work;
    }

    public String getLabelName() {
        return labelName;
    }

    public void setLabelName(String labelName) {
        this.labelName = labelName;
    }

    public String getValueName() {
        return valueName;
    }

    public void setValueName(String valueName) {
        this.valueName = valueName;
    }

    public Integer getVersion() {
        return null;
    }
    public void setVersion(Integer version) {  }
}
