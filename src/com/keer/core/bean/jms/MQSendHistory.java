package com.keer.core.bean.jms;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * 发送历史消息实体类
 * @author 周方明
 *
 */
@Entity
@Table(name="ts_mq_send_history")
@SuppressWarnings({ "serial"})
public class MQSendHistory extends CommandMessage{

	public MQSendHistory(){
		
	}	
	public MQSendHistory(String queueName,String commandName, String jsonData){
		super(queueName,commandName,jsonData);
	}
}
