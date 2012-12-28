import urlparse

address = flow.getVariable('address')

p=urlparse.urlparse(address)

scheme = p[0]
path = p[2]
query = p[3]
frag = p[4]

loc = flow.getVariable('OriginalHostHeader')
path = flow.getVariable('proxy.basepath')

newAddress=urlparse.urlunsplit((scheme, loc, path, query, frag))

flow.setVariable('SOAPAddress', newAddress)

