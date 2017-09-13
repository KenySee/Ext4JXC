package com.keer.core.service.jms;

import com.keer.core.bean.jms.CommandMessage;

/**
 * 消息命令执行接口
 * @author Administrator
 *
 */
public interface ICommandMessage {

	public void Execute(CommandMessage command) throws Exception;
}
