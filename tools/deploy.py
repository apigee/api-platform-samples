#!/usr/bin/env python

import base64
import getopt
import httplib
import json
import re
import os
import sys
import StringIO
import urlparse
import xml.dom.minidom
import zipfile


def httpCall(verb, uri, headers, body):
    if httpScheme == 'https':
        conn = httplib.HTTPSConnection(httpHost)
    else:
        conn = httplib.HTTPConnection(httpHost)

    if headers == None:
        hdrs = dict()
    else:
        hdrs = headers

    hdrs['Authorization'] = 'Basic %s' % base64.b64encode(UserPW)
    conn.request(verb, uri, body, hdrs)

    return conn.getresponse()


def getElementText(n):
    c = n.firstChild
    str = StringIO.StringIO()

    while c != None:
        if c.nodeType == xml.dom.Node.TEXT_NODE:
            str.write(c.data)
        c = c.nextSibling

    return str.getvalue().strip()


def getElementVal(n, name):
    c = n.firstChild

    while c != None:
        if c.nodeName == name:
            return getElementText(c)
        c = c.nextSibling

    return None


# Return TRUE if any component of the file path contains a directory name that
# starts with a "." like '.svn', but not '.' or '..'
def pathContainsDot(p):
    c = re.compile('\.\w+')

    for pc in p.split('/'):
        if c.match(pc) != None:
            return True

    return False


def getDeployments():
    # Print info on deployments
    hdrs = {'Accept': 'application/xml'}
    resp = httpCall('GET',
            '/v1/organizations/%s/apis/%s/deployments' \
                % (Organization, Name),
            hdrs, None)

    if resp.status != 200:
        return None

    ret = list()
    deployments = xml.dom.minidom.parse(resp)
    environments = deployments.getElementsByTagName('Environment')

    for env in environments:
        envName = env.getAttribute('name')
        revisions = env.getElementsByTagName('Revision')
        for rev in revisions:
            revNum = int(rev.getAttribute('name'))
            error = None
            state = getElementVal(rev, 'State')
            basePaths = rev.getElementsByTagName('BasePath')

            if len(basePaths) > 0:
                basePath = getElementText(basePaths[0])
            else:
                basePath = 'unknown'

            # svrs = rev.getElementsByTagName('Server')
            status = {'environment': envName,
                    'revision': revNum,
                    'basePath': basePath,
                    'state': state}

            if error != None:
                status['error'] = error

            ret.append(status)

    return ret


def printDeployments(dep):
    for d in dep:
        print 'Environment: %s' % d['environment']
        print '  Revision: %i BasePath = %s' % (d['revision'], d['basePath'])
        print '  State: %s' % d['state']
        if 'error' in d:
            print '  Error: %s' % d['error']

ApigeeHost = 'https://api.enterprise.apigee.com'
UserPW = None
Directory = None
Organization = None
Environment = None
Name = None
BasePath = '/'
ShouldDeploy = True

Options = 'h:u:d:e:n:p:o:i:z:'

opts = getopt.getopt(sys.argv[1:], Options)[0]

for o in opts:
    if o[0] == '-n':
        Name = o[1]
    elif o[0] == '-o':
        Organization = o[1]
    elif o[0] == '-h':
        ApigeeHost = o[1]
    elif o[0] == '-d':
        Directory = o[1]
    elif o[0] == '-e':
        Environment = o[1]
    elif o[0] == '-p':
        BasePath = o[1]
    elif o[0] == '-u':
        UserPW = o[1]
    elif o[0] == '-i':
        ShouldDeploy = False
    elif o[0] == '-z':
        ZipFile = o[1]

if UserPW == None or \
        (Directory == None and ZipFile == None) or \
        Environment == None or \
        Name == None or \
        Organization == None:
    print """Usage: deploy -n [name] (-d [directory name] | -z [zipfile])
              -e [environment] -u [username:password] -o [organization]
              [-p [base path] -h [apigee API url] -i]
    base path defaults to "/"
    Apigee URL defaults to "https://api.enterprise.apigee.com"
    -i denotes to import only and not actually deploy
    """
    sys.exit(1)

url = urlparse.urlparse(ApigeeHost)
httpScheme = url[0]
httpHost = url[1]

body = None

if Directory != None:
    # Construct a ZIPped copy of the bundle in memory
    tf = StringIO.StringIO()
    zipout = zipfile.ZipFile(tf, 'w')

    dirList = os.walk(Directory)
    for dirEntry in dirList:
        if not pathContainsDot(dirEntry[0]):
            for fileEntry in dirEntry[2]:
                if not fileEntry.endswith('~'):
                    fn = os.path.join(dirEntry[0], fileEntry)
                    en = os.path.join(
                            os.path.relpath(dirEntry[0], Directory),
                            fileEntry)
                    print 'Writing %s to %s' % (fn, en)
                    zipout.write(fn, en)

    zipout.close()
    body = tf.getvalue()
elif ZipFile != None:
    f = open(ZipFile, 'r')
    body = f.read()
    f.close()

# Upload the bundle to the API
hdrs = {'Content-Type': 'application/octet-stream',
        'Accept': 'application/json'}
uri = '/v1/organizations/%s/apis?action=import&name=%s' % \
            (Organization, Name)
resp = httpCall('POST', uri, hdrs, body)

if resp.status != 200 and resp.status != 201:
    print 'Import failed to %s with status %i:\n%s' % \
            (uri, resp.status, resp.read())
    sys.exit(2)

deployment = json.load(resp)
revision = int(deployment['revision'])

print 'Imported new proxy version %i' % revision

if ShouldDeploy:
    # Undeploy duplicates
    deps = getDeployments()
    for d in deps:
        if d['environment'] == Environment and \
            d['basePath'] == BasePath and \
            d['revision'] != revision:
            print 'Undeploying revision %i in same environment and path:' % \
                    d['revision']
            conn = httplib.HTTPSConnection(httpHost)
            resp = httpCall('POST',
                    ('/v1/organizations/%s/apis/%s/deployments' +
                            '?action=undeploy' +
                            '&env=%s' +
                            '&revision=%i') % \
                        (Organization, Name, Environment, d['revision']),
                 None, None)
            if resp.status != 200 and resp.status != 204:
                print 'Error %i on undeployment:\n%s' % \
                        (resp.status, resp.read())
                        
    # Deploy the bundle
    hdrs = {'Accept': 'application/json'}
    resp = httpCall('POST',
        ('/v1/organizations/%s/apis/%s/deployments' +
                '?action=deploy' +
                '&env=%s' +
                '&revision=%i' +
                '&basepath=%s') % \
            (Organization, Name, Environment, revision, BasePath),
        hdrs, None)

    if resp.status != 200 and resp.status != 201:
        print 'Deploy failed with status %i:\n%s' % (resp.status, resp.read())
        sys.exit(2)

deps = getDeployments()
printDeployments(deps)
