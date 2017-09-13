package com.keertech.demo.service.jms;

import javax.jms.MapMessage;
import javax.jms.Message;
import javax.jms.TextMessage;

import net.sf.json.JSONObject;

import com.keer.core.bean.jms.CommandMessage;
import com.keer.core.service.jms.IMessageMapping;

public class DefaultMessageMapping implements IMessageMapping {

	@Override
	public Message buildMessage(Message message, CommandMessage buffer) throws Exception {
		if (message instanceof MapMessage){
			MapMessage mapMessage = (MapMessage)message;
			String topicName = buffer.getTopicName();
			if (topicName.startsWith("Hx.")){
				topicName = topicName.substring(3);
			}
			mapMessage.setString("type", buffer.getTopicName());
			mapMessage.setString("operation", buffer.getCommandName());
			mapMessage.setString("data", buffer.getJsonData());
		}
		else {
			if (message instanceof TextMessage){
				TextMessage textMessage = (TextMessage)message;
				JSONObject object = JSONObject.fromObject(textMessage.getText());
				String topicName = buffer.getTopicName();
				if (topicName.startsWith("Hx.")){
					topicName = topicName.substring(3);
				}
				object.put("type",topicName);
				object.put("operation", buffer.getCommandName());
				object.put("data", buffer.getJsonData());
			}
		}
		return message;
	}

	@Override
	public CommandMessage buildBuffer(Message message, CommandMessage buffer) throws Exception {
		if (message instanceof MapMessage){
			MapMessage mapMessage = (MapMessage)message;
			String topicName = mapMessage.getString("type");
			buffer.setTopicName("Hx."+topicName);
			buffer.setCommandName(mapMessage.getString("operation"));
			buffer.setJsonData(mapMessage.getString("data"));
		}
		else {
			if (message instanceof TextMessage){
				TextMessage textMessage = (TextMessage)message;
				JSONObject object = JSONObject.fromObject(textMessage.getText());
				String topicName = object.getString("type");
				buffer.setTopicName("Hx."+topicName);
				buffer.setCommandName(object.getString("operation"));
				buffer.setJsonData(object.getString("data"));
			}
		}
		return buffer;
	}

}
