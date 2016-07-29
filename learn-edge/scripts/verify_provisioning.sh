


printf "\nDid you run the provisioning script: api-platform-samples/learn-edge/provisioning/setup.sh? [y/n](y): "
read setup

if [ -z $setup ] || [ "$setup" = "y" ]; then
  printf ""
else  
  printf "\nYou must run this script before continuing. See the README for details. Press Return to exit."
  read
  exit
fi