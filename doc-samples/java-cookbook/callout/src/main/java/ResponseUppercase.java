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

/* Requires Java11 for the java.net.http.HttpClient */

package com.apigeesample;

import com.apigee.flow.execution.ExecutionContext;
import com.apigee.flow.execution.ExecutionResult;
import com.apigee.flow.execution.spi.Execution;
import com.apigee.flow.message.MessageContext;
import java.util.Map;
import java.util.Set;

public class ResponseUppercase implements Execution {
  private static final String USER_AGENT = "Apigee callout";

  private Map<String, String> properties; // read-only

  public ResponseUppercase(Map<String, String> properties) {
    this.properties = properties;
  }

  public ExecutionResult execute(MessageContext messageContext, ExecutionContext executionContext) {

    try {
      // The ExecutionContext allows access to the flow state.
      // The MessageContext allows seting and getting flow variables and
      // request information - like headers and content.
      messageContext
          .getMessage()
          .setHeader("executionContext.isRequestFlow", executionContext.isRequestFlow());
      messageContext
          .getMessage()
          .setHeader("executionContext.isErrorFlow", executionContext.isErrorFlow());
      messageContext.setVariable("test-variable", "foo");
      messageContext
          .getMessage()
          .setHeader("Test-Header-Foo", messageContext.getVariable("test-variable"));

      messageContext
          .getMessage()
          .setHeader("PROPERTY-CODE", messageContext.getVariable(properties.get("code")));

      Set<String> headers = messageContext.getMessage().getHeaderNames();

      /* Convert header values to uppercase */
      for (String header : headers) {
        String h = messageContext.getMessage().getHeader(header).toUpperCase();
        messageContext.getMessage().setHeader(header, h);
      }

      String content = messageContext.getMessage().getContent();
      messageContext.getMessage().setContent(content.toUpperCase());

      return ExecutionResult.SUCCESS;

    } catch (Exception e) {
      messageContext.setVariable("java-exception", e.toString());
      return ExecutionResult.ABORT;
    }
  }
}
