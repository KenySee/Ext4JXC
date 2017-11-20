package com.keertech.demo.bean;

import com.keer.core.annotation.Description;
import com.keer.core.bean.base.GenericBean;
import com.keertech.demo.bean.PartArticle;
import com.keertech.demo.bean.enums.entity.ContentType;
import org.hibernate.annotations.Type;

import javax.persistence.*;

/**
 * Created by hadoop on 2017/11/9.
 */
@Entity
@Table(name="part_story_content")
@Description(Name="故事内容")
public class PartStoryContent extends GenericBean {

    @Description(Name="故事")
    @ManyToOne
    private PartStory story;

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

    public PartStory getStory() {
        return story;
    }

    public void setStory(PartStory story) {
        this.story = story;
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
