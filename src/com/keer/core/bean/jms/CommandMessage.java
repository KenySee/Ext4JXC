package com.keer.core.bean.jms;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Lob;
import javax.persistence.MappedSuperclass;

import org.hibernate.annotations.Type;

import com.keer.core.bean.base.EntityBean;
import com.keer.core.bean.enums.CommandStatus;

@SuppressWarnings("serial")
@MappedSuperclass
public abstract class CommandMessage extends EntityBean {
	/**
	 * 消息ID
	 */
	private Integer messageId;

	/**
	 * 订阅主题
	 */
	private String topicName;
	
	
	/**
	 * 命令名
	 */
	private String commandName;
	
	
	/**
	 * 命令状态
	 */
	@Enumerated(EnumType.STRING)
	@Column(length=10)
	private CommandStatus commandStatus = CommandStatus.Info;
	
	/**
	 * 事件源
	 */
	private String eventSource;
	
	/**
	 * 事件日期
	 */
	private Date eventDate;
	
	/**
	 * 接收日期
	 */
	private Date recvDate;
	
	@Lob
	@Column(length=50000)
	@Type(type="org.springframework.orm.hibernate3.support.ClobStringType")
	private String jsonData;
	
	/**
	 * 执行信息
	 */
	@Lob
	@Column(length=50000)
	@Type(type="org.springframework.orm.hibernate3.support.ClobStringType")
	private String exceptionInfo;
	
	/**
	 * 
	 * @param queueName		队列名
	 * @param commandName	命令名
	 * @param jsonData		消息数据
	 * @return
	 */
	public static CommandMessage createSendMessage(String queueName,String commandName, String jsonData){
		return new MQSendBuffer(queueName,commandName,jsonData);
	}
	
	public static CommandMessage createRecvMessage(String queueName,String commandName, String jsonData){
		return new MQRecvBuffer(queueName,commandName,jsonData);
	}
	public CommandMessage(){}
	public CommandMessage(String topicName,String commandName, String jsonData){
		this.topicName = topicName;
		this.commandName = commandName;
		this.jsonData = jsonData;
	}
	public MQSendHistory copySendHistory(){
		MQSendHistory bean = new MQSendHistory();
		bean.setMessageId(this.getMessageId());
		bean.setTopicName(this.getTopicName());
		bean.setCommandName(this.getCommandName());
		bean.setEventSource(this.getEventSource());
		bean.setEventDate(this.getEventDate());
		bean.setJsonData(getJsonData());
		return bean;
	}
	
	public MQRecvHistory copyRecvHistory(){
		MQRecvHistory bean = new MQRecvHistory();
		bean.setMessageId(this.getMessageId());
		bean.setTopicName(this.getTopicName());
		bean.setCommandName(this.getCommandName());
		bean.setEventSource(getEventSource());
		bean.setEventDate(getEventDate());
		bean.setJsonData(getJsonData());
		bean.setValid(true);
		return bean;
	}
	
	public Integer getMessageId() {
		return messageId;
	}

	public void setMessageId(Integer messageId) {
		this.messageId = messageId;
	}

	public String getEventSource() {
		return eventSource;
	}

	public void setEventSource(String eventSource) {
		this.eventSource = eventSource;
	}

	public Date getEventDate() {
		return eventDate;
	}

	public void setEventDate(Date eventDate) {
		this.eventDate = eventDate;
	}

	public Date getRecvDate() {
		return recvDate;
	}

	public void setRecvDate(Date recvDate) {
		this.recvDate = recvDate;
	}

	public String getJsonData() {
		return jsonData;
	}

	public void setJsonData(String jsonData) {
		this.jsonData = jsonData;
	}

	public String getCommandName() {
		return commandName;
	}

	public void setCommandName(String commandName) {
		this.commandName = commandName;
	}

	public CommandStatus getCommandStatus() {
		return commandStatus;
	}

	public void setCommandStatus(CommandStatus commandStatus) {
		this.commandStatus = commandStatus;
	}

	public String getTopicName() {
		return topicName;
	}

	public void setTopicName(String topicName) {
		this.topicName = topicName;
	}

	public String getExceptionInfo() {
		return exceptionInfo;
	}

	public void setExceptionInfo(String exceptionInfo) {
		this.exceptionInfo = exceptionInfo;
	}
	public Integer getVersion() {
		// TODO Auto-generated method stub
		return null;
	}
	
	public void setVersion(Integer version) {
		// TODO Auto-generated method stub
	}
}
