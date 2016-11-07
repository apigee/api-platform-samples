echo "For OAuth, you need to run setup.sh in /setup/provisioning directory to install sample API products, developers and apps in your org."

echo "Do you want to run now? ([yes]/no):"

read provision

if [ -z $provision ] || [ "$provision" = "yes" ]; then
        cd provisioning
	echo "Clearing old data"
	sh ./cleanup.sh
	sh ./setup.sh $1
	cd -
else
	echo "Make sure you provision the ApiProducts and Developers, before testing"
fi

echo "Deployment Completed"
