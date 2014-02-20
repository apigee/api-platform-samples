#!/bin/bash

echo "Name your app, followed by [ENTER]:"

read app

echo Creating $app

/usr/local/share/npm/bin/cordova create $app com.example.$app $app

cd $app 

echo Adding iOS platform

/usr/local/share/npm/bin/cordova platform add ios

echo Installing console plugin

/usr/local/share/npm/bin/cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-console.git

echo Changing dir to new app

cd ./$app

echo Changing dir to www and installing JQuery Mobile

cd ./www

wget http://code.jquery.com/jquery-1.10.2.min.js

wget http://code.jquery.com/mobile/1.3.2/jquery.mobile-1.3.2.min.js

wget http://code.jquery.com/mobile/1.3.2/jquery.mobile-1.3.2.min.css

rm ./index.html

cp ../../index.html ./

echo Building iOS project

/usr/local/share/npm/bin/phonegap build ios

echo Opening in Xcode

open ../platforms/ios/$app.xcodeproj	

