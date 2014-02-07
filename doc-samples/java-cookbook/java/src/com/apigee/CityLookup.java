package com.apigee;

import com.apigee.flow.execution.ExecutionContext;
import com.apigee.flow.execution.ExecutionResult;
import com.apigee.flow.execution.spi.Execution;
import com.apigee.flow.message.MessageContext;

public class CityLookup implements Execution{


	public ExecutionResult execute(MessageContext messageContext, ExecutionContext executionContext) {
		try
		{

			int woeid = 0;

			String cityName = messageContext.getMessage().getQueryParam("city").toUpperCase();

			if(cityName.equals("MILAN"))
				woeid=718345;
			else if (cityName.equals("ROME"))
				woeid=721943;
			else if (cityName.equals("VENICE"))
				woeid=725746;
			else {
				throw new Exception();
			}

			messageContext.getRequestMessage().setQueryParam("w", woeid);
			return ExecutionResult.SUCCESS;

		} catch (Exception e) {
			return ExecutionResult.ABORT;
		}
	}
}