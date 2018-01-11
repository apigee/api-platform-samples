'use strict';

var join = require('path').join;
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var shell = require('shelljs');
//var apigeeSdk = require('apigee-sdk-mgmt-api');

module.exports = yeoman.generators.Base.extend({
  constructor: function() {
    yeoman.generators.Base.apply(this, arguments);
    this.pkg = require('../package.json');
  },

  askFor: function() {
    var done = this.async();
    // welcome message
    if (!this.options['skip-welcome-message']) {
      this.log(require('yosay')());
      this.log(chalk.magenta(
        'Sample Generator of OAuth Authorization Code Grant Type Proxies.'
      ));
    }

    var prompts = [{
        type: 'input',
        name: 'uname',
        message: 'Your user name',
        required: true,
        store   : true,
        default: 'example@example.com' // Default to current folder name
      }, {
        type: 'password',
        name: 'password',
        message: 'Password',
        required: true,
        default: 'none' // Default to current folder name
      }, {
        type: 'input',
        name: 'mgmtapiurl',
        message: 'Management API URL Endpoint',
        required: true,
        store   : true,
        default: 'https://api.enterprise.apigee.com' // Default to current folder name
      }, {
        type: 'input',
        name: 'orgname',
        message: 'Organization Name',
        required: true,
        store   : true,
      }, {
        type: 'input',
        name: 'envname',
        message: 'Environment Name',
        required: true,
        store   : true,
      }

    ];

    this.prompt(prompts, function(answers) {
      this.uname = answers.uname;
      this.orgname = answers.orgname;
      this.envname = answers.envname;
      this.password= answers.password;
      this.mgmtapiurl = answers.mgmtapiurl;
      this.callbackurl = 'https://'+this.orgname+'-'+this.envname+'.apigee.net/web/callback';
      done();
    }.bind(this));
  },

//copy dir structures from template dir.  These all happen async.
  apiProxySetup: function() {
    //copy user-mgmt-v1
    this.bulkDirectory('user-mgmt-v1/apiproxy', 'user-mgmt-v1/apiproxy');

    //copy oauth2
    this.bulkDirectory('oauth2/apiproxy', 'oauth2/apiproxy');

    //copy provisioning and login-app
    this.bulkDirectory('provisioning', 'provisioning');
    this.bulkDirectory('login-app/apiproxy', 'login-app/apiproxy');

    //copy webserver-app
    this.bulkDirectory('webserver-app/apiproxy', 'webserver-app/apiproxy');

  },


//change configurations and deploy everything.  These steps all run in sync.
  install: function(){

    // configure login-app and provisioning
    shell.sed('-i','ENVNAME', this.envname, 'login-app/apiproxy/resources/node/config/config.js');
    shell.sed('-i','ORGNAME', this.orgname, 'login-app/apiproxy/resources/node/config/config.js');

    shell.sed('-i','CALLBACKURL', this.callbackurl, 'provisioning/webserver-app.xml');

    // deploy user-mgmt-v1
    shell.cd('user-mgmt-v1');
	shell.exec('apigeetool deployproxy -u '+this.uname+' -p \''+this.password+'\' -o '+this.orgname+' -e '+this.envname+ ' -n user-mgmt-v1 -d .');

    // deploy oauth2
    shell.cd('../oauth2');
    shell.exec('apigeetool deployproxy -u '+this.uname+' -p \''+this.password+'\' -o '+this.orgname+' -e '+this.envname+ ' -n oauth2 -d .');

    // provision login-app
    shell.cd('../provisioning');
    shell.exec('./provision-login-app.sh '+this.uname+' \''+this.password+'\' '+this.orgname+' '+this.envname+' '+this.mgmtapiurl);

    // npm install for login-app
    shell.cd('../login-app/apiproxy/resources/node');
    shell.exec('npm install');

    // deploy login-app
    shell.cd('../../..');
    shell.exec('apigeetool deployproxy -u '+this.uname+' -p \''+this.password+'\' -o '+this.orgname+' -e '+this.envname+ ' -n login-app -d . -U');

    // provision webserver
    shell.cd('../provisioning');
    shell.exec('./provision-webserver.sh '+this.uname+' \''+this.password+'\' '+this.orgname+' '+this.envname+' '+this.mgmtapiurl);

    //capture clientID and secret from last step and put in webserver-app bundle
    var webserverappkey = shell.exec("curl -H 'Accept: application/json' -u '"+this.uname+":"+this.password+"' "+this.mgmtapiurl+"/v1/o/"+this.orgname+"/developers/webdev@example.com/apps/webserver-app 2>/dev/null | grep consumerKey | awk -F '\"' '{ print $4 }'").output;
    var webserverappsecret = shell.exec("curl -H 'Accept: application/json' -u '"+this.uname+":"+this.password+"' "+this.mgmtapiurl+"/v1/o/"+this.orgname+"/developers/webdev@example.com/apps/webserver-app 2>/dev/null | grep consumerSecret | awk -F '\"' '{ print $4 }'").output;
    // remove trailing whitespace
    webserverappkey = webserverappkey.replace(/\n$/, "");
    webserverappsecret = webserverappsecret.replace(/\n$/, "");

    shell.cd('..');
    //configure webserver-app bundle
    shell.sed('-i','WEBSERVERAPPKEY', webserverappkey, 'webserver-app/apiproxy/policies/SetConfigurationVariables.xml');
    shell.sed('-i','WEBSERVERAPPSECRET', webserverappsecret, 'webserver-app/apiproxy/policies/SetConfigurationVariables.xml');
    shell.sed('-i','ENVNAME', this.envname, 'webserver-app/apiproxy/policies/SetConfigurationVariables.xml');
    shell.sed('-i','ORGNAME', this.orgname, 'webserver-app/apiproxy/policies/SetConfigurationVariables.xml');

    // configure webserver-app HTML INDEX
    shell.sed('-i','WEBSERVERAPPKEY', webserverappkey, 'webserver-app/apiproxy/policies/HTMLIndex.xml');
    shell.sed('-i','ENVNAME', this.envname, 'webserver-app/apiproxy/policies/HTMLIndex.xml');
    shell.sed('-i','ORGNAME', this.orgname, 'webserver-app/apiproxy/policies/HTMLIndex.xml');
    shell.sed('-i','CALLBACKURL', this.callbackurl, 'webserver-app/apiproxy/policies/HTMLIndex.xml');

    shell.cd('webserver-app');
    //deploy webserver-app bundle
    shell.exec('apigeetool deployproxy -u '+this.uname+' -p \''+this.password+'\' -o '+this.orgname+' -e '+this.envname+ ' -n webserver-app -d .');

  },

});
