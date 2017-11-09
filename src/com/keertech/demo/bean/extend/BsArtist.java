package com.keertech.demo.bean.extend;

import com.keer.core.annotation.Description;
import com.keer.core.bean.base.BaseBean;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.Set;

/**
 * Created by hadoop on 2017/11/9.
 */
@Entity
@Table(name="bs_artist")
@Description(Name="匠人")
public class BsArtist extends BaseBean {

    @Description(Name="匠人名称")
    private String nickname;

    @Description(Name="个人图像")
    private String headUrl;

    @Description(Name="个性签名")
    private String signature;

    @Description(Name="匠人介绍")
    private String description;

    @Description(Name="作品集")
    @OneToMany(mappedBy="work")
    private Set<BsWork> works;

    public Set<BsWork> getWorks() {
        return works;
    }

    public void setWorks(Set<BsWork> works) {
        this.works = works;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getHeadUrl() {
        return headUrl;
    }

    public void setHeadUrl(String headUrl) {
        this.headUrl = headUrl;
    }

    public String getSignature() {
        return signature;
    }

    public void setSignature(String signature) {
        this.signature = signature;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
