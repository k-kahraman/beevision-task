
Go back to [Main README](../README.md)

---

# Server Side

To gain more info about Server Architecture please check out comments in the files.

## Server Folder Structure

- `├──api` This our POST route. It handles Login and Registration.

- `├──database` Includes database configs and models (User) to be used in Database

- `├──helpers` To validate Login and Registration inputs.

`server.js` is our applications execution point

## Server Scripts
```json
"scripts": {
    "client-install": "npm install --prefix client",
    "start": "node server.js",
    "server": "nodemon server.js",
    "client": "npm start --prefix client",
    "dev": "concurrently \"npm run server\" \"npm run client\""
}
```

Here is our server scripts.

I want to explain why I used `nodemon` here because whenever I changed something inside server files I had to restart whole server and `nodemon` handles it so I wouldn't manually have to shut down the server and restart it.


## Server Modules

Lets check our modules with `npm list`

```
├── bcryptjs@2.4.3
├── body-parser@1.19.0
├── concurrently@6.0.2
├── express@4.17.1
├── is-empty@1.2.0
├── jsonwebtoken@8.5.1
├── kill-port@1.6.1
├── mongoose@5.12.5
├── nodemon@2.0.7
├── passport-jwt@4.0.0
├── passport@0.4.1
└── validator@13.6.0
```

And break them down one by one.

### bcryptjs

This module is used to hash user passwords. I wanted to hash user passwords when passing them to Database that is why i used it.

### body-parser

A middleware module to pass given tokens. It is mainly used when passing data one to another.

### concurrently

This module allow us to concurrently run our client and the server at the same time.

### express

**Express.js** is our back-bone in this application. Express sits on top of Node to make the routing, request handling, and responding easier.

### is-empty

Global function that will come in handy when we use validator.

### jsonwebtoken

This module allow us to use JSON for requests or responses.

### kill-port

To kill any open server process in our custom port (8000 in this case). This way `nodemon` can restart server without any problems.

### mongoose 

As I mentioned earlier I used MongoDB to store and retrieve user data. I use this module interact with MongoDB.

### passport 

Used to authenticate requests, which it does through an extensible set of plugins known as strategies.

### passport-jwt

Because I used JSON Web Tokens this passport strategy is for authenticating with a JSON Web Token (JWT); lets you authenticate endpoints using a JWT.

### validator
To validate inputs (Ex. check for valid email format, confirming passwords match etc.). 


#### Thanks for reading

Now you can read [Client README](../client/client.md) for the Front-End.

###### Written by **Kaan Kahraman**