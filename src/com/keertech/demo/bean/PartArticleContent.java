package com.keertech.demo.bean;

import com.keer.core.annotation.Description;
import com.keer.core.bean.base.GenericBean;
import com.keertech.demo.bean.enums.entity.ContentType;

import javax.persistence.*;

/**
 * Created by hadoop on 2017/11/9.
 */
@Entity
@Table(name="part_article_content")
@Description(Name="文章内容")
public class PartArticleContent extends GenericBean {

    @Description(Name="文章")
    @ManyToOne
    private PartArticle article;

    @Enumerated(EnumType.STRING)
    @Column(length=10)
    @Description(Name="内容类型")
    private ContentType contentType;

    @Description(Name="类型值")
    private String contentValue;

    @Description(Name="内容序号")
    private Integer contentIndex;


    public PartArticle getArticle() {
        return article;
    }

    public void setArticle(PartArticle article) {
        this.article = article;
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
