<template>
  <div id="app">
    <tool-bar/>
    <router-view/>
  </div>
</template>

<script>
import FirebaseApp from './firebase/firebase.js'
import ToolBar from './components/ToolBar.vue'
export default {
  name: 'app',
  components: {
    ToolBar
  },
  created () {
    FirebaseApp.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        console.log('is login.')
      } else {
        // No user is signed in.
        console.log('No user is signed in.')
      }
    })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
h1{
  font-size: 2.0rem;
}
h2{
  font-size: 1rem;
}
</style>
