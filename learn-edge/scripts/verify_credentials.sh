printf "\n\nVerifying credentials..."

response=`curl -s -o /dev/null -I -w "%{http_code}" $url/v1/organizations/$org -u $username:$password`

if [ $response -eq 401 ]
then
  printf "\nAuthentication failed!\n"
  printf "\nPlease re-run the script using the right username/password.\n\n"
  exit
elif [ $response -eq 403 ]
then
  printf "\nOrganization $org is invalid!\n"
  printf "Please re-run the script using the right org.\n"
  exit
else
  printf "\nCredentials verfied! Proceeding with deployment.\n\n"
fi
