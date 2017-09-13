package com.keer.core.util;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.SocketException;

import org.apache.commons.net.ftp.FTP;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPReply;

public class FTPClientUtil {

	public static boolean downFile(String url, int port,String username, String password, String remotePath,String fileName,OutputStream stream) {
		boolean success = false;  
	    FTPClient ftp = new FTPClient();  
	    try {  
	        int reply;
	        ftp.setControlEncoding("GBK");
	        ftp.connect(url, port);  
	        ftp.login(username, password);
	        reply = ftp.getReplyCode();  
	        if (!FTPReply.isPositiveCompletion(reply)) {  
	            ftp.disconnect();  
	            return success;  
	        }
	        ftp.setFileType(FTP.BINARY_FILE_TYPE);
	        if (remotePath != null && !"".equals(remotePath)){
	        	ftp.changeWorkingDirectory(remotePath);
	        }
	        ftp.retrieveFile(fileName, stream);
            stream.close();
            success = true;
	        ftp.logout();  
	    } catch (IOException e) {  
	        e.printStackTrace();  
	    } finally {  
	        if (ftp.isConnected()) {  
	            try {  
	                ftp.disconnect();  
	            } catch (IOException ioe) {  
	            }  
	        }  
	    }  
	    return success;
	}
	public static Boolean uploadFile(String url,int port,String username,String password,String remotePath,String filename,InputStream input){
		boolean success = false;
		FTPClient ftp = new FTPClient();
		try {
			ftp.setControlEncoding("GBK");
			ftp.connect(url, port);
			ftp.login(username, password);
			int reply = ftp.getReplyCode();  
	        if (!FTPReply.isPositiveCompletion(reply)) {  
	            ftp.disconnect();  
	            return false;  
	        }
	        ftp.setFileType(FTP.BINARY_FILE_TYPE);
	        if (remotePath != null && !"".equals(remotePath)){
	        	Boolean succ = ftp.changeWorkingDirectory(remotePath);
	        	if (!succ){
	    	        String[] arr = remotePath.split("/");
	    	        for(String dir : arr){
	    	        	ftp.makeDirectory(dir);
	    	        	ftp.changeWorkingDirectory(dir);
	    	        }
	        	}
	        }
	        ftp.storeFile(filename, input);
	        input.close();
	        ftp.logout();
	        success = true; 
		}
		catch (SocketException e) {
			e.printStackTrace();
		}
		catch (IOException e) {
			e.printStackTrace();
		}
		finally {
			if (ftp.isConnected()) {  
	            try {  
	                ftp.disconnect();  
	            } 
	            catch (IOException ioe){}  
	        }
		}
        return success;
	}
	public static boolean removeFile(String url, int port,String username, String password, String remotePath,String fileName) {
		boolean success = false;  
	    FTPClient ftp = new FTPClient();  
	    try {  
	        int reply;
	        ftp.setControlEncoding("GBK");
	        ftp.connect(url, port);  
	        ftp.login(username, password);
	        reply = ftp.getReplyCode();  
	        if (!FTPReply.isPositiveCompletion(reply)) {  
	            ftp.disconnect();  
	            return success;  
	        }
	        ftp.setFileType(FTP.BINARY_FILE_TYPE);
	        if (remotePath != null && !"".equals(remotePath)){
	        	ftp.changeWorkingDirectory(remotePath);
	        }
	        ftp.deleteFile(fileName);
        	success = true; 
	        ftp.logout();  
	    } catch (IOException e) {  
	        e.printStackTrace();  
	    } finally {  
	        if (ftp.isConnected()) {  
	            try {  
	                ftp.disconnect();  
	            } catch (IOException ioe) {  
	            }  
	        }  
	    }  
	    return success;
	}
}
