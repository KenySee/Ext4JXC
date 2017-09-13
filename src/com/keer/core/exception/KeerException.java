package com.keer.core.exception;

/**
 * @Title KeerException
 * @Description Keer 所有异常的基类
 * @author YanJie
 * @date 2013-10-23
 * @version V1.0
 */
@SuppressWarnings("serial")
public class KeerException extends Exception{
	private int code;
	private String msg;

	public int getCode() {
		return code;
	}

	public String getMsg() {
		return msg;
	}

	public KeerException() {
		super();
	}
	
	public KeerException(String detailMessage) {
		super(detailMessage);
		this.code = -1;
		this.msg = detailMessage;
	}
	
	public KeerException(String detailMessage,Throwable tr) {
		super(detailMessage,tr);
		this.code = -1;
		this.msg = detailMessage;
	}

	public KeerException(Integer code,String detailMessage) {
		super(detailMessage);
		this.code = code;
		this.msg = detailMessage;
	}
}
