package com.keertech.demo.bean;

import com.keer.core.annotation.Description;
import com.keer.core.bean.base.BaseBean;
import com.keer.core.bean.base.GenericBean;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name="part_home_swiper")
@Description(Name="首页轮播")
public class PartHomeSwiper extends BaseBean {

    @Description(Name="图片地址")
    private String coverImg;

    @Description(Name="链接地址")
    private String pathUrl;

    @Description(Name="轮播标题")
    private String title;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

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
