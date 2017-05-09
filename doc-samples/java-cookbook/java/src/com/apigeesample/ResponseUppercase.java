package com.apigeesample;

import com.apigee.flow.execution.ExecutionContext;
import com.apigee.flow.execution.ExecutionResult;
import com.apigee.flow.execution.spi.Execution;
import com.apigee.flow.message.MessageContext;

import java.util.Set; 

public class ResponseUppercase implements Execution{


	public ExecutionResult execute(MessageContext messageContext, ExecutionContext executionContext) {
		try
		{

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
}