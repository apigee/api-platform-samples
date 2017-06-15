#!/bin/bash

cd callout
mvn clean package
cd ..
./deploy.sh
