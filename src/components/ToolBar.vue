<template lang="pug">
  header
    md-toolbar
      img(src="../assets/seraWeb.svg")
      h1.md-title Q’s
      .md-toolbar-section-end
        md-button.md-icon-button
          a(href="https://github.com/po3rin/Q-s" target="_blank")
            md-icon
              img(src="./../assets/github.svg")
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  methods: {
    ...mapMutations([
      'changeAuth'
    ])
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
