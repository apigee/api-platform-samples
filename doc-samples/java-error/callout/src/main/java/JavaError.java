// Copyright © 2024 Google LLC.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

package com.apigeesample;

import com.apigee.flow.execution.Action;
import com.apigee.flow.execution.ExecutionContext;
import com.apigee.flow.execution.ExecutionResult;
import com.apigee.flow.execution.spi.Execution;
import com.apigee.flow.message.MessageContext;
import org.apache.commons.lang.exception.ExceptionUtils;

public class JavaError implements Execution {

  public ExecutionResult execute(MessageContext messageContext, ExecutionContext executionContext) {

    try {

      String name = messageContext.getRequestMessage().getHeader("username");

      if (name != null && name.length() > 0) {
        messageContext.getMessage().setContent(String.format("Hello, %s!\n", name));
        messageContext.getMessage().removeHeader("username");

      } else {
        throw new RuntimeException("Please specify a username header!");
      }

      return ExecutionResult.SUCCESS;

    } catch (RuntimeException ex) {
      ExecutionResult executionResult = new ExecutionResult(false, Action.ABORT);
      // --Returns custom error message and header
      executionResult.setErrorResponse(ex.getMessage() + "\n");
      executionResult.addErrorResponseHeader("ExceptionClass", ex.getClass().getName());
      // --Sets a flow variable -- may be useful for debugging.
      messageContext.setVariable("JAVA_ERROR", ex.getMessage());
      messageContext.setVariable("JAVA_STACKTRACE", ExceptionUtils.getStackTrace(ex));
      return executionResult;
    }
  }
}
