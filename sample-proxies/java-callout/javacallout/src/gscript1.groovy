import com.apigee.flow.execution.spi.Execution
import com.apigee.flow.execution.ExecutionResult
import com.apigee.flow.message.MessageContext
import com.apigee.flow.execution.ExecutionContext

class MyGroovyTask implements Execution {
    ExecutionResult execute(MessageContext messageContext, ExecutionContext executionContext) {
        messageContext.getMessage().setHeader("X-Apigee-Demo-GroovyScript", "FromGroovy ");
        return ExecutionResult.SUCCESS;
    }

}

f = new File('/Users/Sandeep/Apigee/pre-sales/Netflix/myfile.txt')
f.write('hello world!')