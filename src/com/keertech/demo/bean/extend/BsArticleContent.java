package com.keertech.demo.bean.extend;

import com.keer.core.annotation.Description;
import com.keer.core.bean.base.EntityBean;
import com.keertech.demo.bean.enums.entity.ContentType;

import javax.persistence.*;

/**
 * Created by hadoop on 2017/11/9.
 */
@Entity
@Table(name="bs_article")
@Description(Name="文章内容")
public class BsArticleContent extends EntityBean {

    @Description(Name="文章")
    @ManyToOne
    private BsArticle article;

    @Enumerated(EnumType.STRING)
    @Column(length=10)
    @Description(Name="内容类型")
    private ContentType contentType;

    @Description(Name="类型值")
    private String contentValue;

    public BsArticle getArticle() {
        return article;
    }

    public void setArticle(BsArticle article) {
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

    @Override
    public Integer getVersion() {
        return null;
    }

    @Override
    public void setVersion(Integer version) {

    }
}
