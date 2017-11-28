package com.keertech.demo.util;

import com.google.gson.Gson;
import com.qiniu.common.Zone;
import com.qiniu.http.Response;
import com.qiniu.storage.UploadManager;
import com.qiniu.storage.model.DefaultPutRet;
import com.qiniu.util.Auth;
import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import freemarker.template.TemplateExceptionHandler;

import java.io.*;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

public class PhantomjsUtils {
    public static String accessKey = "wjwYxf8h5jQOC8QrWhnoBBXNdczuSiMzKycJB5WN";
    public static String secretKey = "lOei7RqoxaGGUBdO48G2f20EdCRa0SZWMYOO8xM2";
    public static String bucket = "zallhy-gam";
    public static Auth auth = Auth.create(accessKey, secretKey);
    public static com.qiniu.storage.Configuration cfg = new com.qiniu.storage.Configuration(Zone.zone0());
    public static UploadManager uploadManager = new UploadManager(cfg);

    public static String buildPath(String path){
        File directory = new File("");
        String fullPath = null;
        try{
            fullPath = directory.getAbsolutePath()+"/"+path;
        }catch (Exception e){}
        return fullPath;
    }

    public static String ScreenShot(Map model) throws Exception{
//        String tplPath = buildPath("web/ftl");
//        File htmlFile = File.createTempFile("temp", ".html");
        File pngFile = File.createTempFile("temp", ".png");
//        try {
//            Configuration cfg = new Configuration();
//            cfg.setEncoding(Locale.getDefault(), "utf-8");
//            cfg.setDirectoryForTemplateLoading(new File(tplPath));
//            cfg.setTemplateExceptionHandler(TemplateExceptionHandler.RETHROW_HANDLER);
//            BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(htmlFile),"UTF-8"));
//            try {
//                Template template = cfg.getTemplate("screenshot.ftl");
//                template.process(model,writer);
//            }
//            catch (TemplateException e) {
//                e.printStackTrace();
//            }
//            writer.flush();
//            writer.close();
//        } catch (IOException e) {
//            e.printStackTrace();
//        }

        String BLANK = "  ";
        Process process = Runtime.getRuntime().exec(
                "phantomjs" + BLANK //你的phantomjs.exe路径
                        + buildPath("web/ftl/screenshot.js") + BLANK //就是上文中那段javascript脚本的存放路径
                        + "http://localhost:8981/wx/model/929907657730514944/wz" + BLANK //你的目标url地址
                        + pngFile.getCanonicalPath());//你的图片输出路径
        InputStream is = process.getInputStream();
        BufferedReader br = new BufferedReader(new InputStreamReader(is));
        StringBuffer sbf = new StringBuffer();
        String tmp = "";
        while((tmp = br.readLine())!=null){
            sbf.append(tmp);
        }
        String upToken = auth.uploadToken(bucket);
        String key = null;
        Response response = uploadManager.put(pngFile.getCanonicalPath(), key, upToken);
        DefaultPutRet putRet = new Gson().fromJson(response.bodyString(), DefaultPutRet.class);
        System.out.println(String.format("{\"success\":true,\"url\":\"https://gam.zallhy.com/%s\"}",putRet.key));
        pngFile.deleteOnExit();
        return putRet.key;
    }

    public static void main(String[] args) throws Exception{
        HashMap model = new HashMap();
        String key = ScreenShot(model);
        System.out.println(key);
    }
}
