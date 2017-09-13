package com.keer.core.service.aop;

import org.apache.log4j.Logger;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class ExceptionHandler{

	private static final Logger log = Logger.getLogger(ExceptionHandler.class);
	
	@Pointcut("execution(* com.keer.core.service.impl.*Impl.*(..))")
	public void service(){
		
	}

	@AfterThrowing(pointcut="service() && target(obj)",throwing="exception",argNames="obj,exception")
	public void AfterThrowingAspect(Object obj,RuntimeException exception){
		log.info(obj.getClass().getName(),exception);
	}
}
