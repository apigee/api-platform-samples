package com.apigee.netflix.javacallout;

import com.apigee.flow.execution.ExecutionContext;
import com.apigee.flow.execution.ExecutionResult;
import com.apigee.flow.execution.spi.Execution;
import com.apigee.flow.message.MessageContext;

/**
 * Created by Sandeep M.
 * User: Sandeep
 * Date: 3/15/12
 * Time: 12:47 PM
 */
public class JavaCalloutSample implements Execution {
    public ExecutionResult execute(MessageContext messageContext, ExecutionContext executionContext) {
        messageContext.getMessage().setHeader("X-Apigee-Demo-JavaCallout", "FromJavaCallout");
        return ExecutionResult.SUCCESS;
    }
}
