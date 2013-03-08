package com.apigee;

import com.apigee.flow.execution.ExecutionContext;
import com.apigee.flow.execution.ExecutionResult;
import com.apigee.flow.execution.spi.Execution;
import com.apigee.flow.message.MessageContext;

public class CityLookup implements Execution{


	public ExecutionResult execute(MessageContext messageContext, ExecutionContext executionContext) {
		try
		{

			int w = 0;
			String cityName = messageContext.getMessage().getQueryParam("city").toUpperCase();

			if(cityName.equals("MILAN"))
				w=718345;
			else if (cityName.equals("ROME"))
				w=721943;
			else if (cityName.equals("VENICE"))
				w=725746;

			if(w>0)
			{ 
				messageContext.getRequestMessage().setQueryParam("w", w);
			}else{
				//default to palo alto
				messageContext.getRequestMessage().setQueryParam("w", 2467861);
			}

			return ExecutionResult.SUCCESS;
		} catch (Exception e) {
			return ExecutionResult.ABORT;
		}
	}
}