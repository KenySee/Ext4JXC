package com.keer.core.web.servlet;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Properties;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.springframework.context.support.GenericApplicationContext;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.ResourcePatternResolver;

import com.keer.core.bean.enums.IEnums;
import com.keer.core.secure.Context;

@SuppressWarnings("serial")
public class EnumerationStoreServlet extends HttpServlet {

	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		generateScript(response);
	}

	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		generateScript(response);
	}
	@SuppressWarnings("rawtypes")
	private Map<String,String> getEnumerationNameList(){
		Map<String,String> maps = new HashMap<String, String>();
		String pathString = Context.getServletContext().getInitParameter("enumerationTypeLocation");
		ResourcePatternResolver resourceLoader = new GenericApplicationContext();
		String[] locations = pathString.split(",");
		for (String location : locations) {
			if ((location == null) || (location.equals("")))
				continue;
			try {
				Resource[] resources = resourceLoader.getResources(location);
				if ((resources != null) && (resources.length > 0))
					for (int i = 0; i < resources.length; i++) {
						InputStream propertyFile = resources[i].getInputStream();
						if (propertyFile != null) {
							Properties properties = new Properties();
							properties.load(new InputStreamReader(propertyFile));
							for (Iterator localIterator = properties.keySet().iterator(); localIterator.hasNext();) {
								Object key = localIterator.next();
								String value = properties.getProperty(key.toString());
								if ((value != null) && (!value.equals(""))) {
									maps.put(key.toString(), value);
								}
							}
						}
						propertyFile.close();
					}
			} catch (FileNotFoundException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return maps;
	}
	
	private void generateScript(HttpServletResponse response) {
		Map<String,String>enumMaps = this.getEnumerationNameList();
		String script = "";
		String contentType = "application/javascript;charset=utf-8";
		for (String key : enumMaps.keySet()) {
			String value = enumMaps.get(key);
			script = script + generateScript(key,value);
		}
		response.setContentType(contentType);
		try {
			response.getWriter().print(script);
			response.getWriter().flush();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	private String generateScript(String enumName,String enumClazzName) {
		String result = "";
		if (StringUtils.isNotBlank(enumClazzName)){
			try {
				Class<?> objClass = Class.forName(enumClazzName);
				if (this.IsInterface(objClass, IEnums.class)){
					Method method = objClass.getMethod("values");
					Object[] arr = (Object[]) method.invoke(objClass);
					for(Object obj : arr){
						IEnums nums = (IEnums)obj;
						String type = nums.type()!=null ? nums.type() : "";
						result += "{'id':'" + nums.value() + "','name':'" + nums.text()+ "','type':'" + type + "'},";
					}
				}
			} 
			catch (Exception e) {
				
			}
		}
		if (!result.equals("")) {
			result = result.substring(0, result.length() - 1);
			result = "var " + enumName + "Store = new Ext.data.JsonStore({"
					+ " idProperty:'id',"
					+ " fields:['id', 'name', 'type']," + " data:["
					+ result + "]" + "});";
		}
		return result;
	}
	public  Boolean IsInterface(Class<?> c, Class<?> face){
		Class<?>[] faces = c.getInterfaces();
		String szInterface = face.getSimpleName();
        for (int i = 0, j = faces.length; i < j; i++) 
        {
            if(faces[i].getSimpleName().equals(szInterface))
            {
            	return true;
            }
        }
        return false;
	} 
}