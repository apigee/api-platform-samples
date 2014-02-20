#!/bin/bash

# This is usually the path to phonegap. If your installation is different, change the path here:

path_to_phonegap="/usr/local/share/npm/bin"

echo "Name your app, followed by [ENTER]:"

read app

echo Creating a PhoneGap app called $app

set -x

$path_to_phonegap/phonegap create $app com.example.$app $app

cd $app

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

$path_to_phonegap/phonegap build ios

echo Installing console plugin

$path_to_phonegap/phonegap plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-console.git

echo Opening in Xcode

open ../platforms/ios/$app.xcodeproj	

