package com.keer.core.web;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.Map;
import java.util.Random;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;

import com.keer.core.base.JSONAction;
import com.keer.core.bean.base.Role;
import com.keer.core.bean.base.User;
import com.keer.core.bean.comm.SystemVar;
import com.keer.core.bean.organization.Department;
import com.keer.core.bean.organization.UserMember;
import com.keer.core.bean.organization.member.DeptMember;
import com.keer.core.dao.SQLBuilder;
import com.keer.core.secure.Context;
import com.keer.core.service.IUserBizService;


@SuppressWarnings({"rawtypes","serial"})
public class LoginAction extends JSONAction {

	@Autowired
	private IUserBizService userBizService;
	
	private String username;
	private String password;
	private String loginname;
	private String rolename;
	private String postname;
	private String code;

	/**
	 * 系统参数设置
	 */
	private String systemvar;
	
	/**
	 * 登录成员信息
	 */
	private String loginuser;
	
	protected final static String LOGIN_CODE = "_loginCode";
	
	protected IUserBizService getUserBizService(){
		return this.userBizService;
	}
	
	public void loadSystemVar() throws Exception{
		
	}
	
	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String execute() throws Exception{
		Integer count = dao.findRecordCount(User.class, new SQLBuilder());
		if (count > 0){
			HttpSession session = request.getSession();		
			UserMember user = Context.getCurrentUser(session);
			if (user != null){
				user = dao.find(UserMember.class, user.getId(), null);
				loginname=user.getUser().getName();//当前用户名称
				username=user.getUser().getLoginname();
				if(user.getParent()!=null){
					Department postMember=dao.find(Department.class, getBeanString(user.getParent()),null);
					postname=postMember.getName();//用户成员岗位名称
				}
				Role role = user.getRole();
				if (role != null){
					role = this.dao.find(Role.class,user.getRole().getId(),null);
					rolename = role.getName();
				}
				setLoginuser(user.getJson().toString());
				
				setLoginuser(getLoginuser().replace("\"", "'"));
				
				this.loadSystemVar();
				
				/**
				 * 读取系统配置参数
				 */
				Map<String, Object> systemMap = SystemVar.getSystemVer();
				
				systemvar = this.JSONParse(systemMap).toString().replace("\"", "'");
				
				return "main";
			}
		}
		return "login";
	}
	public String verify() throws Exception{
		if (username == null || username.equals("")) {
			throw new Exception("用户名不能为空");
		}
		if (password == null || password.equals("")) {
			throw new Exception("密码不能为空");
		}
		Integer msgCode = userBizService.LoginValidate(username, password);
		if (userBizService.LoginSuccess(msgCode)){
			User user = userBizService.findUserByLoginName(username);
			DeptMember member = user.getMainMember();
			if (member != null && member instanceof UserMember){
				Context.setCurrentUser(this.request.getSession(), (UserMember)member);
				this.response("{\"success\":true}");
				return "main";
			}
			else {
				if (user.getIsAdmin()){
					throw new Exception("管理员没有设置用户成员，无法登录");
				}
				else {
					throw new Exception("当前用户没有设置用户成员，无法登录");
				}
			}
		}
		else {
			String msg = userBizService.ValidateMessage(msgCode);
			throw new Exception(msg);
		}
	}
	
	public void generatorCode(){
		BufferedImage image = new BufferedImage(80, 30, BufferedImage.TYPE_INT_BGR);
		Graphics2D g = (Graphics2D) image.getGraphics();
		g.setColor(getRandColor(200, 250));
		g.fillRect(0, 0, 80, 30);
		Random random = new Random();
		StringBuffer sb = new StringBuffer();
		g.setFont(new Font("Times New Roman", Font.PLAIN, 18));
		// 随机产生155条干扰线，使图象中的认证码不易被其它程序探测到
		g.setColor(getRandColor(160, 200));
		for (int i = 0; i < 155; i++) {
			int x = random.nextInt(80);
			int y = random.nextInt(30);
			int xl = random.nextInt(12);
			int yl = random.nextInt(12);
			g.drawLine(x, y, x + xl, y + yl);
		}

		// 取随机产生的认证码(4位数字)
		for (int i = 0; i < 4; i++) {
			String rand = String.valueOf(random.nextInt(10));
			sb.append(rand);
			// 将认证码显示到图象中
			g.setColor(new Color(20 + random.nextInt(110), 20 + random.nextInt(110), 20 + random.nextInt(110)));// 调用函数出来的颜色相同，可能是因为种子太接近，所以只能直接生成
			g.drawString(rand, 13 * i + 15, 22);
		}

		// 图象生效
		g.dispose();
		this.request.getSession().setAttribute(LOGIN_CODE, sb.toString());
		this.response.setHeader("Pragma", "No-cache");
		this.response.setHeader("Cache-Control", "no-cache");
		this.response.setDateHeader("Expires", 0);
		this.response.setContentType("image/gif");
		try {
			ImageIO.write(image, "png", this.response.getOutputStream());
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	private Color getRandColor(int fc, int bc) {// 给定范围获得随机颜色
		Random random = new Random();
		if (fc > 255)
			fc = 255;
		if (bc > 255)
			bc = 255;
		int r = fc + random.nextInt(bc - fc);
		int g = fc + random.nextInt(bc - fc);
		int b = fc + random.nextInt(bc - fc);
		return new Color(r, g, b);
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getUsername() {
		return username;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPassword() {
		return password;
	}

	public void setRolename(String rolename) {
		this.rolename = rolename;
	}

	public String getRolename() {
		return rolename;
	}

	public String getPostname() {
		return postname;
	}

	public void setPostname(String postname) {
		this.postname = postname;
	}

	public String getLoginname() {
		return loginname;
	}

	public void setLoginname(String loginname) {
		this.loginname = loginname;
	}

	public String getSystemvar() {
		return systemvar;
	}

	public void setSystemvar(String systemvar) {
		this.systemvar = systemvar;
	}

	public String getLoginuser() {
		return loginuser;
	}

	public void setLoginuser(String loginuser) {
		this.loginuser = loginuser;
	}
	
}
