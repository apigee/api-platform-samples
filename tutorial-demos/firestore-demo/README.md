# Apigee Firestore Quickstart & Adapter
This repository contains a quickstart proxy for the [Apige API Management](https://cloud.google.com/apigee) platform to connect to a collection in a [Firestore](https://firebase.google.com/products/firestore) database.  The API provided by the proxy can then be easily used by any REST clients, including [AppSheet](https://cloud.google.com/appsheet) no-code apps.

## Prerequisites
Firestore is a great document database for storing any kind of unstructured data, however we do need some structures to automatically use any database with this quickstart.
* An **id** field in each document, which should match the document key.  This makes identifying the record quick and easy.  It's easiest if this field is also called **id** in the document.
* Supported data types - we only support these data types in the documents for now:
    * string
    * boolean
    * geopoint (locations)
    * timestamp
* Not-supported data types - we don't support these data types, since they would be recursive and be difficult for REST clients like AppSheet to work with.
    * array - It is recommended to have sub-array collections as separate collections (using an id field as link).
    * map - This could be easily added and flattened into the REST response object, but on the other hand makes life difficult for clients like AppSheet, so it is recommended to also model sub-map structures as separate collections (using an id field as link).

As you can see, only primitive data types are supported in the Firestore documents, which makes it easy to map into REST resource structures.

## Quickstart deploy
The fastest way to deploy and spin up an API offering CRUD operations on your Firestore database is to import the **Firestore Quickstart** proxy bundle in Apigee, and then set these properties:

1. Download the [Apigee Firebase Quickstart Proxy 0.8.zip](https://github.com/apigee/api-platform-samples/releases/tag/v0.8-beta) bundle and import it into your Apigee environment.
2. In the default Endpoint PreFlow, replace the following variables in the 1st policy **Set-Firestore-Variables** to your own values:
    1. **GCP_PROJECT** - replace with the GCP project name where your Firestore database is located.
    2. **firestore.key** -  in case the **id** index field isn't named **id** in the Firestore documents (see prerequisites above), then you should set the correct name here (it is recommended to just use **id**).
    3. **GCP_SVC_KEY** - set this to your GCP service account private key (which has the permissions to access Firestore in your GCP project) from the **private_key** field in the key JSON file (beginning with -----BEGIN PRIVATE KEY----- and ending with -----END PRIVATE KEY-----)
    4. **GCP_SVC_EMAIL** - set this to the GCP service account email address from the **client_email** field in the private key JSON file.
3. Change the proxy basepath to something meaningful (default is **/importantstuff**, for no particular reason)
4. Deploy the proxy.  By default an API key is activated for the proxy, disable the 2nd policy in the PreFlow if you want to test without one.  Now you can call https://host/basepath/collection/document to all CRUD operations on your Firestore data, using simple JSON payload messages.  WooHoo!
5. You can also use this proxy as an API data source in an AppSheet app, it will just work.

## Example
An example is deployed for this Firestore data structure:
```json
{
"name": "projects/...",
"fields": {
"funny": {
"booleanValue": true
},
"imagePath": {
"stringValue": "https://dakiniland.files.wordpress.com/2011/05/102-0907085235-simpsons-mutant-fish-blinky.jpg"
},
"location": {
"geoPointValue": {
"latitude": 29.987294,
"longitude": -39.6875
}
},
"punchline": {
"stringValue": "A fiiish."
},
"text": {
"stringValue": "What do you call a fish with 3 eyes?"
},
"id": {
"stringValue": "8ebb59f9"
},
"timestamp": {
"timestampValue": "2020-10-08T13:05:29Z"
}
}
}
```
This proxy then offers REST CRUD APIs with this much nicer structure:
```json
{
"id": "8ebb59f9",
"funny": true,
"text": "What do you call a fish with 3 eyes?",
"imagePath": "https://dakiniland.files.wordpress.com/2011/05/102-0907085235-simpsons-mutant-fish-blinky.jpg",
"timestamp": "2020-10-08T13:05:29Z",
"punchline": "A fiiish.",
"location": "29.987294, -39.6875"
}
```
The OpenAPI spec for the example is under /specs, and can also be used to create an AppSheet app based on the API.

Here is an example AppSheet app using this API proxy: https://www.appsheet.com/Template/mobilepreview?appId=8a3ad802-67c5-4796-9bc6-7dbe1a3ced3d