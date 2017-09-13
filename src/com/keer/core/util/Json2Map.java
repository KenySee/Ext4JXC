package com.keer.core.util;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.lang.reflect.Modifier;
import java.net.URL;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.keer.core.bean.base.JSONBean;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class Json2Map {
	
	@SuppressWarnings("unchecked")
	public static List<Map<String, Object>> parseJSON2List(String jsonStr){
        JSONArray jsonArr = JSONArray.fromObject(jsonStr);
        List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
        Iterator<JSONObject> it = jsonArr.iterator();
        while(it.hasNext()){
            JSONObject json2 = it.next();
            list.add(parseJSON2Map(json2.toString()));
        }
        return list;
    }
    
	public static Date StringToDate(String dateStr,String formatStr){
		DateFormat dd=new SimpleDateFormat(formatStr);
		Date date=null;
		try {
			date = dd.parse(dateStr);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return date;
	}  
    @SuppressWarnings("unchecked")
	public static Map<String, Object> parseJSON2Map(String jsonStr){
        Map<String, Object> map = new HashMap<String, Object>();
        //最外层解析
        JSONObject json = JSONObject.fromObject(jsonStr);
        for(Object k : json.keySet()){
            Object v = json.get(k); 
            //如果内层还是数组的话，继续解析
            if(v instanceof JSONArray){
                List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
                Iterator<JSONObject> it = ((JSONArray)v).iterator();
                while(it.hasNext()){
                    JSONObject json2 = it.next();
                    list.add(parseJSON2Map(json2.toString()));
                }
                map.put(k.toString(), list);
            } else {
            	map.put(k.toString(), v);
            }
        }
        return map;
    }
    
   
    public static List<Map<String, Object>> getListByUrl(String url){
        try {
            //通过HTTP获取JSON数据
            InputStream in = new URL(url).openStream();
            BufferedReader reader = new BufferedReader(new InputStreamReader(in));
            StringBuilder sb = new StringBuilder();
            String line;
            while((line=reader.readLine())!=null){
                sb.append(line);
            }
            return parseJSON2List(sb.toString());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
    
   
    public static Map<String, Object> getMapByUrl(String url){
        try {
            //通过HTTP获取JSON数据
            InputStream in = new URL(url).openStream();
            BufferedReader reader = new BufferedReader(new InputStreamReader(in));
            StringBuilder sb = new StringBuilder();
            String line;
            while((line=reader.readLine())!=null){
                sb.append(line);
            }
            return parseJSON2Map(sb.toString());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
    public static List<Map<String, Object>> getListByStream(InputStream in){
        try {
            BufferedReader reader = new BufferedReader(new InputStreamReader(in));
            StringBuilder sb = new StringBuilder();
            String line; int i = 0;
            boolean bFound = false;
            while((line=reader.readLine())!=null){
            	if (i == 0 && bFound == false && line.charAt(0) != '['){
            		sb.append("[");
            		bFound = true;
            	}
                sb.append(line);
                i++;
            }
            if (bFound){
            	sb.append("]");
            }
            return parseJSON2List(sb.toString());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
    
	public static JSONBean<?> parseJSON2Bean(String jsonStr) throws Exception{
    	JSONObject json2 = JSONObject.fromObject(jsonStr);
    	JSONBean<?> bean = null;
		try {
			Class<?> clazz = Class.forName(json2.getString("clazzname"));
			if (Modifier.isAbstract(clazz.getModifiers())){
				throw new Exception(String.format("抽象类[%s],无法实例化", clazz.getName()));
			}
			else {
				bean = (JSONBean<?>) clazz.newInstance();
		        bean.fromJson(json2);
			}
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (InstantiationException e) {
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		}
        return bean;
    }
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static List<JSONBean> parseJSON2BeanList(String jsonStr) throws Exception{
        JSONArray jsonArr = JSONArray.fromObject(jsonStr);
        List<JSONBean> list = new ArrayList<JSONBean>();
        Iterator<JSONObject> it = jsonArr.iterator();
        JSONBean<?> bean = null;
        while(it.hasNext()){
            JSONObject json2 = it.next();
			Class<?> clazz = Class.forName(json2.getString("clazzname"));
			if (Modifier.isAbstract(clazz.getModifiers())){
				throw new Exception(String.format("抽象类[%s],无法实例化", clazz.getName()));
			}
			else {
				bean = (JSONBean<?>) clazz.newInstance();
			    bean.fromJson(json2);
			    bean.clearDirty();
			    list.add(bean);
			}
        }
        return list;
    }
	
    @SuppressWarnings("rawtypes")
	public static List<JSONBean> getBeanList(InputStream in) throws Exception{
    	StringBuilder sb = new StringBuilder();
    	try {
            BufferedReader reader = new BufferedReader(new InputStreamReader(in));
            String line;
            while((line=reader.readLine())!=null){
                sb.append(line);
            }
            
        } catch (Exception e) {
            e.printStackTrace();
        }
        return parseJSON2BeanList(sb.toString());
    }
    
    public static Map<String, Object> getMapByStream(InputStream in){
        try {
            BufferedReader reader = new BufferedReader(new InputStreamReader(in));
            StringBuilder sb = new StringBuilder();
            String line;
            while((line=reader.readLine())!=null){
                sb.append(line);
            }
            return parseJSON2Map(sb.toString());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;  	
    }
}
