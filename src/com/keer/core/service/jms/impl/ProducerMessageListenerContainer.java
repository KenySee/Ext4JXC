package com.keer.core.service.jms.impl;

import java.util.HashSet;
import java.util.Set;

import javax.jms.Destination;
import javax.jms.ExceptionListener;
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageProducer;
import javax.jms.Queue;
import javax.jms.Session;
import javax.jms.Topic;

import org.apache.activemq.command.ActiveMQDestination;
import org.springframework.core.task.SimpleAsyncTaskExecutor;
import org.springframework.core.task.TaskExecutor;
import org.springframework.jms.JmsException;
import org.springframework.jms.listener.AbstractJmsListeningContainer;
import org.springframework.jms.support.JmsUtils;
import org.springframework.jms.support.destination.CachingDestinationResolver;
import org.springframework.jms.support.destination.DestinationResolver;
import org.springframework.scheduling.SchedulingAwareRunnable;
import org.springframework.util.Assert;
import org.springframework.util.ClassUtils;

import com.keer.core.bean.jms.CommandMessage;
import com.keer.core.service.jms.IMonitorManager;
import com.keer.core.service.jms.IMessageSendCallback;
import com.keer.core.service.jms.IMessageSender;

public class ProducerMessageListenerContainer extends
		AbstractJmsListeningContainer implements IMonitorManager {

	public static final String DEFAULT_THREAD_NAME_PREFIX = ClassUtils
			.getShortName(ProducerMessageListenerContainer.class) + "-";

	private volatile Object destination;

	private volatile Object messageProducer;

	public static final long DEFAULT_RECOVERY_INTERVAL = 5000;

	private long recoveryInterval = DEFAULT_RECOVERY_INTERVAL;

	private ExceptionListener exceptionListener;

	private TaskExecutor taskExecutor;

	private int activeInvokerCount = 0;

	private Boolean enableListener = false;
	
	private final Set<AsyncMessageListenerInvoker> scheduledInvokers = new HashSet<AsyncMessageListenerInvoker>();

	private final Object activeInvokerMonitor = new Object();

	public void setEnableListener(Boolean enableListener) {
		this.enableListener = enableListener;
	}
	
	public Boolean getEnableListener() {
		return enableListener;
	}
	
	public void stopMonitor() throws JmsException {
		this.enableListener = false;
	}
	
	public void startMonitor() throws JmsException {
		this.enableListener = true;
	}
	
	public void setExceptionListener(ExceptionListener exceptionListener) {
		this.exceptionListener = exceptionListener;
	}

	public ExceptionListener getExceptionListener() {
		return exceptionListener;
	}

	public void setRecoveryInterval(long recoveryInterval) {
		this.recoveryInterval = recoveryInterval;
	}

	public void setDestination(Destination destination) {
		Assert.notNull(destination, "'destination' must not be null");
		this.destination = destination;
		if (destination instanceof Topic && !(destination instanceof Queue)) {
			setPubSubDomain(true);
		}
	}

	public Destination getDestination() {
		return (this.destination instanceof Destination ? (Destination) this.destination
				: null);
	}

	public void setDestinationName(String destinationName) {
		Assert.notNull(destinationName, "'destinationName' must not be null");
		this.destination = destinationName;
	}

	public String getDestinationName() {
		return (this.destination instanceof String ? (String) this.destination
				: null);
	}

	public void setMessageProducer(Object messageProducer) {
		this.checkMessageProducer(messageProducer);
		this.messageProducer = messageProducer;
	}

	public Object getMessageProducer() {
		return messageProducer;
	}

	protected void checkMessageProducer(Object messageProducer) {
		if (!(messageProducer instanceof IMessageSender)) {
			throw new IllegalArgumentException(
					"Message producer needs to be of type ["
							+ IMessageSender.class.getName() + "]");
		}
	}

	protected TaskExecutor createDefaultTaskExecutor() {
		String beanName = getBeanName();
		String threadNamePrefix = (beanName != null ? beanName + "-"
				: DEFAULT_THREAD_NAME_PREFIX);
		return new SimpleAsyncTaskExecutor(threadNamePrefix);
	}

	public void initialize() {
		if (this.taskExecutor == null) {
			this.taskExecutor = createDefaultTaskExecutor();
		}
		super.initialize();
	}

	protected void doRescheduleTask(Object task) {
		this.taskExecutor.execute((Runnable) task);
	}

	protected void handleListenerSetupFailure(Throwable ex,
			boolean alreadyRecovered) {
		if (ex instanceof JMSException) {
			invokeExceptionListener((JMSException) ex);
		}
		if (ex instanceof SharedConnectionNotInitializedException) {
			if (!alreadyRecovered) {
				logger.debug("JMS message listener invoker needs to establish shared Connection");
			}
		} else {
			if (alreadyRecovered) {
				logger.debug(
						"Setup of JMS message listener invoker failed - already recovered by other invoker",
						ex);
			} else {
				logger.info("Setup of JMS message listener invoker failed - trying to recover: "
						+ ex);
			}
		}
	}

	protected void stopSharedConnection() {
		try {
			super.stopSharedConnection();
		} catch (JMSException ex) {
			logger.debug(
					"Connection stop failed - relying on listeners to perform recovery after restart",
					ex);
		}
	}

	protected void startSharedConnection() {
		try {
			super.startSharedConnection();
		} catch (JMSException ex) {
			logger.debug(
					"Connection start failed - relying on listeners to perform recovery",
					ex);
		}
	}

	protected void establishSharedConnection() {
		try {
			super.establishSharedConnection();
		} catch (JMSException ex) {
			logger.debug(
					"Could not establish shared JMS Connection - "
							+ "leaving it up to asynchronous invokers to establish a Connection as soon as possible",
					ex);
		}
	}

	protected void invokeExceptionListener(JMSException ex) {
		ExceptionListener exceptionListener = getExceptionListener();
		if (exceptionListener != null) {
			exceptionListener.onException(ex);
		}
	}

	protected void recoverAfterListenerSetupFailure() {
		refreshConnectionUntilSuccessful();
		refreshDestination();
	}

	protected void refreshConnectionUntilSuccessful() {
		while (isRunning()) {
			try {
				refreshSharedConnection();
				logger.info("Successfully refreshed JMS Connection");
				break;
			} catch (Exception ex) {
				if (logger.isInfoEnabled()) {
					logger.info(ex);
				}
			}
			sleepInbetweenRecoveryAttempts();
		}
	}

	protected void refreshDestination() {
		String destName = getDestinationName();
		if (destName != null) {
			DestinationResolver destResolver = getDestinationResolver();
			if (destResolver instanceof CachingDestinationResolver) {
				((CachingDestinationResolver) destResolver)
						.removeFromCache(destName);
			}
		}
	}

	protected void validateConfiguration() {
		if (this.destination == null) {
			throw new IllegalArgumentException(
					"Property 'destination' or 'destinationName' is required");
		}
	}

	protected void sleepInbetweenRecoveryAttempts() {
		if (this.recoveryInterval > 0) {
			try {
				Thread.sleep(this.recoveryInterval);
			} catch (InterruptedException interEx) {
				Thread.currentThread().interrupt();
			}
		}
	}

	private void scheduleNewInvoker() {
		if (this.scheduledInvokers.isEmpty()) {
			AsyncMessageListenerInvoker invoker = new AsyncMessageListenerInvoker();
			if (rescheduleTaskIfNecessary(invoker)) {
				this.scheduledInvokers.add(invoker);
			}
		}
	}

	@Override
	protected void doInitialize() throws JMSException {
		synchronized (this.activeInvokerMonitor) {
			scheduleNewInvoker();
		}
	}

	@Override
	protected void doShutdown() throws JMSException {
		logger.debug("Waiting for shutdown of message listener invokers");
		try {
			synchronized (this.activeInvokerMonitor) {
				while (this.activeInvokerCount > 0) {
					if (logger.isDebugEnabled()) {
						logger.debug("Still waiting for shutdown of "
								+ this.activeInvokerCount
								+ " message listener invokers");
					}
					this.activeInvokerMonitor.wait();
				}
			}
		} catch (InterruptedException ex) {
			Thread.currentThread().interrupt();
		}
	}

	@Override
	protected boolean sharedConnectionEnabled() {
		return true;
	}

	protected final void waitWhileNotRunning() {
		synchronized (this.lifecycleMonitor) {
			boolean interrupted = false;
			while (this.isActive() && !isRunning()) {
				if (interrupted) {
					throw new IllegalStateException(
							"Thread was interrupted while waiting for "
									+ "a restart of the listener container, but container is still stopped");
				}
				try {
					this.lifecycleMonitor.wait();
				} catch (InterruptedException ex) {
					// Re-interrupt current thread, to allow other threads to
					// react.
					Thread.currentThread().interrupt();
					interrupted = true;
				}
			}
		}
	}

	private class AsyncMessageListenerInvoker implements
			SchedulingAwareRunnable {

		private Session session;

		private MessageProducer producer;

		public boolean isLongLived() {
			return true;
		}

		public void run() {
			synchronized (activeInvokerMonitor) {
				activeInvokerCount++;
				activeInvokerMonitor.notifyAll();
			}
			try {
				while (isActive()) {
					waitWhileNotRunning();
					if (isActive()) {
						invokeListener();
					}
				}
			} catch (Throwable ex) {
				clearResources();
				handleListenerSetupFailure(ex, false);
				recoverAfterListenerSetupFailure();
			}
			synchronized (activeInvokerMonitor) {
				activeInvokerCount--;
				activeInvokerMonitor.notifyAll();
			}
			if (!rescheduleTaskIfNecessary(this)) {
				synchronized (activeInvokerMonitor) {
					scheduledInvokers.remove(this);
					if (logger.isDebugEnabled()) {
						logger.debug("Lowered scheduled invoker count: "
								+ scheduledInvokers.size());
					}
					activeInvokerMonitor.notifyAll();
				}
				clearResources();
			} else if (isRunning()) {
				logger.warn("All scheduled consumers have been paused, probably due to tasks having been rejected. "
						+ "Check your thread pool configuration! Manual recovery necessary through a start() call.");
			}
		}

		private void invokeListener() throws Exception {
			if (enableListener){
				this.session = createSession(getSharedConnection());
				final IMessageSender handler = (IMessageSender) getMessageProducer();
				if (handler == null) {
					throw new IllegalStateException(
							"No message listener specified - see property 'MessageSendHandler'");
				}
				
				if (destination == null) {
					throw new IllegalStateException(
							"No Destination specified - see property 'destination'");
				}
				else {
					boolean Success = handler.LoadMessage(new IMessageSendCallback() {
						public void doInSendMessage(CommandMessage command)	throws Exception {
							String topicName = command.getTopicName();
							Destination destination = getDestination();
							if (destination instanceof ActiveMQDestination){
								ActiveMQDestination activeDestination = (ActiveMQDestination)destination;
								if (activeDestination.isComposite()){
									ActiveMQDestination[] activeDestinations = activeDestination.getCompositeDestinations();
									for(ActiveMQDestination active : activeDestinations){
										if (!active.isComposite()){
											String physicalName = active.getPhysicalName();
											if (topicName.equals(physicalName)){
												destination = active;
												break;
											}
										}
									}
								}
							}
							producer = session.createProducer(destination);
							Message message = session.createMapMessage();
							message = handler.BuildMessage(message, command);
							producer.send(message);
						}
					});
					if (!Success){
//						logger.info("The job list is empty - retrying in "	+ recoveryInterval + " ms");
						enableListener = false;
						sleepInbetweenRecoveryAttempts();
					}
				}
			}
			else {
				sleepInbetweenRecoveryAttempts();
			}			
		}

		private void clearResources() {
			if (sharedConnectionEnabled()) {
				synchronized (sharedConnectionMonitor) {
					JmsUtils.closeMessageProducer(this.producer);
					JmsUtils.closeSession(this.session);
				}
			} else {
				JmsUtils.closeMessageProducer(this.producer);
				JmsUtils.closeSession(this.session);
			}
			this.producer = null;
			this.session = null;
		}
	}
}
