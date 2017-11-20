package com.keertech.demo.bean;

import com.keer.core.annotation.Description;
import com.keer.core.bean.base.GenericBean;
import com.keertech.demo.bean.enums.entity.ContentType;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name="part_work_content")
@Description(Name="作品详情")
public class PartWorkContent extends GenericBean {

    @Description(Name="作品")
    @ManyToOne
    private PartWork work;

    @Enumerated(EnumType.STRING)
    @Column(length=50)
    @Description(Name="内容类型")
    private ContentType contentType;

    @Description(Name="类型值")
    @Lob
    @Column(length=50000)
    @Type(type="org.springframework.orm.hibernate3.support.ClobStringType")
    private String contentValue;

    @Description(Name="内容序号")
    private Integer contentIndex;

    public PartWork getWork() {
        return work;
    }

    public void setWork(PartWork work) {
        this.work = work;
    }

    public ContentType getContentType() {
        return contentType;
    }

    public void setContentType(ContentType contentType) {
        this.contentType = contentType;
    }

    public String getContentValue() {
        return contentValue;
    }

    public void setContentValue(String contentValue) {
        this.contentValue = contentValue;
    }

    public Integer getContentIndex() {
        return contentIndex;
    }

    public void setContentIndex(Integer contentIndex) {
        this.contentIndex = contentIndex;
    }
}
