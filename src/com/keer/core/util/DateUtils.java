package com.keer.core.util;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateUtils {

	public static String DateToString(Date date,String fomart){
		if (date == null){
			date = new Date();
		}
		SimpleDateFormat sdf = new SimpleDateFormat(fomart);
		return sdf.format(date);
	}

	public static Date StringToDate(String dateStr,String formatStr){
		DateFormat dd=new SimpleDateFormat(formatStr);
		Date date=null;
		try {
			date = dd.parse(dateStr.replace('T', ' '));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return date;
	}
	
	public static Date StringToDate(String dateStr){
		DateFormat dd=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date date=null;
		try {
			date = dd.parse(dateStr.replace('T', ' '));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return date;
	}
	
	public static String DateToString(Date date){
		if (date == null){
			date = new Date();
		}
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return sdf.format(date);
	}
}
