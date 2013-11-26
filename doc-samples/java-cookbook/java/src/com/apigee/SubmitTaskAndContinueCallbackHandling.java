/*
 * Copyright (c) 2010, Apigee Corporation.  All rights reserved.
 * Apigee(TM) and the Apigee logo are trademarks or
 * registered trademarks of Apigee Corp. or its subsidiaries.  All other
 * trademarks are the property of their respective owners.
 */

package com.apigee.callout;

import com.apigee.flow.execution.Callback;
import com.apigee.flow.execution.ExecutionContext;
import com.apigee.flow.execution.ExecutionResult;
import com.apigee.flow.execution.spi.Execution;
import com.apigee.flow.message.MessageContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 *
 * Use case:                Reporting metrics to an analytics server, logging to disk, etc
 * When to apply:           If the execution does a lot of activities, some of whose result
 *                          do not influence the flow of the request in any way. The execution
 *                          context is used to submit such tasks. The flow continues without
 *                          waiting for the completion of the task. If any error handling is
 *                          required for the submitted task, a callback instance can be used.
 * Influence message flow:  Same as in Simple Blocking execution.
 * Miscellaneous:           It is important that the submitted tasks do not hold any reference
 *                          to the message context or to the execution context. If the task is
 *                          a long running task, it might lead to out of memory conditions and
 *                          it is also possible that while the task is running, the message flow
 *                          has already completed.
 */

public class SubmitTaskAndContinueCallbackHandling implements Execution {

    private static final Logger logger = LoggerFactory.getLogger("SubmitTaskAndContinueCallbackHandling");

    public ExecutionResult execute(final MessageContext messageContext, final ExecutionContext executionContext) {
        executionContext.submitTask(new Task(), new CallbackTask(), "handback");
        return ExecutionResult.SUCCESS;
    }

    private static class Task implements Runnable {

        public void run() {
            // report to analytics server
            // log to disk
            logger.debug("SubmitTaskAndContinueCallbackHandling.Task.run()");
        }
    }

    private static class CallbackTask implements Callback {

        public void callback(Runnable task, Object handback) {
            // log completion results to disk
            logger.debug("SubmitTaskAndContinueCallbackHandling.CallbackTask.run()");
        }
    }
}