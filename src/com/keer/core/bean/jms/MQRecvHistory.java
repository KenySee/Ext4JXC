package com.keer.core.bean.jms;


import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * 接收历史消息实体
 * @author 周方明
 *
 */
@Entity
@Table(name="ts_mq_recv_history")
@SuppressWarnings({ "serial"})
public class MQRecvHistory extends CommandMessage{

	public MQRecvHistory(){
		
	}
	public MQRecvHistory(String queueName,String commandName, String jsonData){
		super(queueName,commandName,jsonData);
	}
}
