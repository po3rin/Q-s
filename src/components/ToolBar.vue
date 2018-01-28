<template lang="pug">
  header
    md-toolbar
      router-link(to="/")
        img(src="../assets/seraWeb.svg")
      router-link(to="/")
        h1.md-title Q’s
      .md-toolbar-section-end
        md-button.md-icon-button
          a(href="https://github.com/po3rin/Q-s")
            md-icon
              img(src="./../assets/github.svg")
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
  .md-toolbar {
    z-index: 100;
  }
</style>
