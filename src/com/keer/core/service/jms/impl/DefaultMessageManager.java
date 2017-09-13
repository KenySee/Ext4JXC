package com.keer.core.service.jms.impl;

import java.util.Date;
import java.util.List;

import javax.jms.JMSException;
import javax.jms.Message;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.keer.core.bean.enums.CommandStatus;
import com.keer.core.bean.jms.CommandMessage;
import com.keer.core.bean.jms.MQRecvBuffer;
import com.keer.core.bean.jms.MQSendBuffer;
import com.keer.core.dao.SQLBuilder;
import com.keer.core.service.impl.GenericBizServiceImpl;
import com.keer.core.service.jms.ICommandMessage;
import com.keer.core.service.jms.IDefaultMessageManager;
import com.keer.core.service.jms.IMonitorManager;
import com.keer.core.service.jms.IMessageMapping;
import com.keer.core.service.jms.IMessageSendCallback;

public class DefaultMessageManager extends GenericBizServiceImpl<CommandMessage> implements IDefaultMessageManager, ApplicationContextAware {

	private static ApplicationContext applicationContext;     //Spring应用上下文环境
	
	private IMessageMapping messageMapping;
	
	private String messageConsumer;
	
	private String messageProducer;
	
	protected final Log logger = LogFactory.getLog(getClass());
	
	private String messageSuffix = "";
	
	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
		  DefaultMessageManager.applicationContext = applicationContext;
	}
	 
	public static ApplicationContext getApplicationContext() {
	   return applicationContext;
	}
	 
	public static Object getBean(String name) throws BeansException {
	    return applicationContext.getBean(name);
	}

	public String getMessageConsumer() {
		return messageConsumer;
	}

	public void setMessageConsumer(String messageConsumer) {
		this.messageConsumer = messageConsumer;
	}
	
	public String getMessageProducer() {
		return messageProducer;
	}
	
	public void setMessageProducer(String messageProducer) {
		this.messageProducer = messageProducer;
	}
	
	public void setMessageSuffix(String messageSuffix) {
		this.messageSuffix = messageSuffix;
	}
	public String getMessageSuffix() {
		return messageSuffix;
	}
	public void setMessageMapping(IMessageMapping messageMapping) {
		this.messageMapping = messageMapping;
	}
	public IMessageMapping getMessageMapping() {
		return messageMapping;
	}
	
	@Transactional(propagation=Propagation.REQUIRED,rollbackFor=Exception.class)
	public void ProduceMessage(CommandMessage message) throws Exception {
		message.setEventDate(new Date());
		this.save(message,null);
		IMonitorManager container = (IMonitorManager)DefaultMessageManager.getBean(messageProducer);
		container.startMonitor();
	}

	@Transactional(propagation=Propagation.REQUIRED,rollbackFor=Exception.class)
	public void ConsumeMessage(CommandMessage message) throws Exception {
		String beanString = message.getTopicName();
		beanString += messageSuffix;
		ICommandMessage command = (ICommandMessage) DefaultMessageManager.getBean(beanString);
		if (command != null){
			message.setCommandStatus(CommandStatus.Info);
			message.setExceptionInfo(null);
			try {
				command.Execute(message);
			}
			catch (Exception ex) {
				message.setCommandStatus(CommandStatus.Error);
				message.setExceptionInfo(ex.toString());
				logger.error("Task execution failed" + ex);
			}
			finally {
				CommandStatus status = message.getCommandStatus();
				if (status == CommandStatus.Info){
					this.delete(message,null);
					this.save(message.copyRecvHistory(),null);
				}
				else {
					this.update(message,null);
				}
			}
		}
		else {
			throw new Exception(String.format("[%s]-没有找到对应的命令处理类", beanString));
		}
	}

	@Transactional(propagation=Propagation.REQUIRED,rollbackFor=Exception.class)
	public void onMessage(Message message) {
		if (messageMapping != null){
			try {
				MQRecvBuffer buffer = new MQRecvBuffer();
				buffer = (MQRecvBuffer) messageMapping.buildBuffer(message,buffer);
				buffer.setRecvDate(new Date());
				this.save(buffer,null);
				IMonitorManager consumer = (IMonitorManager)DefaultMessageManager.getBean(messageConsumer);
				consumer.startMonitor();
			} catch (JMSException e) {
				e.printStackTrace();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}		
	}

	@Transactional(propagation=Propagation.REQUIRED,rollbackFor=Exception.class)
	public Boolean LoadMessage(IMessageSendCallback doBack) throws Exception {
		SQLBuilder builder = new SQLBuilder();
		builder.AddOrderBy("id");
		builder.AddPaging(0, 1);
		List<MQSendBuffer> list = this.dao.findAll(MQSendBuffer.class, builder, null);
		if (list != null && list.size() > 0){
			MQSendBuffer buffer = list.get(0);
			doBack.doInSendMessage(buffer);
			this.save(buffer.copySendHistory(),null);
			this.delete(buffer,null);
			return true;
		}
		else {
			return false;
		}
	}
	
	public Message BuildMessage(Message message, CommandMessage command) throws Exception {
		if (messageMapping != null){
			message = messageMapping.buildMessage(message, command);
		}
		else {
			throw new IllegalStateException(
					"No messageMapping specified - see property 'messageMapping'");			
		}
		return message;
	}
}


