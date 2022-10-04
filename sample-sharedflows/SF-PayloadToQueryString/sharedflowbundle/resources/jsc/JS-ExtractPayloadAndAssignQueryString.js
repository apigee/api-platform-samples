if(request.content !== null || request.content !== ''){
    try{
        var fields = JSON.parse(context.getVariable("SF-PayloadToQueryStrin.fields"));
        payload = JSON.parse(request.content);
        
        for(var i in fields){
            var field = fields[i];
            if(payload[field] !== undefined){
                print("[INFO] found key: " + field);
                context.setVariable("request.queryparam."+field, payload[field]);
                delete payload[field];
            }
            else{
                print("[WARN] didn't find key: " + field);
            }
        }
    }catch(e){
        print("[ERROR] Exception Occured:\t" + e);
    }
    finally{
        print("[INFO] Assigning the new payload to the request object");
        context.setVariable("request.content", JSON.stringify(payload));
    }
}