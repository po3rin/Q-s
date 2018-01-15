<template>
  <header>
    <md-toolbar>
      <img src="../assets/seraWeb.svg"/>
      <h1 class="md-title"><router-link to="/">SeraWeb</router-link></h1>
      <div class="md-toolbar-section-end">
        <md-button class="md-icon-button">
          <md-icon>
            <a href="https://github.com/po3rin/SeraWeb">
              <img src="./../assets/github.svg">
            </a>
          </md-icon>
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
