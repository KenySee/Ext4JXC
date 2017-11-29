package com.keertech.demo.bean;

import com.keer.core.annotation.Description;
import com.keer.core.bean.base.GenericBean;
import com.keertech.demo.bean.enums.entity.ContentType;
import com.keertech.demo.bean.enums.entity.LoftType;
import org.hibernate.annotations.Type;

import javax.persistence.*;

@Entity
@Table(name="part_home_page")
@Description(Name="首页信息")
public class PartHomePage extends GenericBean{

    @Enumerated(EnumType.STRING)
    @Column(length=50)
    @Description(Name="楼层")
    private LoftType loftType;

    @Description(Name="匠人")
    @ManyToOne
    private PartArtist artist;

    @Description(Name="标题")
    private String titleText;

    @Description(Name="内容")
    @Lob
    @Column(length=5000)
    @Type(type="org.springframework.orm.hibernate3.support.ClobStringType")
    private String contentText;

    public LoftType getLoftType() {
        return loftType;
    }

    public void setLoftType(LoftType loftType) {
        this.loftType = loftType;
    }

    public PartArtist getArtist() {
        return artist;
    }

    public void setArtist(PartArtist artist) {
        this.artist = artist;
    }

    public String getTitleText() {
        return titleText;
    }

    public void setTitleText(String titleText) {
        this.titleText = titleText;
    }

    public String getContentText() {
        return contentText;
    }

    public void setContentText(String contentText) {
        this.contentText = contentText;
    }
}
