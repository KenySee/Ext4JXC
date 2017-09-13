package com.keer.core.service.jms.impl;

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.core.task.SimpleAsyncTaskExecutor;
import org.springframework.core.task.TaskExecutor;
import org.springframework.util.ClassUtils;

import com.keer.core.bean.jms.CommandMessage;
import com.keer.core.bean.jms.MQRecvBuffer;
import com.keer.core.dao.SQLBuilder;
import com.keer.core.service.impl.GenericBizServiceImpl;
import com.keer.core.service.jms.IMonitorManager;
import com.keer.core.service.jms.IMessageHandler;

public class DefaultMessageConsumer extends GenericBizServiceImpl<CommandMessage> implements InitializingBean,IMonitorManager {

	private TaskExecutor taskExecutor;

	public static final long DEFAULT_RECOVERY_INTERVAL = 5000;
	
	private long recoveryInterval = DEFAULT_RECOVERY_INTERVAL;
	
	private Boolean enableConsumer = false;
	
	protected final Log logger = LogFactory.getLog(getClass());
	
	private IMessageHandler messageHandler;
	
	public static final String DEFAULT_THREAD_NAME_PREFIX =
		ClassUtils.getShortName(DefaultMessageConsumer.class) + "-";
	
	public void setRecoveryInterval(long recoveryInterval) {
		this.recoveryInterval = recoveryInterval;
	}
	public void stopMonitor() {
		this.enableConsumer = false;
	}
	public void startMonitor() {
		this.enableConsumer = true;
	}
	public void setEnableConsumer(Boolean enableConsumer) {
		this.enableConsumer = enableConsumer;
	}
	public Boolean getEnableConsumer() {
		return enableConsumer;
	}
	public void setMessageHandler(IMessageHandler messageHandler) {
		this.messageHandler = messageHandler;
	}
	public IMessageHandler getMessageHandler() {
		return messageHandler;
	}
	protected void sleepInbetweenRecoveryAttempts() {
		if (this.recoveryInterval > 0) {
			try {
				Thread.sleep(this.recoveryInterval);
			}
			catch (InterruptedException interEx) {
				Thread.currentThread().interrupt();
			}
		}
	}
	
	@Override
	public void afterPropertiesSet() throws Exception {
		if (this.taskExecutor == null) {
			this.taskExecutor = new SimpleAsyncTaskExecutor(DEFAULT_THREAD_NAME_PREFIX);;
		}
		this.taskExecutor.execute(new AsyncScheduledTaskInvoker());
	}
	
	public Boolean FetchAndExecute() throws Exception{
		boolean success = false;
		if (enableConsumer){
			enableConsumer = false;
			SQLBuilder builder = new SQLBuilder();
			builder.AddOrderBy("id");
			List<MQRecvBuffer> recvList = this.dao.findAll(MQRecvBuffer.class, builder, null);
			if (recvList.size() > 0){
				for(MQRecvBuffer recvBuffer : recvList){
					messageHandler.ConsumeMessage(recvBuffer);
				}
			}
		}
		return success;
	}
	
	private class AsyncScheduledTaskInvoker implements Runnable
	{
		public void run() {
			while (true) {
				try {
					FetchAndExecute();
				} catch (Exception e) {
					e.printStackTrace();
				}
				sleepInbetweenRecoveryAttempts();
			}
		}		
	}
}
