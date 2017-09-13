package com.keer.core.service.jms;

import javax.jms.MessageListener;

import com.keer.core.bean.jms.CommandMessage;
import com.keer.core.service.IGenericBizService;

public interface IDefaultMessageManager extends IGenericBizService<CommandMessage> ,
												IMessageHandler,
												IMessageSender,
												MessageListener {

}
