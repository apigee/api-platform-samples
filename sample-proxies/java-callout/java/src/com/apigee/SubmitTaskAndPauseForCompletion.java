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
import com.apigee.flow.message.Message;
import com.apigee.flow.message.MessageContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.security.auth.Subject;

/**
 *
 * Use case:                Purely non-blocking activity based on notifications
 *                          (callback or event driven)
 * When to apply:           The use cases are similar to Simple Non-blocking but task is
 *                          expected to take a long time to complete and is hence designed
 *                          to receive a callback on completion i.e. until
 * Influence message flow:
 * Miscellaneous:           If the callback is not made for some time, it might lead to out of
 *                          memory conditions since the message context will have to be kept alive.
 *
 */

public class SubmitTaskAndPauseForCompletion implements Execution {

    private static final Logger logger = LoggerFactory.getLogger("SubmitTaskAndPauseForCompletion");

	@Override
	public ExecutionResult execute(MessageContext messageContext, ExecutionContext executionContext) {
		Message message = messageContext.getMessage();
		// Blocking code here
		// ...
		//
		executionContext.submitTask(new AuthenticationTask(), new PostAuthenticationCallback(), executionContext);
		// This line resumes after the submitTask is done.
        //...
		return ExecutionResult.PAUSE; // causes the flow to pause until resumed explicitly again
	}

	class AuthenticationTask implements Runnable {
		Subject subject;

        @Override
		public void run() {
			// Lookup LDAP server and invoke the server
            // do service callout
            logger.debug("SubmitTaskAndPauseForCompletion.AuthenticationTask.run()");
		}
		
		public Subject getSubject() {
			return subject;
		}
	}
	
	class PostAuthenticationCallback implements Callback {

        @Override
		/**
		 * Post this method invocation, resume of flow is invoked by the framework
		 */
		public void callback(Runnable task, Object handback) {
			AuthenticationTask authTask = (AuthenticationTask) task;
			Subject subject = authTask.getSubject();
            logger.debug("SubmitTaskAndPauseForCompletion.PostAuthenticationCallback.callback()");
		}
	}
}