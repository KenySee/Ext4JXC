package com.keertech.demo.bean;

import com.keer.core.annotation.Description;
import com.keer.core.bean.base.GenericBean;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name="part_home_swiper")
@Description(Name="首页轮播")
public class PartHomeSwiper extends GenericBean {

    @Description(Name="图片地址")
    private String coverImg;

    @Description(Name="链接地址")
    private String pathUrl;

    public String getCoverImg() {
        return coverImg;
    }

    public void setCoverImg(String coverImg) {
        this.coverImg = coverImg;
    }

    public String getPathUrl() {
        return pathUrl;
    }

    public void setPathUrl(String pathUrl) {
        this.pathUrl = pathUrl;
    }
}
