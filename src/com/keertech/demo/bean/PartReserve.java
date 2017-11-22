package com.keertech.demo.bean;

import com.keer.core.annotation.Description;
import com.keer.core.bean.base.BaseBean;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * Created by hadoop on 2017/11/22.
 */

@Entity
@Table(name="part_reserve")
@Description(Name="用户预订表")
public class PartReserve  extends BaseBean {
    @Description(Name="用户名称")
    private String userName;

    @Description(Name="手机号码")
    private String userMobile;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserMobile() {
        return userMobile;
    }

    public void setUserMobile(String userMobile) {
        this.userMobile = userMobile;
    }
}
