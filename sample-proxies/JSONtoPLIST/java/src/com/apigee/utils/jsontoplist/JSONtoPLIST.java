/**
 * Created on November. 20,2011
 * ClassName: JSONtoXML
 * 
 * @author  Saravanakumar Rajagopal
 */

package com.apigee.utils.jsontoplist;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.Map;

import net.yesiltas.lib.PList;

import com.apigee.flow.execution.ExecutionContext;
import com.apigee.flow.execution.ExecutionResult;
import com.apigee.flow.execution.spi.Execution;
import com.apigee.flow.message.MessageContext;

/**
 * This class converts incoming JSON message content to PLIST content.
 * 
 * 
 * @version 1.0
 * @author Saravanakumar Rajagopal
 *
 */

public class JSONtoPLIST implements Execution{


	public ExecutionResult execute(MessageContext context, ExecutionContext executionContext) {
		
			
		String plistObject = null;
			    
		try 
		{
			
			String jsonContent = context.getMessage().getContent();
			
			if(jsonContent != null)
			{
				PList plist = new PList();
				plistObject = plist.encode(jsonContent);
				context.getMessage().setContent(plistObject);
				context.getMessage().setHeader("Content-Type", "application/x-plist");
				context.getMessage().setHeader("Content-Length", plistObject.length());
				
			}
			
		} 
		catch (Exception e) {
			return ExecutionResult.ABORT;
		}
		
		return ExecutionResult.SUCCESS;
		
	}

	
	private static String readFile( String file ) throws IOException {
	    BufferedReader reader = new BufferedReader( new FileReader (file));
	    String line  = null;
	    StringBuilder stringBuilder = new StringBuilder();
	    String ls = System.getProperty("line.separator");
	    while( ( line = reader.readLine() ) != null ) {
	        stringBuilder.append( line );
	        stringBuilder.append( ls );
	    }
	    return stringBuilder.toString();
	 }

	
	public static void main(String a[])throws Exception{
		String input = "<?xml version=\"1.0\" encoding=\"UTF-8\" ?><HotelReservations><HotelReservation CreateDateTime=\"2009-01-24T17:21:16.137-05:00\" LastModifyDateTime=\"2009-01-24T17:21:16.137-05:00\"> <UniqueID Type=\"14.UIT\" ID=\"ABCD1234\" ID_Context=\"Test\" /><RoomStays><RoomStay><RoomTypes><RoomType NumberOfUnits=\"1\" /></RoomTypes><RoomRates><RoomRate RatePlanCode=\"BAVA\"><Rates><Rate EffectiveDate=\"2012-02-19\" ExpireDate=\"2012-02-20\" RateTimeUnit=\"Day\" /></Rates></RoomRate></RoomRates><BasicPropertyInfo HotelCode=\"NYCMQ\" HotelCodeContext=\"Marriott\" /></RoomStay></RoomStays><ResGlobalInfo><GuestCounts><GuestCount Count=\"2\" /></GuestCounts></ResGlobalInfo></HotelReservation></HotelReservations>";
		//String jsonStr = "{\"Errors\":[],\"Containers\":[{\"ContainerId\":\"de5708aa-645c-4aea-8d8f-6054af9703be\",\"Name\":\"My Workspace\",\"CreatedBy\":null,\"CreatedOn\":\"\/Date(-62135596800000)\/\",\"ModifiedBy\":null,\"ModifiedOn\":\"\/Date(-62135596800000)\/\"}]}";
		String jsonStr = readFile("/Users/rajesh/projects/presales/api-platform-samples/sample-proxies/JSONtoPLIST/input.json");
        PList plist = new PList();
        System.out.println(plist.encode(jsonStr));
		
		
	}

}
