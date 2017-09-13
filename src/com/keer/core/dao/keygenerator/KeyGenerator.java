package com.keer.core.dao.keygenerator;

import java.util.List;

import net.sf.json.JSONObject;

import com.keer.core.bean.base.KeyBean;
import com.keer.core.dao.IDaoSupport;
import com.keer.core.dao.SQLBuilder;
import com.keer.core.secure.Context;

/**
 * 主键生成器类
 * @author 周方明
 *
 */
public class KeyGenerator {
	private int maxKey;
    private int poolSize;
    private int nextKey;
    private String keyName;
    private IDaoSupport dao;
    public KeyGenerator(String keyName,int poolSize){
    	this.dao = (IDaoSupport) Context.getSpringBean("dao");
    	this.poolSize = poolSize;
        this.keyName = keyName;
        createKey(keyName);
        retriveFromDB();
    }
    private boolean isNumeric(String str) {
		for (int i = str.length(); --i >= 0;) {
			if (!Character.isDigit(str.charAt(i))) {
				return false;
			}
		}
		return true;
	}
	private void createKey(String keyName){
    	try
    	{
    		String filterString = "keyName = '"+keyName+"'";
    		List<KeyBean> keys = this.dao.findAll(KeyBean.class, new SQLBuilder().AddFilterWhere(filterString),null);
	        if(keys == null || keys.size() ==0)
	        {
	            KeyBean key = new KeyBean();
	            key.setKeyName(keyName);
	            Integer maxValue = 0;
	            try {
	            	List<?> objList = dao.findListBySql("select id from "+keyName, null, null);
	            	for(Object obj : objList){
	            		String strValue = obj != null ? JSONObject.fromObject(obj).getString("id") : "0";
	            		if (strValue.length() < 9 && isNumeric(strValue)){
		            		Integer iValue = Integer.parseInt(strValue);
		            		if (iValue > maxValue){
		            			maxValue = iValue;
		            		}
		            	}
	            	}
	            }
	            catch (Exception e) {
	            	e.printStackTrace();
				}
	            key.setKeyValue(maxValue + 1);
	            dao.save(key);
	        }
    	}
    	catch (Exception e) {
			e.printStackTrace();
		}
    }
	
    private void retriveFromDB(){
    	try
    	{
    		String filterString = "keyName = '"+keyName+"'";
    		List<KeyBean> keys = this.dao.findAll(KeyBean.class, new SQLBuilder().AddFilterWhere(filterString),null);
	        KeyBean key = keys.get(0);
	        nextKey = key.getKeyValue();
	        key.setKeyValue(key.getKeyValue()+poolSize);
	        maxKey = key.getKeyValue();
	        dao.save(key);
    	}
    	catch (Exception e) {
			e.printStackTrace();
		}
     }  
    public synchronized int getNextKey()
    {
       if(nextKey >= maxKey)
           retriveFromDB();
       return nextKey++;
    }    
}
