package com.keer.core.dao.keygenerator;

import java.util.HashMap;
import java.util.Map;

/**
 * 主键生成器单例工厂类
 * @author 周方明
 *
 */
public class SingleKeyFactory {
	private static SingleKeyFactory keyGenerator = new SingleKeyFactory();
	   
    private static final int POOL_SIZE = 100;
   
    private static Map<String,KeyGenerator> instances = new HashMap<String,KeyGenerator>();
   
    private SingleKeyFactory(){}
   
    public static SingleKeyFactory getInstance()
    {
       return keyGenerator;
    }
   
    public int getNextKey(String keyName)
    {
       if(!instances.containsKey(keyName)){
    	   synchronized (instances) {
    		   if(!instances.containsKey(keyName)){
    			   instances.put(keyName, new KeyGenerator(keyName,POOL_SIZE));
    		   }
    	   }
       }
       return instances.get(keyName).getNextKey();
    }
}
