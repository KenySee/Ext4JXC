package com.keer.core.service.jms;

import javax.jms.Message;

import com.keer.core.bean.jms.CommandMessage;

/**
 * 发送消息接口
 * @author Administrator
 *
 */
public interface IMessageSender {

	public Boolean LoadMessage(IMessageSendCallback doBack) throws Exception;
	
	public Message BuildMessage(Message message, CommandMessage command) throws Exception;
}
