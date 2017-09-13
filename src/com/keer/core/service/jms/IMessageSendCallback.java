package com.keer.core.service.jms;

import com.keer.core.bean.jms.CommandMessage;

/**
 * 发送消息回调接口
 * @author Administrator
 *
 */
public interface IMessageSendCallback {

	public void doInSendMessage(CommandMessage command) throws Exception;
}
