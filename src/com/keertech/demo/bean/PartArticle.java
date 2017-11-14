package com.keertech.demo.bean;

import com.keer.core.annotation.Description;
import com.keer.core.bean.base.GenericBean;
import com.keertech.demo.bean.enums.entity.ArticleType;
import com.keertech.demo.bean.enums.entity.ContentType;

import javax.persistence.*;
import java.util.Set;

/**
 * Created by hadoop on 2017/11/9.
 */
@Entity
@Table(name="part_article")
@Description(Name="文章")
public class PartArticle extends GenericBean {

    @Description(Name="匠人")
    @ManyToOne
    private PartArtist artist;

    @Description(Name="标题")
    private String title;

    @Enumerated(EnumType.STRING)
    @Column(length=50)
    @Description(Name="文章类型")
    private ArticleType articleType;

    @Description(Name="阅读数")
    private Integer readCount;

    @Description(Name="描述")
    private String description;

    @Description(Name="主图")
    private String coverImage;

    @Description(Name="文章内容")
    @OneToMany(mappedBy="article")
    private Set<PartArticleContent> contents;

    public ArticleType getArticleType() {
        return articleType;
    }

    public void setArticleType(ArticleType articleType) {
        this.articleType = articleType;
    }

    public Integer getReadCount() {
        return readCount;
    }

    public void setReadCount(Integer readCount) {
        this.readCount = readCount;
    }

    public String getCoverImage() {
        return coverImage;
    }

    public void setCoverImage(String coverImage) {
        this.coverImage = coverImage;
    }

    public PartArtist getArtist() {
        return artist;
    }

    public void setArtist(PartArtist artist) {
        this.artist = artist;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<PartArticleContent> getContents() {
        return contents;
    }

    public void setContents(Set<PartArticleContent> contents) {
        this.contents = contents;
    }
}
