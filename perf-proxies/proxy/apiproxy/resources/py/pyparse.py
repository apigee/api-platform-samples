import json

msg=request.getvariable('message')

obj = json.loads(msg)
obj['Apigized'] = True

out = json.dumps(obj)

request.setvariable('message', out)


