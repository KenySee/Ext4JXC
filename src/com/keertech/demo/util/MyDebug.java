package com.keertech.demo.util;

import net.sf.json.JSONObject;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.keer.core.bean.jms.CommandMessage;
import com.keer.core.service.jms.IMessageHandler;

public class MyDebug {
	@BeforeClass
	public static void setUpBeforeClass() throws Exception {
	}

	@AfterClass
	public static void tearDownAfterClass() throws Exception {
	}

	@Before
	public void setUp() throws Exception {
	}

	@After
	public void tearDown() throws Exception {

	}
	
	@Test
	public void onTest()  throws Exception{
		ApplicationContext context = new ClassPathXmlApplicationContext(new String[]{"applicationContext.xml","resources/applicationContext-activemq.xml"});
		IMessageHandler handler = (IMessageHandler) context.getBean("defaultMessageManager");
		JSONObject object = new JSONObject();
		CommandMessage message = null;
		//企业信息
		object.put("id", "15623826380");
		object.put("name","科尔软件");
		object.put("code", "keertech");
		message = CommandMessage.createSendMessage("Hx.Enterprise", "update", object.toString());
		handler.ProduceMessage(message);
		
		//用户信息
		object = new JSONObject();
		object.put("id", "50cdf0bc-cca9-4fta-ac5a-1a6704272dfe");
		object.put("enterpriseId", "15623826380");
		object.put("serial", "1");
		object.put("name", "测试用户");
		object.put("username", "test");
		object.put("password", "123");
		object.put("status", 1);
		message = CommandMessage.createSendMessage("Hx.User", "update", object.toString());
		handler.ProduceMessage(message);
		
		//角色信息
		object = new JSONObject();
		object.put("id", "50cdf0bc-cca9-4dfer-ac5a-1a67042sfdfe");
		object.put("name", "测试角色");
		object.put("description", "1");
		object.put("callScope", "department");
		object.put("enterpriseId", "15623826380");
		message = CommandMessage.createSendMessage("Hx.Role", "update", object.toString());
		handler.ProduceMessage(message);
		
		//给用户分配角色
		object = new JSONObject();
		object.put("id", "50cdf0bc-cca9-4fta-ac5a-1a6704272dfe");
		object.put("enterpriseId", "15623826380");
		object.put("serial", "1");
		object.put("name", "测试用户");
		object.put("username", "test");
		object.put("password", "123");
		object.put("status", 1);
		object.put("role", "{id:'50cdf0bc-cca9-4dfer-ac5a-1a67042sfdfe'}");
		message = CommandMessage.createSendMessage("Hx.User", "update", object.toString());
		handler.ProduceMessage(message);		
		
		//报表信息
		object = new JSONObject();
		object.put("id", "75gt53bc-cca9-4fta-ac5a-1a6704272dfe");
		object.put("name", "员工拜访客户统计报表");
		object.put("type", 2);
		object.put("enterprise", "{id:'15623826380'}");
		object.put("sysFile", "{savePath:'ftp://127.0.0.1/com/keertech/hx/opt.zip'}");
		object.put("deptFile", "{savePath:'ftp://127.0.0.1/com/keertech/hx/条状图到饼图.xml'}");
		object.put("subdeptFile", "{savePath:'ftp://127.0.0.1/com/keertech/hx/显示数据库图片字段.xml'}");
		object.put("userFile", "{savePath:'ftp://127.0.0.1/com/keertech/hx/引入自定义脚本函数.xml'}");
		message = CommandMessage.createSendMessage("Hx.RMReport", "update", object.toString());
		handler.ProduceMessage(message);
		
		//角色报表权限信息
		object = new JSONObject();
		object.put("id", "75g87470-cca9-5684-ac5a-1a6704272dfe");
		object.put("report", "{id:'75gt53bc-cca9-4fta-ac5a-1a6704272dfe'}");
		object.put("roleId", "50cdf0bc-cca9-4dfer-ac5a-1a67042sfdfe");
		message = CommandMessage.createSendMessage("Hx.RMRoleReport", "update", object.toString());
		handler.ProduceMessage(message);
		
		System.err.println(handler);
	}
	public void onGig()  throws Exception{
//		System.setProperty("file.encoding", "GBK");
//		URL url = new URL("ftp://127.0.0.1/com/keertech/hx/面积图到普通报表.xml");
//		URLConnection connection = url.openConnection();
//		InputStream in = connection.getInputStream();
//		JaxWsProxyFactoryBean factory = new JaxWsProxyFactoryBean();
//		factory.setServiceClass(IReportPermissionService.class);
//		factory.setAddress("http://localhost:8080/KeertechReport/ws/reportPermissionWS");
//		IReportPermissionService service = (IReportPermissionService) factory.create();
		JSONObject object = new JSONObject();
		String systemUrl =  String.format("ftp://127.0.0.1/com/keertech/hx/opt.zip");
		String departmentUrl = String.format("ftp://127.0.0.1/com/keertech/hx/条状图到饼图1.xml");
		String subDepartmentUrl = String.format("ftp://127.0.0.1/com/keertech/hx/显示数据库图片字段1.xml");
		String userUrl = String.format("ftp://127.0.0.1/com/keertech/hx/引入自定义脚本函数1.xml");
		object.put("id", "50e2631f-088b-4395-9290-86e9450cf5be");
		object.put("name", "测试报表");
		object.put("systemUrl", systemUrl);
		object.put("departmentUrl", departmentUrl);
		object.put("subDepartmentUrl", subDepartmentUrl);
		object.put("userUrl", userUrl);
//		service.PublishReport("sdifheorgheorg", object.toString());
	}
}
