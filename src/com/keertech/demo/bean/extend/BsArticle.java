package com.keertech.demo.bean.extend;

import com.keer.core.annotation.Description;
import com.keer.core.bean.base.BaseBean;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * Created by hadoop on 2017/11/9.
 */
@Entity
@Table(name="bs_article")
@Description(Name="文章")
public class BsArticle extends BaseBean {

    @Description(Name="匠人")
    @ManyToOne
    private BsArtist artist;

    @Description(Name="标题")
    private String title;

    @Description(Name="描述")
    private String description;

    public BsArtist getArtist() {
        return artist;
    }

    public void setArtist(BsArtist artist) {
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
}
