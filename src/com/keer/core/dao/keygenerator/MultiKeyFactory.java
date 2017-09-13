package com.keer.core.dao.keygenerator;

import java.util.HashMap;
import java.util.Map;

/**
 * 主键生成器多例工厂类
 * @author 周方明
 *
 */
public class MultiKeyFactory {

	private static final int POOL_SIZE = 100000;

	private KeyGenerator keyGenerator;

	private static Map<String, MultiKeyFactory> instances = new HashMap<String, MultiKeyFactory>();

	private MultiKeyFactory(String keyName) {
		this.keyGenerator = new KeyGenerator(keyName, POOL_SIZE);
	}
	
	public static MultiKeyFactory getInstance(String keyName)
    {
       if(!instances.containsKey(keyName))
           instances.put(keyName, new MultiKeyFactory(keyName));
       return instances.get(keyName);
    }
	
	public int getNextKey()
    {
       return keyGenerator.getNextKey();
    }	
}
