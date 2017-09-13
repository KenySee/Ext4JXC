package com.keer.core.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import com.keer.core.bean.organization.UserMember;

import static org.apache.ibatis.jdbc.SqlBuilder.*;

public class SQLBuilder {

	private Map<String, Object> paramMap = new HashMap<String, Object>();
	/*
	 * 后台权限过滤条件
	 */
	private List<String> powerAndList = new ArrayList<String>();
	/*
	 * 前台查询过滤条件
	 */
	private List<String> filterAndList = new ArrayList<String>();
	
	private List<String> whereOrList = new ArrayList<String>();
	private List<String> groupList = new ArrayList<String>();
	private List<String> orderList = new ArrayList<String>();
	
	
	private Integer start = null;
	private Integer limit = null;
	private Integer clazzLevel = 0;
	private Integer propLevel = 1;
	private String tablename = "";
	private String json;
	private JSONObject jsonObject = null;
	private UserMember user;
	private String userAgent;
	private Boolean permission = true;
	public SQLBuilder(){}
	
	public void clear() {
		paramMap.clear();
		powerAndList.clear();
		filterAndList.clear();
		whereOrList.clear();
		groupList.clear();
		orderList.clear();
		start = null;
		limit = null;
		json = null;
		tablename = null;
	}
	
	public void clearWhereOrList(){
		whereOrList.clear();
	}

	public void clearFilterWhere(){
		filterAndList.clear();
	}
	
	public void clearGroupList(){
		groupList.clear();
	}
	
	public void clearOrderList(){
		orderList.clear();
	}
	
	public Boolean hasEmptyWhere(){
		for(String filter : powerAndList){
			if (filter.equals("0=1") || filter.equals("1=0")){
				return true;
			}
		}
		return false;
	}
	
	public JSONObject json() {
		if (jsonObject == null && json != null){
			jsonObject = JSONObject.fromObject(json);
		}
		return jsonObject;
	}
	
	public UserMember user() {
		return this.user;
	}
	
	public String userAgent(){
		return this.userAgent;
	}
	
	public SQLBuilder AddUserAgent(String userAgent){
		this.userAgent = userAgent;
		return this;
	}
	
	public String sqlCount() {
		BEGIN();
		SELECT("*");
		FROM(tablename);
		if (powerAndList.size() == 0) {
			if (whereOrList.size() > 0) {
				String allWhere = "(";
				for (String where : whereOrList) {
					if (!allWhere.equals("(")) {
						allWhere += " or ";
					}
					allWhere += where;
				}
				allWhere += ")";
				powerAndList.add(allWhere);
			} 
		}
		for(String powerWhere : powerAndList){
			WHERE(powerWhere);
		}		
		
		for(String filterWhere : filterAndList){
			WHERE(filterWhere);
		}
		
		for(String group : groupList){
			GROUP_BY(group);
		}
		String sql = SQL();
		return sql.substring(9);		
	}
	public String sql() {
		BEGIN();
		SELECT("*");
		FROM(tablename);
		
//		UserMember member = this.user();
		if (powerAndList.size() == 0) {
			if (whereOrList.size() > 0) {
				String allWhere = "(";
				for (String where : whereOrList) {
					if (!allWhere.equals("(")) {
						allWhere += " or ";
					}
					allWhere += where;
				}
				allWhere += ")";
				powerAndList.add(allWhere);
			} 
		}
		for(String powerWhere : powerAndList){
			WHERE(powerWhere);
		}		
		
		for(String filterWhere : filterAndList){
			WHERE(filterWhere);
		}
		
		for(String group : groupList){
			GROUP_BY(group);
		}
		for(String order : orderList){
			ORDER_BY(order);
		}
		String sql = SQL();
		return sql.substring(9);
	}
	
	public Object map(){
		return paramMap;
	}
	
	public Integer clazzLevel(){
		return clazzLevel;
	}
	
	public Integer propLevel(){
		return propLevel;
	}
	
	public Integer start(){
		return start;
	}
	public Integer limit(){
		return limit;
	}
	
	public SQLBuilder AddFrom(String table){
		this.tablename = table;
		return this;
	}
	
	public SQLBuilder AddParam(String param,Object value){
		paramMap.put(param, value);
		return this;
	}
	
	public SQLBuilder AddPowerWhere(String powerWhere){
		if (powerWhere.equals("")){
			powerWhere = "0=1";
		}
		powerAndList.add(powerWhere);
		return this;
	}
	
	public SQLBuilder AddParamWhere(String where,Object ...values){
		List<String> namedParam = new ArrayList<String>();
		int len = where.length();
		for(int i = 0; i < where.length(); i++){
			char c = where.charAt(i);
			if (c == ':'){
				Integer endIndex = where.substring(i+1).indexOf(" ");
				String param = where.substring(i+1, i+(endIndex > 0 ? endIndex+1 : (len-i)));
				namedParam.add(param);
			}
		}
		for(int i = 0; i < namedParam.size(); i++){
			String named = namedParam.get(i);
			Object value = values[i];
			paramMap.put(named, value);
		}
		filterAndList.add(where);
		return this;
	}
	
	public SQLBuilder AddFilterWhere(String where){
		filterAndList.add(where);
		return this;
	}

	
	public SQLBuilder AddOrWhere(String where){
		whereOrList.add(where);
		return this;
	}
	
	public SQLBuilder AddGroupBy(String groupby){
		groupList.add(groupby);
		return this;
	}
	
	public SQLBuilder AddOrderBy(String orderby){
		orderList.add(orderby);
		return this;
	}
	
	public SQLBuilder AddPaging(Integer start, Integer limit){
		this.start = start;
		this.limit = limit;
		return this;
	}

	public SQLBuilder AddParseLevel(Integer clazzLevel, Integer propLevel){
		this.clazzLevel = clazzLevel != null ? clazzLevel : 0;
		this.propLevel = propLevel != null ? propLevel : 1;
		return this;
	}
	
	public SQLBuilder AddUser(UserMember user) {
		this.user = user;
		return this;
	}
	
	public SQLBuilder AddPermission(Boolean permission){
		this.permission = permission;
		return this;
	}
	
	public Boolean getPermission(){
		return this.permission;
	}
	
	public SQLBuilder AddJSON(String json){
		this.json = json;
		return this;
	}
}
