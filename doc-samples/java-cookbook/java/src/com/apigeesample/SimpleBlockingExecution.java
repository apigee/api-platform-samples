/*
 * Copyright (c) 2013, Apigee Corporation.  All rights reserved.
 * Apigee(TM) and the Apigee logo are trademarks or
 * registered trademarks of Apigee Corp. or its subsidiaries.  All other
 * trademarks are the property of their respective owners.
 */

package com.apigeesample;

import com.apigee.flow.execution.ExecutionContext;
import com.apigee.flow.execution.ExecutionResult;
import com.apigee.flow.execution.spi.Execution;
import com.apigee.flow.message.MessageContext;

/**
 *
 * Use case:                Any message modifications
 * When to apply:           If the execution does some non-blocking processing using the
 *                          message context like setting/getting headers or other transport
 *                          properties. While the execution is in progress, there is no other
 *                          activity on the message context.
 * Influence message flow:  If the execution returns "ExecutionResult.SUCCESS",
 *                          the flow proceeds to the next execution. Otherwise (the execution
 *                          throws an Exception or returns "ExecutionResult.FAILURE") the flow
 *                          shifts to the error state and stars executing the error flow.
 *                          Using an instance of ExecutionResult, one can set the custom error
 *                          response and error response headers.
 * Miscellaneous:           Using this pattern if any blocking operations like IO or thread
 *                          synchronization is done, it will result in loss of throughput.
 *
 */
public class SimpleBlockingExecution implements Execution {

    public ExecutionResult execute(MessageContext messageContext, ExecutionContext executionContext) {
        // message modification, etc
        messageContext.getMessage().setHeader("Thread", Thread.currentThread().getName()); // executes in IO thread
        messageContext.getMessage().setHeader("SimpleBlockingExecution", "aye");
        return ExecutionResult.SUCCESS; // flow continues to next execution
    }
}
