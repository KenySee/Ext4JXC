package com.keer.core.util;

import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Query;

import sun.reflect.generics.reflectiveObjects.TypeVariableImpl;

/**
 * 泛型工具类
 */
public class GenericsUtils{
   
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
	public static Date StringToDate(String dateStr){
		DateFormat dd=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date date=null;
		try {
			date = dd.parse(dateStr);
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
	
	public static String toISO88591(String str) {  
        try {  
            str = new String(str.getBytes("UTF-8"), "ISO-8859-1");  
        } catch (UnsupportedEncodingException ex) {  
            ex.printStackTrace();  
        }  
        return str;  
    }
	
	public static String firstLetterToUpper(String str) {
		Character c = Character.toUpperCase(str.charAt(0));
		return c.toString().concat(str.substring(1));
	}
	/** 
     * 循环向上转型, 获取对象的 DeclaredMethod 
     * @param object : 子类对象 
     * @param methodName : 父类中的方法名 
     * @param parameterTypes : 父类中的方法参数类型 
     * @return 父类中的方法对象 
     */  
      
    public static Method getDeclaredMethod(Object object, String methodName, Class<?> ... parameterTypes){  
        Method method = null ;  
          
        for(Class<?> clazz = object.getClass() ; clazz != Object.class ; clazz = clazz.getSuperclass()) {  
            try {  
                method = clazz.getDeclaredMethod(methodName, parameterTypes) ;  
                return method ;  
            } catch (Exception e) {  
                //这里甚么都不要做！并且这里的异常必须这样写，不能抛出去。  
                //如果这里的异常打印或者往外抛，则就不会执行clazz = clazz.getSuperclass(),最后就不会进入到父类中了  
              
            }  
        }  
          
        return null;  
    } 	
	/** 
     * 直接调用对象方法, 而忽略修饰符(private, protected, default) 
     * @param object : 子类对象 
     * @param methodName : 父类中的方法名 
     * @param parameterTypes : 父类中的方法参数类型 
     * @param parameters : 父类中的方法参数 
     * @return 父类中方法的执行结果 
     */  
      
    public static Object invokeMethod(Object object, String methodName, Class<?> [] parameterTypes,  
            Object [] parameters) {  
        //根据 对象、方法名和对应的方法参数 通过反射 调用上面的方法获取 Method 对象  
        Method method = getDeclaredMethod(object, methodName, parameterTypes) ;  
          
        //抑制Java对方法进行检查,主要是针对私有方法而言  
        method.setAccessible(true) ;  
          
            try {  
                if(null != method) {  
                      
                    //调用object 的 method 所代表的方法，其方法的参数是 parameters  
                    return method.invoke(object, parameters) ;  
                }  
            } catch (IllegalArgumentException e) {  
                e.printStackTrace();  
            } catch (IllegalAccessException e) {  
                e.printStackTrace();  
            } catch (InvocationTargetException e) {
				e.printStackTrace();
			}          
        return null;  
    }
    /** 
     * 循环向上转型, 获取对象的 DeclaredField 
     * @param object : 子类对象 
     * @param fieldName : 父类中的属性名 
     * @return 父类中的属性对象 
     */    
	public static Field getDeclaredField(Object object, String fieldName){  
        Field field = null ;  
          
        Class<?> clazz = object.getClass() ;  
          
        for(; clazz != Object.class ; clazz = clazz.getSuperclass()) {  
            try {  
                field = clazz.getDeclaredField(fieldName) ;  
                return field ;  
            } catch (Exception e) {  
                //这里甚么都不要做！并且这里的异常必须这样写，不能抛出去。  
                //如果这里的异常打印或者往外抛，则就不会执行clazz = clazz.getSuperclass(),最后就不会进入到父类中了  
                  
            }   
        }  
      
        return null;  
    }
	public static void setFieldValue(Object object, String fieldName, Object value){  
	      
        //根据 对象和属性名通过反射 调用上面的方法获取 Field对象  
        Field field = getDeclaredField(object, fieldName) ;  
          
        //抑制Java对其的检查  
        field.setAccessible(true) ;  
          
        try {  
            //将 object 中 field 所代表的值 设置为 value  
             field.set(object, value) ;  
        } catch (IllegalArgumentException e) {  
            e.printStackTrace();  
        } catch (IllegalAccessException e) {  
            e.printStackTrace();  
        }  
          
    }  
      
    /** 
     * 直接读取对象的属性值, 忽略 private/protected 修饰符, 也不经过 getter 
     * @param object : 子类对象 
     * @param fieldName : 父类中的属性名 
     * @return : 父类中的属性值 
     */  
      
    public static Object getFieldValue(Object object, String fieldName){  
          
        //根据 对象和属性名通过反射 调用上面的方法获取 Field对象  
        Field field = getDeclaredField(object, fieldName) ;  
          
        //抑制Java对其的检查  
        field.setAccessible(true) ;  
          
        try {  
            //获取 object 中 field 所代表的属性值  
            return field.get(object) ;  
              
        } catch(Exception e) {  
            e.printStackTrace() ;  
        }  
          
        return null;  
    }
	public static Boolean IsInterface(Class<?> c, Class<?> face){
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
	public static boolean isInterface(Class<?> c, String szInterface)
    {
            Class<?>[] face = c.getInterfaces();
            for (int i = 0, j = face.length; i < j; i++) 
            {
                    if(face[i].getName().equals(szInterface))
                    {
                            return true;
                    }
                    else
                    { 
                            Class<?>[] face1 = face[i].getInterfaces();
                            for(int x = 0; x < face1.length; x++)
                            {
                                    if(face1[x].getName().equals(szInterface))
                                    {
                                            return true;
                                    }
                                    else if(isInterface(face1[x], szInterface))
                                    {
                                            return true;
                                    }
                            }
                    }
            }
            if (null != c.getSuperclass())
            {
                    return isInterface(c.getSuperclass(), szInterface);
            }
            return false;
    }
	/**
	 * 通过反射,获得指定类的接口的泛型参数的实际类型
	 * @param clazz
	 * @param index
	 * @return
	 */
	public static Class<?> getInterfaceGenericType(Class<?> clazz, int index){
		
		Type[] type = clazz.getGenericInterfaces();
		if (type != null && type.length > 0){
			 Type genType = type[0];
	        if (!(genType instanceof ParameterizedType)){
	            return Object.class;
	        }
	        Type[] params = ((ParameterizedType) genType).getActualTypeArguments();
	        if (index >= params.length || index < 0){
	            throw new RuntimeException("你输入的索引" + (index < 0 ? "不能小于0" : "超出了参数的总数"));
	        }
	        if (!(params[index] instanceof Class<?>)){
	             
	            return Object.class;
	        }
	        return (Class<?>) params[index];
		}
		else {
			return Object.class;
		}
	}
	/**
     * 通过反射,获得指定类的父类的泛型参数的实际类型. 如DaoSupport<Buyer>
     *
     * @param clazz
     *            clazz 需要反射的类,该类必须继承范型父类
     * @param index
     *            泛型参数所在索引,从0开始.
     * @return 范型参数的实际类型, 如果没有实现ParameterizedType接口，即不支持泛型，所以直接返回<code>Object.class</code>
     */
	public static Class<?> getSuperClassGenricType(Class<?> clazz, int index){
         
        Type genType = clazz.getGenericSuperclass();// 得到泛型父类
         
        // 如果没有实现ParameterizedType接口，即不支持泛型，直接返回Object.class
        if (!(genType instanceof ParameterizedType)){
             
            return Object.class;
        }
         
        // 返回表示此类型实际类型参数的Type对象的数组,数组里放的都是对应类型的Class, 如BuyerServiceBean extends DaoSupport<Buyer,Contact>就返回Buyer和Contact类型
        Type[] params = ((ParameterizedType) genType).getActualTypeArguments();
        if (index >= params.length || index < 0){
            throw new RuntimeException("你输入的索引" + (index < 0 ? "不能小于0" : "超出了参数的总数"));
        }
        if (!(params[index] instanceof Class<?>)){
             
            return Object.class;
        }
        return (Class<?>) params[index];
    }
 
    /**
     * 通过反射,获得指定类的父类的第一个泛型参数的实际类型. 如DaoSupport<Buyer>
     *
     * @param clazz
     *            clazz 需要反射的类,该类必须继承泛型父类
     * @return 泛型参数的实际类型, 如果没有实现ParameterizedType接口，即不支持泛型，所以直接返回<code>Object.class</code>
     */
	public static Class<?> getSuperClassGenricType(Class<?> clazz){
         
        return getSuperClassGenricType(clazz, 0);
    }
 
    /**
     * 通过反射,获得方法返回值泛型参数的实际类型. 如: public Map<String, Buyer> getNames(){}
     *
     * @param Method
     *            method 方法
     * @param int index 泛型参数所在索引,从0开始.
     * @return 泛型参数的实际类型, 如果没有实现ParameterizedType接口，即不支持泛型，所以直接返回<code>Object.class</code>
     */
	@SuppressWarnings("rawtypes")
	public static Class<?> getMethodGenericReturnType(Method method, int index){
         
        Type returnType = method.getGenericReturnType();
         
        if (returnType instanceof ParameterizedType){
             
            ParameterizedType type = (ParameterizedType) returnType;
            Type[] typeArguments = type.getActualTypeArguments();
             
            if (index >= typeArguments.length || index < 0){
                 
                throw new RuntimeException("你输入的索引" + (index < 0 ? "不能小于0" : "超出了参数的总数"));
            }
            if (typeArguments[index] instanceof TypeVariableImpl){
            	TypeVariableImpl typeVariableImpl = (TypeVariableImpl)typeArguments[index];
            	return (Class<?>)typeVariableImpl.getGenericDeclaration();
            }
            return (Class<?>) typeArguments[index];
        }
        return Object.class;
    }
 
    /**
     * 通过反射,获得方法返回值第一个泛型参数的实际类型. 如: public Map<String, Buyer> getNames(){}
     *
     * @param Method
     *            method 方法
     * @return 泛型参数的实际类型, 如果没有实现ParameterizedType接口，即不支持泛型，所以直接返回<code>Object.class</code>
     */
	public static Class<?> getMethodGenericReturnType(Method method){
         
        return getMethodGenericReturnType(method, 0);
    }
 
    /**
     * 通过反射,获得方法输入参数第index个输入参数的所有泛型参数的实际类型. 如: public void add(Map<String, Buyer> maps, List<String> names){}
     *
     * @param Method
     *            method 方法
     * @param int index 第几个输入参数
     * @return 输入参数的泛型参数的实际类型集合, 如果没有实现ParameterizedType接口，即不支持泛型，所以直接返回空集合
     */
    public static List<Class<?>> getMethodGenericParameterTypes(Method method, int index){
         
        List<Class<?>> results = new ArrayList<Class<?>>();
        Type[] genericParameterTypes = method.getGenericParameterTypes();
         
        if (index >= genericParameterTypes.length || index < 0){
             
            throw new RuntimeException("你输入的索引" + (index < 0 ? "不能小于0" : "超出了参数的总数"));
        }
        Type genericParameterType = genericParameterTypes[index];
         
        if (genericParameterType instanceof ParameterizedType){
             
            ParameterizedType aType = (ParameterizedType) genericParameterType;
            Type[] parameterArgTypes = aType.getActualTypeArguments();
            for (Type parameterArgType : parameterArgTypes){
                Class<?> parameterArgClass = (Class<?>) parameterArgType;
                results.add(parameterArgClass);
            }
            return results;
        }
        return results;
    }
 
    /**
     * 通过反射,获得方法输入参数第一个输入参数的所有泛型参数的实际类型. 如: public void add(Map<String, Buyer> maps, List<String> names){}
     *
     * @param Method
     *            method 方法
     * @return 输入参数的泛型参数的实际类型集合, 如果没有实现ParameterizedType接口，即不支持泛型，所以直接返回空集合
     */
    public static List<Class<?>> getMethodGenericParameterTypes(Method method){
         
        return getMethodGenericParameterTypes(method, 0);
    }
 
    /**
     * 通过反射,获得Field泛型参数的实际类型. 如: public Map<String, Buyer> names;
     *
     * @param Field
     *            field 字段
     * @param int index 泛型参数所在索引,从0开始.
     * @return 泛型参数的实际类型, 如果没有实现ParameterizedType接口，即不支持泛型，所以直接返回<code>Object.class</code>
     */
    public static Class<?> getFieldGenericType(Field field, int index){
         
        Type genericFieldType = field.getGenericType();
 
        if (genericFieldType instanceof ParameterizedType){
             
            ParameterizedType aType = (ParameterizedType) genericFieldType;
            Type[] fieldArgTypes = aType.getActualTypeArguments();
            if (index >= fieldArgTypes.length || index < 0){
                 
                throw new RuntimeException("你输入的索引" + (index < 0 ? "不能小于0" : "超出了参数的总数"));
            }
            return (Class<?>) fieldArgTypes[index];
        }
        return Object.class;
    }
 
    /**
     * 通过反射,获得Field泛型参数的实际类型. 如: public Map<String, Buyer> names;
     *
     * @param Field
     *            field 字段
     * @param int index 泛型参数所在索引,从0开始.
     * @return 泛型参数的实际类型, 如果没有实现ParameterizedType接口，即不支持泛型，所以直接返回<code>Object.class</code>
     */
    public static Class<?> getFieldGenericType(Field field){
         
        return getFieldGenericType(field, 0);
    }
    
    public static <E> String getEntityName(Class<E> clazz)
	{
		String entityname = clazz.getSimpleName();
		Entity entity = clazz.getAnnotation(Entity.class);
		if (entity.name() != null && !"".equals(entity.name()))
		{
			entityname = entity.name();
		}
		return entityname;
	}

    public static <E> String getKeyFieldName(Class<E> clazz)
	{
		try
		{
			PropertyDescriptor[] propertyDescriptors = Introspector.getBeanInfo(clazz).getPropertyDescriptors();
			for (PropertyDescriptor propertydesc : propertyDescriptors)
			{
				Method method = propertydesc.getReadMethod();
				if (null != method && null != method.getAnnotation(javax.persistence.Id.class))
				{
					return propertydesc.getName();
				}
			}
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		return "id";
	}

    public static void setQueryParams(Query query, Object[] queryParams)
	{
		if (queryParams != null && queryParams.length > 0)
		{
			for (int i = 0; i < queryParams.length; i++)
			{
				query.setParameter(i, queryParams[i]);
			}
		}
	}

    public static String buildOrderby(LinkedHashMap<String, String> orderby)
	{
		StringBuffer orderbyql = new StringBuffer("");
		if (orderby != null && orderby.size() > 0)
		{
			orderbyql.append(" order by ");
			for (String key : orderby.keySet())
			{
				orderbyql.append("o.").append(key).append(" ").append(orderby.get(key)).append(",");
			}
			orderbyql.deleteCharAt(orderbyql.length() - 1);
		}
		return orderbyql.toString();
	}

    public static <E> String getCountField(Class<E> clazz)
	{
		String out = "o";
		try
		{
			PropertyDescriptor[] propertyDescriptors = Introspector.getBeanInfo(clazz).getPropertyDescriptors();
			for (PropertyDescriptor propertydesc : propertyDescriptors)
			{
				Method method = propertydesc.getReadMethod();
				if (method != null && method.isAnnotationPresent(EmbeddedId.class))
				{
					PropertyDescriptor[] ps = Introspector.getBeanInfo(propertydesc.getPropertyType()).getPropertyDescriptors();
					out = "o." + propertydesc.getName() + "." + (!ps[1].getName().equals("class") ? ps[1].getName() : ps[0].getName());
					break;
				}
			}
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		return out;
	}   
}
