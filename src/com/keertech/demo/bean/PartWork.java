package com.keertech.demo.bean;

import com.keer.core.annotation.Description;
import com.keer.core.bean.base.GenericBean;

import javax.persistence.*;
import java.util.Set;

/**
 * Created by hadoop on 2017/11/9.
 */
@Entity
@Table(name="part_work")
@Description(Name="作品")
public class PartWork extends GenericBean {

    @Description(Name="匠人")
    @ManyToOne
    private PartArtist artist;

    @Description(Name="作品名称")
    private String workName;

    @Description(Name="作品主图")
    private String coverImg;

    @Description(Name="点击率")
    private Integer hotCount;

    @Description(Name="作品介绍")
    private String description;

    @Description(Name="作品规格")
    @OneToMany(mappedBy="work")
    private Set<PartWorkSpecification> specifications;

    public PartArtist getArtist() {
        return artist;
    }

    public void setArtist(PartArtist artist) {
        this.artist = artist;
    }

    public String getWorkName() {
        return workName;
    }

    public void setWorkName(String workName) {
        this.workName = workName;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setHotCount(Integer hotCount) {
        this.hotCount = hotCount;
    }

    public Set<PartWorkSpecification> getSpecifications() {
        return specifications;
    }

    public void setSpecifications(Set<PartWorkSpecification> specifications) {
        this.specifications = specifications;
    }
}
