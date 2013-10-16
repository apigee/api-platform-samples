cd ./java
javac -d bin -sourcepath src -classpath ../lib/libphonenumber-5.8.jar:../lib/expressions-1.0.0.jar:../lib/message-flow-1.0.0.jar: src/com/samples/apigee/phone/ValidateNumber.java
cd bin
java -classpath ../../lib/libphonenumber-5.8.jar:../../lib/expressions-1.0.0.jar:../../lib/message-flow-1.0.0.jar:.  com.samples.apigee.phone.ValidateNumber
cd ../..
rm -fr java/bin/*
