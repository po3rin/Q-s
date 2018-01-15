<template>
  <div>
    <main>
      <img src="../assets/seraWeb.svg"/>
      <h1>SeraWeb</h1>
      <h2>SerakuのWebエンジニアとの交流を始めよう！</h2>
      <router-link to="/registration">
        <md-button class="md-raised md-primary">
          Start making
        </md-button>
      </router-link>
      <router-link to="/login">
        <md-button class="md-raised md-primary">
          Login
        </md-button>
      </router-link>
    </main>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  main {
    padding: 36px;
  }
  img {
    width: 128px;
  }
  a{
    color: #2c3e50;
    text-decoration: none;
  }
  a:hover {
    text-decoration: none;
  }
</style>
