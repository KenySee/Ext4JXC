package com.keer.core.service.jms;

import javax.jms.Message;

import com.keer.core.bean.jms.CommandMessage;

public interface IMessageMapping {

	public Message buildMessage(Message message,CommandMessage buffer) throws Exception;
	
	public CommandMessage buildBuffer(Message message,CommandMessage buffer) throws Exception;
}
