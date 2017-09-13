package com.keer.core.bean.jms;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * 接收消息实体类
 * @author 周方明
 *
 */
@Entity
@Table(name="ts_mq_recv_buffer")
@SuppressWarnings("serial")
public class MQRecvBuffer extends CommandMessage{

	public MQRecvBuffer(){}
	
	public MQRecvBuffer(String queueName,String commandName, String jsonData){
		super(queueName,commandName,jsonData);
	}
}
