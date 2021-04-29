Go back to [Main README](../README.md)

---

# Client Side

To gain more info about Client Architecture please check out comments in the files.

## Client Folder Structure

I'll be focusing mainly on `src` folder, because all of the development went there.

- `├──src` our applications execution point `App.js` is located here. Also `store.js` to store our application state

- `├──components` Every component used in `App.js` is located here.

- `├──actions` `authActions.js` located here which is allow us to talk with Back-End

- `├──reducers` Reducers are pure functions that specify how application state should change in response to an action.

`App.js` is our applications execution point

## Client Modules

Lets check our modules with `npm list`. There are other modules too but I want to focus to these ones.

```
├── axios@0.21.1
├── classnames@2.3.1
├── google-maps-react@2.0.6
├── jwt-decode@3.1.2
├── react-blink-text@1.0.5
├── react-dom@17.0.2
├── react-redux@7.2.4
├── react-router-dom@5.2.0
├── react@17.0.2
├── redux-thunk@2.3.0
├── redux@4.1.0
```

### axios 

Promise based HTTP client for making requests to our Back-End. Can think of it like REST.

### classnames

Used for conditional classes in our JSX

### google-maps-react

To create map and place markers to it. And show info regarding to marker.

### jwt-decode 

As I mentioned in Back-End I used JWT for data flow throughout application. This module allow us to decode our jwt so we can get user data from it.

### react-redux 

Allows us to use Redux with React.

### react-router-dom

Used for routing purposes.

### redux

Used to manage state between components. This is a bit overkill in this a project in this size but I wanted to use it.

### redux-thunk

Middleware for Redux that allows us to directly access the dispatch method to make asynchronous calls from our action

###### Written by **Kaan Kahraman**