package com.keer.core.service.jms.impl;

import net.sf.json.JSONObject;

public abstract class DefaultCommand {
	
	protected String getJSONString(JSONObject data, String key){
		return data != null && data.containsKey(key) ? data.getString(key) : null;
	}
	protected Integer getJSONInteger(JSONObject data, String key){
		return data != null && data.containsKey(key) ? data.getInt(key) : null;
	}
	protected JSONObject getJSONObject(JSONObject data, String key){
		return data != null && data.containsKey(key) ? data.getJSONObject(key) : null;
	}
}
