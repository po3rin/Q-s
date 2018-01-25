<template>
  <div>
    <main>
      <img src="../assets/seraWeb.svg"/>
      <h1>Q's</h1>
      <h2>プレゼンターに発信しよう</h2>
      <md-button class="md-raised md-primary" @click="active = true">
        Start
      </md-button>
      <p class="error_text" v-if="roomError">存在しないルーム名でした。。</p>
    </main>
    <md-dialog-prompt
      :md-active.sync="active"
      v-model="value"
      md-title="What's your name?"
      md-input-maxlength="30"
      md-input-placeholder="Type your name..."
      md-confirm-text="Done"
      @md-confirm="onConfirm" />
  </div>
</template>

<script>
export default {
  data: () => ({
    active: false,
    value: null,
    roomError: null
  }),
  methods: {
    onConfirm () {
      if (this.value === 'Seraku0215') {
        this.$router.push({ name: 'Room' })
      } else {
        this.roomError = true
      }
    }
  }
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
  .error_text {
    color: #ff5252;
  }
</style>
