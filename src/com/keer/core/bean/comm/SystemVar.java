package com.keer.core.bean.comm;

import java.io.InputStream;
import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
import java.util.Set;


import com.keer.core.bean.base.AbstractBean;
import com.keer.core.util.CacheLoaderUtil;
import com.keer.core.util.DefineClass;

@SuppressWarnings("serial")
public class SystemVar  extends AbstractBean{

	public static final Boolean OrgRole;
	public static final Boolean MemberRole;
	public static final Boolean PostRole;
	public static final Boolean UUIDKey;
	public static final Boolean JSONDebugger;
	static {
		InputStream is = SystemVar.class.getClassLoader().getResourceAsStream("systemVar.properties");
		Properties properties = new Properties();
		try {
			properties.load(is);
			OrgRole = Boolean.parseBoolean(properties.getProperty("OrgRole"));
			MemberRole = Boolean.parseBoolean(properties.getProperty("MemberRole"));
			PostRole = Boolean.parseBoolean(properties.getProperty("PostRole"));
			UUIDKey = Boolean.parseBoolean(properties.getProperty("UUIDKey"));
			JSONDebugger = Boolean.parseBoolean(properties.getProperty("JSONDebugger"));
		}catch (Exception e) {
			throw new RuntimeException(e);
		}		
	}
	
	public static Map<String, Object> getSystemVer() throws IllegalArgumentException, IllegalAccessException{
		Map<String, Object> systemMap = new HashMap<String, Object>();
		systemMap.put("OrgRole", SystemVar.OrgRole);
		systemMap.put("MemberRole", SystemVar.MemberRole);
		systemMap.put("PostRole", SystemVar.PostRole);
		systemMap.put("UUIDKey", SystemVar.UUIDKey);
		DefineClass parent = CacheLoaderUtil.getDefineClass(SystemVar.class);
		Set<DefineClass> allDefine = parent.getChilds();
		for(DefineClass define : allDefine){
			Class<?> clazz = define.getClazz();
			Field[] fields = clazz.getDeclaredFields();
			for(Field field : fields){
				boolean isStatic = Modifier.isStatic(field.getModifiers());
				if (isStatic){
					systemMap.put(field.getName(), field.get(null));
				}
			}
		}
		return systemMap;
	}
}
