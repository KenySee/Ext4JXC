package com.keer.core.exception;

/**
 * NotLoginException
 * 
 * @version 1.0.0
 * @author:YanJie
 * @creat:2013-7-5-下午03:03:06
 */
@SuppressWarnings("serial")
public class NotLoginException extends RuntimeException {

	public NotLoginException() {
		super("没有登录或登录已超时!");
	}
}
