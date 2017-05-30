package com.apigeesample;

import com.apigee.flow.execution.ExecutionContext;
import com.apigee.flow.execution.ExecutionResult;
import com.apigee.flow.execution.spi.Execution;
import com.apigee.flow.message.MessageContext;

import java.util.Map;

public class JavaProperties implements Execution {

	private Map <String,String> properties; // read-only

	public JavaProperties(Map <String,String> properties) {
	        this.properties = properties;
	}

	public ExecutionResult execute(MessageContext messageContext, ExecutionContext executionContext) {
		
		try {

		    messageContext.getMessage().setHeader("X-PROPERTY-HELLO", this.properties.get("prop"));
            
            return ExecutionResult.SUCCESS;

		} catch (Exception e) {
			return ExecutionResult.ABORT;
		}
	}
}