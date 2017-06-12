package com.apigeesample;

import com.apigee.flow.execution.ExecutionContext;
import com.apigee.flow.execution.ExecutionResult;
import com.apigee.flow.execution.spi.Execution;
import com.apigee.flow.message.MessageContext;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import javax.net.ssl.HttpsURLConnection;

import java.util.Set; 
import java.util.Map;

public class ResponseUppercase implements Execution {

	private Map <String,String> properties; // read-only
	private final String USER_AGENT = "Mozilla/5.0";

	public ResponseUppercase(Map <String,String> properties) {
	        this.properties = properties;
	}

	public ExecutionResult execute(MessageContext messageContext, ExecutionContext executionContext) {
		
		try
		{


		this.sendGet();

			//In the executionContext, we (a) query the flow state (b) set and get a flow variable
			messageContext.getMessage().setHeader("executionContext.isRequestFlow", executionContext.isRequestFlow());
		    messageContext.getMessage().setHeader("executionContext.isErrorFlow", executionContext.isErrorFlow());
		    messageContext.setVariable("X-TEST-VAR-FOO", "foo");
		    messageContext.getMessage().setHeader("X-TEST-VAR-FOO", messageContext.getVariable("X-TEST-VAR-FOO"));



			messageContext.getMessage().setHeader("X-STATUS-PROPERTY", messageContext.getVariable(properties.get("code")));
		    messageContext.getMessage().setHeader("X-HOST-PROPERTY", messageContext.getVariable(properties.get("host")));

			Set<String> headers = messageContext.getMessage().getHeaderNames();

			for (String header : headers) {
				String h = messageContext.getMessage().getHeader(header).toUpperCase();
			    messageContext.getMessage().setHeader(header, h);
		    }

		    String content = messageContext.getMessage().getContent();
		    messageContext.getMessage().setContent(content.toUpperCase());
            
            return ExecutionResult.SUCCESS;

		} catch (Exception e) {
			return ExecutionResult.ABORT;
		}
	}


	private void sendGet() throws Exception {

		String url = "http://www.google.com/search?q=mkyong";

		URL obj = new URL(url);
		HttpURLConnection con = (HttpURLConnection) obj.openConnection();

		// optional default is GET
		con.setRequestMethod("GET");

		//add request header
		con.setRequestProperty("User-Agent", USER_AGENT);

		int responseCode = con.getResponseCode();
		System.out.println("\nSending 'GET' request to URL : " + url);
		System.out.println("Response Code : " + responseCode);

		BufferedReader in = new BufferedReader(
		        new InputStreamReader(con.getInputStream()));
		String inputLine;
		StringBuffer response = new StringBuffer();

		while ((inputLine = in.readLine()) != null) {
			response.append(inputLine);
		}
		in.close();

		//print result
		System.out.println(response.toString());

	}
}