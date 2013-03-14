/*
 * Copyright (c) 2010, Apigee Corporation.  All rights reserved.
 * Apigee(TM) and the Apigee logo are trademarks or
 * registered trademarks of Apigee Corp. or its subsidiaries.  All other
 * trademarks are the property of their respective owners.
 */

package com.apigee.callout;

import com.apigee.flow.execution.ExecutionContext;
import com.apigee.flow.execution.ExecutionResult;
import com.apigee.flow.execution.IOIntensive;
import com.apigee.flow.execution.spi.Execution;
import com.apigee.flow.message.MessageContext;

/**
 *
 * Use case:                Reading a custom response from a file, looking up cache,
 *                          call over the network to other services, etc
 * When to apply:           If the execution does some blocking IO operations or even if it does
 *                          some activity which does not really affect the flow, then this pattern
 *                          should be applied. The execution of this instance will be carried out
 *                          on a non-IO thread (on a different thread pool). The flow resumes once
 *                          the execution is complete.
 * Influence message flow:  Same as in Simple blocking execution.
 * Miscellaneous:           If the execution takes too long to complete, it may be terminated
 *                          by the thread manager
 */

@IOIntensive
public class SimpleNonBlockingExecutionReturnSuccess implements Execution {

	@Override
	public ExecutionResult execute(MessageContext messageContext, ExecutionContext executionContext) {
        // message modification, IO operations, etc
		messageContext.getMessage().setHeader("Thread", Thread.currentThread().getName());
        messageContext.getMessage().setHeader("SimpleNonBlockingExecutionReturnSuccess", "aye");
        return ExecutionResult.SUCCESS;
	}
}
