# Q's

> Real Time Presentation  
> Vue.js + Firebase + Node.js + SlackBot

## Node.js Server Setup
Please read server/README.md

## Firebase Setup

make new dirctory and firbase.js
```
mkdir src/firebase && vi firebase.js
```
add config

```js:firebase.js
import Firebase from 'firebase'
let config = {
  apiKey: '****',
  authDomain: '****',
  databaseURL: '****',
  projectId: '****',
  storageBucket: '****',
  messagingSenderId: '****'
}
const FirebaseApp = Firebase.initializeApp(config)
export default FirebaseApp
```



## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

```
