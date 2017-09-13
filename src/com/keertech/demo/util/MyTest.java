package com.keertech.demo.util;


import java.net.URL;

import net.sf.json.JSONObject;

import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.keer.core.bean.jms.CommandMessage;
import com.keer.core.service.jms.IMessageHandler;

public class MyTest {
	@BeforeClass
	public static void setUpBeforeClass() throws Exception {
	}

	@AfterClass
	public static void tearDownAfterClass() throws Exception {
	}

	@Before
	public void setUp() throws Exception {
	}

	@Test
	public void tearDown() throws Exception {
		Object object = 1;
		object = Boolean.parseBoolean(object != null ? object.toString() : null);
		System.err.println(object);
	}
	
	public void onDebugger() throws Exception {
		URL url = Thread.currentThread().getContextClassLoader().getResource("");
		String reportPath = url.getPath();
//		String str = "file:/E:/360Downloads/workspaces/.metadata/.plugins/org.eclipse.wst.server.core/tmp0/wtpwebapps/KeertechReport/WEB-INF/classes/";
		Integer limit = reportPath.indexOf("WEB-INF");
		reportPath = reportPath.substring(1,limit);
		System.out.println(System.getProperty("user.dir"));  
//		String where = "statusdg=:status or scategory=:category or nlevel=:level";
//		List<String> namedParam = new ArrayList<String>();
//		int len = where.length();
//		for(int i = 0; i < where.length(); i++){
//			char c = where.charAt(i);
//			if (c == ':'){
//				Integer endIndex = where.substring(i+1).indexOf(" ");
//				String param = where.substring(i+1, i+(endIndex > 0 ? endIndex+1 : (len-i)));
//				namedParam.add(param);
//			}
//		}
//		for(String str : namedParam){
//			System.err.println(str);
//		}
//		System.err.println("show");
	}
	
	public void onGig()  throws Exception{
		ApplicationContext context = new ClassPathXmlApplicationContext(new String[]{"applicationContext.xml","resources/applicationContext-activemq.xml"});
		IMessageHandler handler = (IMessageHandler) context.getBean("defaultMessageManager");
		JSONObject object = new JSONObject();
		CommandMessage message = null;
		//企业信息
		object.put("id", "50cdf0bc-cca9-4fta-ac5a-1a8768dfe");
		object.put("name","科尔软件");
		object.put("code", "KenySee");
		message = CommandMessage.createSendMessage("Enterprise", "remove", object.toString());
		handler.ProduceMessage(message);
		
		//用户信息
		object = new JSONObject();
		object.put("id", "50cdf0bc-cca9-4fta-ac5a-1a6704272dfe");
		object.put("enterpriseId", "50cdf0bc-cca9-4fta-ac5a-1a8768dfe");
		object.put("serial", "1");
		object.put("name", "测试用户");
		object.put("username", "test");
		object.put("password", "123");
		object.put("status", 1);
		message = CommandMessage.createSendMessage("User", "update", object.toString());
		handler.ProduceMessage(message);
		
		//角色信息
		object = new JSONObject();
		object.put("id", "50cdf0bc-cca9-4dfer-ac5a-1a67042sfdfe");
		object.put("name", "测试角色");
		object.put("description", "1");
		object.put("callScope", "system");
		object.put("enterpriseId", "50cdf0bc-cca9-4fta-ac5a-1a8768dfe");
		message = CommandMessage.createSendMessage("Role", "update", object.toString());
		handler.ProduceMessage(message);
		
		//给用户分配角色
		object = new JSONObject();
		object.put("id", "50cdf0bc-cca9-4fta-ac5a-1a6704272dfe");
		object.put("enterpriseId", "50cdf0bc-cca9-4fta-ac5a-1a8768dfe");
		object.put("serial", "1");
		object.put("name", "测试用户");
		object.put("username", "test");
		object.put("password", "123");
		object.put("status", 1);
		object.put("role", "{id:'50cdf0bc-cca9-4dfer-ac5a-1a67042sfdfe'}");
		message = CommandMessage.createSendMessage("User", "update", object.toString());
		handler.ProduceMessage(message);		
		
		//报表信息
		object = new JSONObject();
		object.put("id", "75gt53bc-cca9-4fta-ac5a-1a6704272dfe");
		object.put("name", "员工拜访客户统计报表");
		object.put("type", 2);
		object.put("enterprise", "{id:'50cdf0bc-cca9-4fta-ac5a-1a8768dfe'}");
		object.put("sysFile", "{savePath:'ftp://127.0.0.1/com/keertech/hx/员工拜访客户统计报表.zip'}");
		object.put("deptFile", "{savePath:'ftp://127.0.0.1/com/keertech/hx/条状图到饼图.xml'}");
		object.put("subdeptFile", "{savePath:'ftp://127.0.0.1/com/keertech/hx/显示数据库图片字段.xml'}");
		object.put("userFile", "{savePath:'ftp://127.0.0.1/com/keertech/hx/引入自定义脚本函数.xml'}");
		message = CommandMessage.createSendMessage("RMReport", "update", object.toString());
		handler.ProduceMessage(message);
		
		//角色报表权限信息
		object = new JSONObject();
		object.put("id", "75g87470-cca9-5684-ac5a-1a6704272dfe");
		object.put("report", "{id:'75gt53bc-cca9-4fta-ac5a-1a6704272dfe'}");
		object.put("roleId", "50cdf0bc-cca9-4dfer-ac5a-1a67042sfdfe");
		message = CommandMessage.createSendMessage("RMRoleReport", "update", object.toString());
		handler.ProduceMessage(message);
		
		System.err.println(handler);
	}
}
