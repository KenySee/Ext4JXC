package com.keer.core.exception;

/**
 * @Title KeerSQLException
 * @Description Keer 数据库处理异常类
 * @author YanJie
 * @date 2013-10-23
 * @version V1.0
 */
@SuppressWarnings("serial")
public class KeerSQLException extends KeerException{
	public KeerSQLException() {
		super();
	}
	
	public KeerSQLException(String detailMessage) {
		super(detailMessage);
	}
	
	public KeerSQLException(String detailMessage,Throwable tr) {
		super(detailMessage,tr);
	}

	public KeerSQLException(Integer code,String detailMessage) {
		super(code,detailMessage);
	}
}
