<template>
  <main>
    <md-button type="button" class="btn btn-default" @click="login">
      匿名ユーザーでログイン
    </md-button>
  </main>
</template>

<script>
import FirebaseApp from './../../firebase/firebase.js'
export default {
  methods: {
    login () {
      FirebaseApp.auth().signInAnonymously().then(e => {
        // ログイン成功
        console.log(e)
      }).catch((error) => {
        // エラーメッセージ
        var errorCode = error.code
        var errorMessage = error.message
        console.log('エラーメッセージ', errorCode, errorMessage)
      })
    }
  }
}
</script>

<style scoped>

</style>
