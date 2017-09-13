package com.keer.core.util;
import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import com.artofsolving.jodconverter.DocumentConverter;
import com.artofsolving.jodconverter.openoffice.connection.OpenOfficeConnection;
import com.artofsolving.jodconverter.openoffice.connection.SocketOpenOfficeConnection;
import com.artofsolving.jodconverter.openoffice.converter.OpenOfficeDocumentConverter;

public class FileConverterUtil {
		/**
		 * 实现文件格式转换
		 * @param sourceFilePath	//源文件路径
		 * @param fullFileName		//源文件名称
		 * @param converterFlag		//源文件转换标志
		 * @throws Exception
		 */
		public String convertFile(String sourceFilePath, String fullFileName, String swfToolsPath, String converterFlag) throws Exception{
			File sourceFile;				//转换源文件
			File pdfFile;					//PDF媒介文件
			File swfFile;					//SWF目标文件
			File createPath;				//创建文件存放目录
			Runtime rt;						//转换命令执行类
			String converFileName = "";		//转换之后的SWF文件名称
			String middleFilePath = sourceFilePath.substring(0, sourceFilePath.length()-1);
			String filePath = (middleFilePath.substring(0, middleFilePath.lastIndexOf("\\"))).substring(0, (middleFilePath.substring(0, middleFilePath.lastIndexOf("\\"))).lastIndexOf("\\"));
			String fileName = "";//PinYinUtil.getPinYinFirstOrAllLetter(fullFileName.substring(0, fullFileName.lastIndexOf(".")), false)[0];
			String fileType = fullFileName.substring(fullFileName.lastIndexOf(".")+1);
			String folderName = middleFilePath.substring(middleFilePath.lastIndexOf("\\")+1);
			
			if(converterFlag.equals("1")){
				converFileName = folderName+"/"+fileName+".swf";
			}else{
				if(fileType.equals("pdf")){
					//PDF格式文件处理方式
					rt = Runtime.getRuntime();
					sourceFile = new File(sourceFilePath+fullFileName);
					//创建SWF文件存放目录
					createPath = new File(filePath+"\\swfFiles\\"+folderName);
					if(!createPath.isDirectory()){
						createPath.mkdir();
					}
					swfFile = new File(filePath+"/swfFiles/"+folderName+"/"+fileName+".swf");
					Process p = rt.exec(swfToolsPath+"/pdf2swf.exe " + sourceFile.getPath() + " -o " + swfFile.getPath() + " -T 9");
					//缓冲区读入内容清理
					clearCache(p.getInputStream(), p.getErrorStream());
					converFileName = folderName+"/"+fileName+".swf";
				}else{
					//非PDF格式文件处理方式
					if(isLegal(fileType.toUpperCase())){
						sourceFile = new File(sourceFilePath+fullFileName);
						pdfFile = new File(filePath+"/swfFiles/"+folderName+"/"+fileName+".pdf");
						swfFile = new File(filePath+"/swfFiles/"+folderName+"/"+fileName+".swf");
						//获取连接对象
						OpenOfficeConnection connection = new SocketOpenOfficeConnection(8100);
						//取得连接
						connection.connect();
						//创建文件格式转换对象
						DocumentConverter converter = new OpenOfficeDocumentConverter(connection);
						//实现文件格式转换
						converter.convert(sourceFile, pdfFile);
						//生成已转换的PDF文件
						pdfFile.createNewFile();
						//释放连接
						connection.disconnect();
						rt = Runtime.getRuntime();
						//执行PDF文件转换成SWF文件命令
						Process p = rt.exec(swfToolsPath+"/pdf2swf.exe " + pdfFile.getPath() + " -o " + swfFile.getPath() + " -T 9");
						//缓冲区读入内容清理
						clearCache(p.getInputStream(), p.getErrorStream());
						//删除中转PDF文件
						if(pdfFile.exists()){
							pdfFile.delete();
						}
						converFileName = folderName+"/"+fileName+".swf";
					}
				}
			}
			return converFileName;
		}
		/**
		 * 清理缓冲区
		 * @param isi
		 * @param ise	
		 */
		public void clearCache(InputStream isi, InputStream ise){
			try {
				final InputStream is1 = isi;
				//启用单独线程清空InputStream缓冲区
				new Thread(new Runnable() {
				    public void run() {
				        BufferedReader br = new BufferedReader(new InputStreamReader(is1)); 
				        try {
							while(br.readLine() != null) ;
						} catch (IOException e) {
							e.printStackTrace();
						}
				    }
				}).start(); 
				//读入ErrorStream缓冲
				BufferedReader br = new BufferedReader(new InputStreamReader(ise));
				//保存缓冲输出结果
				StringBuilder buf = new StringBuilder();
				String line = null;
				try {
					line = br.readLine();
				} catch (IOException e) {
					e.printStackTrace();
				}
				//循环等待进程结束
				while(line != null)
					buf.append(line);
				is1.close();
				ise.close();
				br.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		/**
		 * 判断所转换文件类型是否合法
		 * @param getFileType 	//文件格式
		 * @param fileLegalFlag	//是否合法标志  false：非法   true：合法
		 */
		
		public boolean isLegal(String getFileType){
			boolean fileLegalFlag = false;
			if(getFileType.equals("TXT")){
				fileLegalFlag = true;
			}else if(getFileType.equals("DOC")||getFileType.equals("DOCX")){
				fileLegalFlag = true;
			}else if(getFileType.equals("PPT")||getFileType.equals("PPTX")){
				fileLegalFlag = true;
			}else if(getFileType.equals("XLS")||getFileType.equals("XLSX")){
				fileLegalFlag = true;
			}
			return fileLegalFlag;
		}
}

