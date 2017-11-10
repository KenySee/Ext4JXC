package com.keertech.demo.bean;

import com.keer.core.annotation.Description;
import com.keer.core.bean.base.GenericBean;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
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

    @Description(Name="描述")
    private String description;

    @Description(Name="主图")
    private String coverImage;

    @Description(Name="文章内容")
    @OneToMany(mappedBy="article")
    private Set<PartArticleContent> contents;

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
