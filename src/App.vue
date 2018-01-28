<template>
  <div id="app">
    <tool-bar/>
    <router-view/>
  </div>
</template>

<script>
import ToolBar from './components/ToolBar.vue'
export default {
  name: 'app',
  components: {
    ToolBar
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
h1 {
  font-size: 2.0rem;
}
h2 {
  font-size: 1.4rem;
}
h3 {
  font-size: .9rem;
}
</style>
