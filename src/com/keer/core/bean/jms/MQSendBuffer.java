package com.keer.core.bean.jms;


import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * 发送消息实体类
 * @author 周方明
 *
 */
@Entity
@Table(name="ts_mq_send_buffer")
@SuppressWarnings("serial")
public class MQSendBuffer extends CommandMessage{

	public MQSendBuffer(){
		
	}
	public MQSendBuffer(String queueName,String commandName, String jsonData){
		super(queueName,commandName,jsonData);
	}
}
