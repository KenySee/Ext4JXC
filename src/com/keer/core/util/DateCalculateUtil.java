package com.keer.core.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * 日期计算类
 * @author zf
 *
 */
public class DateCalculateUtil {
	
	/**
	 * 将日期类型转换为字符串类型
	 * @param date 如：new Date()
	 * @param fromat 如："yyyy-MM-dd"  或 "yyyy-MM-dd HH:mm:ss"
	 * @return    如："2011-06-22" 或 "2011-06-22 16:50:00"
	 */
	public static String dateOfString(Date date,String fromat){
		SimpleDateFormat sdf=new SimpleDateFormat(fromat);
		return sdf.format(date);
	}
	
	
	/**
	 * 将字符串格式的时间类型转换为Date类型
	 * @param strDate    如："2011-06-22" 或 "2011-06-22 16:50:00"
	 * @param fromat     如："yyyy-MM-dd"  或 "yyyy-MM-dd HH:mm:ss"
	 * @return          如：new Date()
	 * @throws ParseException
	 */
	public static Date stringOfDate(String strDate,String fromat) throws ParseException{
		SimpleDateFormat sdf=new SimpleDateFormat(fromat);
		return sdf.parse(strDate);
	}
	
	/**
	 * 获得某个日期所属周的第一天
	 * @param date 2011-08-18 星期四
	 * @return   2011-08-15  星期一
	 */
	@SuppressWarnings("static-access")
	public static String getFristDayOfWeek(Date date){
		String strDate="";
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		int dayOfWeek = calendar.get(calendar.DAY_OF_WEEK);
		if(dayOfWeek==1){
			calendar.set(Calendar.DAY_OF_YEAR, calendar.get(Calendar.DAY_OF_YEAR) - dayOfWeek-5);
		}else{
			calendar.set(Calendar.DAY_OF_YEAR, calendar.get(Calendar.DAY_OF_YEAR) - dayOfWeek + 2);
		}
		strDate=dateOfString(calendar.getTime(),"yyyy-MM-dd");
		return strDate;
	}
	
	/**
	 * 获得某个日期下一个星期的最后一天
	 * @param date 2011-08-17 星期三
	 * @return 2011-08-28  星期天
	 */
	@SuppressWarnings("static-access")
	public static String getLastOfSecondWeekDay(Date date){
		String strDate="";
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		int dayOfWeek = calendar.get(calendar.DAY_OF_WEEK);
		if(dayOfWeek==1){
			calendar.set(Calendar.DAY_OF_YEAR, calendar.get(Calendar.DAY_OF_YEAR) - dayOfWeek + 1);
			calendar.set(Calendar.DAY_OF_YEAR, calendar.get(Calendar.DAY_OF_YEAR) + 7);
			strDate=dateOfString(calendar.getTime(),"yyyy-MM-dd");
		}else{
			calendar.set(Calendar.DAY_OF_YEAR, calendar.get(Calendar.DAY_OF_YEAR) - dayOfWeek + 1);
			calendar.set(Calendar.DAY_OF_YEAR, calendar.get(Calendar.DAY_OF_YEAR) + 14);
			strDate=dateOfString(calendar.getTime(),"yyyy-MM-dd");
		}
		return strDate;
	}
	/**
	 * 获得某个日期所属周的最后一天(星期天)
	 * @param date 2011-08-17 星期三
	 * @return 2011-08-21  星期天
	 */
	@SuppressWarnings("static-access")
	public static String getLastOfWeekDay(Date date){
		String strDate="";
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		int dayOfWeek = calendar.get(calendar.DAY_OF_WEEK);
		if(dayOfWeek==1){//如果==1则为星期天--作为本周的最后一天
			strDate=dateOfString(date,"yyyy-MM-dd");
		}else{
			calendar.set(Calendar.DAY_OF_YEAR, calendar.get(Calendar.DAY_OF_YEAR) - dayOfWeek + 1);
			calendar.set(Calendar.DAY_OF_YEAR, calendar.get(Calendar.DAY_OF_YEAR) + 7);
			strDate=dateOfString(calendar.getTime(),"yyyy-MM-dd");
		}
		return strDate;
	}
	
	/**
	 * 获得某个日期属于今年的第几周
	 * @param date
	 * @return
	 */
	public static Integer getWeekOfNum(Date date){
		Integer num=0;
		Calendar calendar = Calendar.getInstance();
		calendar.setFirstDayOfWeek(Calendar.MONDAY);
		calendar.setTime(date);
		num=calendar.get(Calendar.WEEK_OF_YEAR);
		return num;
	}
	
	/**
	 * 获得当前日期下个月的第一天
	 * @return
	 */
	public static Date getNextMonthOfFirstDay(){
		Calendar lastDate = Calendar.getInstance();
		lastDate.add(Calendar.MONTH,1);//加一个月
		lastDate.set(Calendar.DATE, 1);//把日期设置为当月第一天
		return lastDate.getTime();
	}
	/**
	 * 获得当前日期上个月的第一天
	 * @return
	 */
	public static String getUpMonthOfFirstDay(){
		Calendar lastDate = Calendar.getInstance();
		lastDate.add(Calendar.MONTH,-1);//减一个月
		lastDate.set(Calendar.DATE, 1);//把日期设置为当月第一天
		return dateOfString(lastDate.getTime(),"yyyy-MM-dd");
	}
	/**
	 * 获得某个日期 所属月份的第一天
	 * @param date  字符串日期类型（如：'2011-05-20'）
	 * @return  返回一个日期字符串   如：2011-05-01
	 * @throws Exception
	 */
	public static String fristDayOfMonth(String date) throws Exception{
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		Calendar c = Calendar.getInstance();
		c.setTime(format.parse(date));
		c.setFirstDayOfWeek(Calendar.SUNDAY);
		c.set(Calendar.DAY_OF_MONTH,1);
		return dateOfString(c.getTime(),"yyyy-MM-dd");
	}
	
	/**
	 * 获得某个日期 所属月份的最后一天
	 * @param date 字符串日期类型（如：'2011-05-15'）
	 * @return  返回一个日期字符串   如：2011-05-31
	 * @throws Exception
	 */
	public static String lastDayOfMonth(String date) throws Exception{
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		Calendar c = Calendar.getInstance();
		c.setTime(format.parse(date));
		c.add(Calendar.MONTH,1);
		c.set(Calendar.DAY_OF_MONTH, 1);
		c.add(Calendar.DAY_OF_YEAR, -1);
		return dateOfString(c.getTime(),"yyyy-MM-dd");
	}
	
	
	/**
	 * 获取的是系统当前时间的前一天
	 * @return Date
	 * @author 吴浩
	 */
	public static Date getBeforeDay() throws Exception{ 
		Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.DATE, -1);           
        return calendar.getTime();
	}
	
	/**
	 * 获取的是系统当前时间的前一天
	 * 格式化(yyyy-MM-dd)
	 * @return Date
	 * @author 吴浩
	 */
	public static String getBeforeDayFormat() throws Exception{ 
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date date = getBeforeDay();         
        return sdf.format(date);
	}
	
	/**
	 * 根据日期返回 星期
	 * @param date 如：new Date()
	 * @return  如：星期三
	 */
	public static String getWeekName(Date date){
		String str="";
		String [] weekName={"星期天","星期一","星期二","星期三","星期四","星期五","星期六"};
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		Integer num=c.get(Calendar.DAY_OF_WEEK)-1;
		str=weekName[num];
		return str;
	}
	/**
	 * 判断第一个时间是否大于第二个时间 (大则返回true)
	 * @param strTime1  如：12:30:00
	 * @param strTime2  如：13:30:00
	 * @return   返回:false
	 */
	public static Boolean checkBigTime(String strTime1,String strTime2){
		Boolean boo=Boolean.FALSE;
		String m1[]=strTime1.split(":");
		String m2[]=strTime2.split(":");
		if(Integer.parseInt(m1[0])>Integer.parseInt(m2[0])){//小时
			boo=Boolean.TRUE;
		}else if(Integer.parseInt(m1[0])==Integer.parseInt(m2[0])){//小时相等
			if(Integer.parseInt(m1[1])>=Integer.parseInt(m2[1])){
				boo=Boolean.TRUE;
			}
		}
		return boo;
	}
	
	/**
	 * 比较日期大小 
	 * @param dateOne 字符串类型如："2011-05-10"
	 * @param dateTwo 字符串类型如："2011-05-15"
	 * @return  false
	 * @throws Exception 
	 */
	public static boolean compareDay(String dateOne, String dateTwo) throws Exception{
		Date fristDate=stringOfDate(dateOne,"yyyy-MM-dd");
		Date secondDate=stringOfDate(dateTwo,"yyyy-MM-dd");
		return compareDay(fristDate,secondDate);
	}
	/**
	 *  比较日期先后包括年月日 判断第一个日期是否大于或等于第二个日期
	 * @param dateOne  Date类型如：'2011-05-10'
	 * @param dateTwo   Date类型如：'2011-05-15'
	 * @return false
	 */
	public static boolean compareDay(Date dateOne, Date dateTwo){
		String one =dateOfString(dateOne,"yyyyMMdd");
		String two =dateOfString(dateTwo,"yyyyMMdd");;
		if ((Integer.parseInt(one)-Integer.parseInt(two))>=0){
			return true;
		}
		return false;
	}
}
