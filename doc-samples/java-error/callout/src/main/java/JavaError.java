package com.apigeesample;

import com.apigee.flow.execution.ExecutionContext;
import com.apigee.flow.execution.ExecutionResult;
import com.apigee.flow.execution.spi.Execution;
import com.apigee.flow.message.MessageContext;
import com.apigee.flow.execution.Action;

import org.apache.commons.lang.exception.ExceptionUtils;


public class JavaError implements Execution {

	public ExecutionResult execute(MessageContext messageContext, ExecutionContext executionContext) {
		
		try {

			String name = messageContext.getMessage().getHeader("username");

			if (name != null && name.length()>0) {
				messageContext.getMessage().setContent("Hello, " + name + "!");
				messageContext.getMessage().removeHeader("username");

			} else {
				throw new RuntimeException("Please specify a name parameter!");
			}
            
            return ExecutionResult.SUCCESS;

		 } catch (RuntimeException ex) {
            ExecutionResult executionResult = new ExecutionResult(false, Action.ABORT);
            //--Returns custom error message and header
            executionResult.setErrorResponse(ex.getMessage());
            executionResult.addErrorResponseHeader("ExceptionClass", ex.getClass().getName());
            //--Sets a flow variable -- may be useful for debugging. 
            messageContext.setVariable("JAVA_ERROR", ex.getMessage());
            messageContext.setVariable("JAVA_STACKTRACE", ExceptionUtils.getStackTrace(ex));
            return executionResult;
        }
	}
}