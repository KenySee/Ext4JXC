package com.keer.core.service.jms;

import com.keer.core.bean.jms.CommandMessage;

/**
 * 消息处理接口
 * @author Administrator
 *
 */
public interface IMessageHandler {
	
	public void ProduceMessage(CommandMessage message) throws Exception;

	public void ConsumeMessage(CommandMessage message) throws Exception;	
}