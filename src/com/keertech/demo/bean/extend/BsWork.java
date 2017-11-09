package com.keertech.demo.bean.extend;

import com.keer.core.annotation.Description;
import com.keer.core.bean.base.BaseBean;
import com.singularsys.jep.functions.Str;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.Set;

/**
 * Created by hadoop on 2017/11/9.
 */
@Entity
@Table(name="bs_work")
@Description(Name="作品")
public class BsWork extends BaseBean{

    @Description(Name="匠人")
    private BsArtist artist;

    @Description(Name="作品名称")
    private String name;

    @Description(Name="作品主图")
    private String coverImg;

    @Description(Name="点击率")
    private Integer hotCount;

    @Description(Name="作品规格")
    @OneToMany(mappedBy="work")
    private Set<BsWorkSpecification> specifications;

    public BsArtist getArtist() {
        return artist;
    }

    public void setArtist(BsArtist artist) {
        this.artist = artist;
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public void setName(String name) {
        this.name = name;
    }

    public String getCoverImg() {
        return coverImg;
    }

    public void setCoverImg(String coverImg) {
        this.coverImg = coverImg;
    }

    public Integer getHotCount() {
        return hotCount;
    }

    public void setHotCount(Integer hotCount) {
        this.hotCount = hotCount;
    }

    public Set<BsWorkSpecification> getSpecifications() {
        return specifications;
    }

    public void setSpecifications(Set<BsWorkSpecification> specifications) {
        this.specifications = specifications;
    }
}
