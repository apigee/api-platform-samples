package com.samples.apigee.phone;
import com.apigee.flow.execution.ExecutionContext;
import com.apigee.flow.execution.ExecutionResult;
import com.apigee.flow.execution.IOIntensive;
import com.apigee.flow.execution.spi.Execution;
import com.apigee.flow.message.MessageContext;

import com.google.i18n.phonenumbers.NumberParseException;
import com.google.i18n.phonenumbers.PhoneNumberUtil;
import com.google.i18n.phonenumbers.PhoneNumberUtil.PhoneNumberFormat;
import com.google.i18n.phonenumbers.Phonenumber.PhoneNumber;

public class ValidateNumber implements Execution{
	
	  
	@Override  
	public ExecutionResult execute(MessageContext messageContext, ExecutionContext executionContext) 
	{
		try
		{
			
			messageContext.setVariable("flow.error", null);
		    	messageContext.setVariable("flow.validatenumbersuccess", "true");
		    
			String mobileNumber =  messageContext.getVariable("flow.mobileNumber");
			String countryCode = messageContext.getVariable("flow.countryCode");
			
			PhoneNumberUtil phoneUtil = PhoneNumberUtil.getInstance();
		    	PhoneNumber mobileNumberProto = phoneUtil.parse(mobileNumber, countryCode);
		    	boolean isValid = phoneUtil.isValidNumber(mobileNumberProto); // returns true

		 	// Produces "+41 44 668 18 00"
		    	String mobileNumberInternational =phoneUtil.format(mobileNumberProto, PhoneNumberFormat.INTERNATIONAL); 
		   	// System.out.println(mobileNumberInternational);
		    	// Produces "044 668 18 00"
		    	String mobileNumberNational = phoneUtil.format(mobileNumberProto, PhoneNumberFormat.NATIONAL);
		   	// System.out.println(mobileNumberNational);
		    	// Produces "+41446681800"
		    	String mobileNumberE164 =phoneUtil.format(mobileNumberProto, PhoneNumberFormat.E164); 
		    	//System.out.println(mobileNumberE164);
		    
		    	messageContext.setVariable("flow.isValidMobileNumber", isValid);		  
		    	messageContext.setVariable("flow.mobileNumberInternational", mobileNumberInternational);
		    	messageContext.setVariable("flow.mobileNumberNational", mobileNumberNational);
		    	messageContext.setVariable("flow.mobileNumberE164", mobileNumberE164);

		    	return ExecutionResult.SUCCESS;
		 } 
			
		catch (NumberParseException e) 
		 {
			messageContext.setVariable("flow.validatenumbersuccess", "false");
			messageContext.setVariable("flow.error", e.toString());
		    	return ExecutionResult.SUCCESS;		 
		 } catch (Exception e) {
			return ExecutionResult.ABORT;
		}
	}	  	  

	public static void main(String [] args) {
		System.out.println("ValidateNumber called");
	
		try {		
		String mobileNumber =  "+41446681800";
		String countryCode = "+41";
			
		PhoneNumberUtil phoneUtil = PhoneNumberUtil.getInstance();
		PhoneNumber mobileNumberProto = phoneUtil.parse(mobileNumber, countryCode);
		
		boolean isValid = phoneUtil.isValidNumber(mobileNumberProto); // returns true
		
		String mobileNumberInternational =phoneUtil.format(mobileNumberProto, PhoneNumberFormat.INTERNATIONAL);
		System.out.println("Mobile International :" + mobileNumberInternational + " is " + isValid);
		String mobileNumberNational = phoneUtil.format(mobileNumberProto, PhoneNumberFormat.NATIONAL);
		System.out.println("Mobile National :" + mobileNumberNational + " is " + isValid);
		String mobileNumberE164 =phoneUtil.format(mobileNumberProto, PhoneNumberFormat.E164); 
		System.out.println("Mobile E164 :" + mobileNumberE164 + " is " + isValid);

		}
		catch (Exception e) {
			e.printStackTrace();
		}
	}
}
