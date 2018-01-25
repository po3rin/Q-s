<template>
  <header>
    <md-toolbar>
      <img src="../assets/seraWeb.svg"/>
      <h1 class="md-title"><router-link to="/">Q's</router-link></h1>
      <div class="md-toolbar-section-end">
        <md-button class="md-icon-button">
          <a href="https://github.com/po3rin/SeraWeb">
            <md-icon>
              <img src="./../assets/github.svg">
            </md-icon>
          </a>
        </md-button>
      </div>
    </md-toolbar>
  </header>

</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    greet: function () {
      alert('Hello !')
    }
  }
}
</script>

<style scoped>
  img {
    width: 64px;
  }
  a{
    color: #2c3e50;
    text-decoration: none;
  }
  a:hover {
    text-decoration: none;
  }
</style>
