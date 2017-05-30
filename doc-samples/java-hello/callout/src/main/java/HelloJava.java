package com.apigeesample;

import com.apigee.flow.execution.ExecutionContext;
import com.apigee.flow.execution.ExecutionResult;
import com.apigee.flow.execution.spi.Execution;
import com.apigee.flow.message.MessageContext;


public class HelloJava implements Execution {

	public ExecutionResult execute(MessageContext messageContext, ExecutionContext executionContext) {
		
		try {

			// Your code here.
            
            return ExecutionResult.SUCCESS;

		} catch (Exception e) {
			return ExecutionResult.ABORT;
		}
	}
}