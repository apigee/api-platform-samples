cd ./java
javac -d bin -sourcepath src -classpath ../lib/expressions-1.0.0.jar:../lib/message-flow-1.0.0.jar:../lib/j2plist-0.3.jar:../lib/jsonic-1.2.0.jar src/com/apigee/utils/jsontoplist/JSONtoPLIST.java
cd bin
java -classpath ../../lib/expressions-1.0.0.jar:../../lib/message-flow-1.0.0.jar:../../lib/j2plist-0.3.jar:../../lib/jsonic-1.2.0.jar:.  com.apigee.utils.jsontoplist.JSONtoPLIST
cd ../..
rm -fr java/bin/*
