# Strapi application

The script are run on local machine. The registration and login are provided by google Oauth 2. To do that , we must first, add a host name to our Machine : sudo nano /etc/hosts and add 127.0.1.1	thinkit-mac.io to bypass the issue of Authorized Domain needed in editing the app registration in GCP configuration.

This project used web application in creating Oauth client ID for testing. Do not forget to create for IOS for further dive in the project :

![image](https://user-images.githubusercontent.com/35502785/116705986-6bfc0380-a9cd-11eb-91d0-ad6353456717.png)


clone the repo in local and install packages by typing : npm install. Once packages installed, run the command : npm run develop to run the project. 
the credentials to login are : 

email : wassimzeddini@think-it.io 
password : 4everstrapI

to make HTTP request methods , first you need to be logged in. create a user in strapi Interface and then go to http://thinkit-mac.io:1337auth/local on Postman , Post method and put in the Body the identifier and password.

![image](https://user-images.githubusercontent.com/35502785/116704215-70bfb800-a9cb-11eb-829d-301b646a22fc.png)

take the jwt token and use it to make HTTP requests as an authentificated user.

The methods are :

GET http://thinkit-mac.io:1337/users to list all users

GET http://thinkit-mac.io:1337/users/me to get the authentificated user

PUT http://thinkit-mac.io:1337/users to edit attributes.

GET http://thinkit-mac.io:1337/users/random to get a random user for the virtual coffee
