<template lang="pug">
  div
    main
      .left_box
        .left_box_wrapper
          img.left_box_img(src="../assets/seraWeb.svg")
          h1 Q’s (beta)
          h2 距離が縮まるプレゼンを
          section.left_box_description
            h3 聞き手をおいてけぼりにすることはもうありません。匿名チャットで質問を受け付けたり、「待って！」ボタンでプレゼンスピードを調整できます。もちろん登録は不要です。
          md-button.md-raised.md-primary(@click="handleDialog")
            h3 はじめる
      .right_box
        transition(name="slide-fade")
          img.right_box_img(src="../assets/screenShot.png" v-if="showImg")
    md-dialog(:md-active.sync="showDialog")
      md-dialog-title Q’s
      md-tabs(md-alignment="centered")

        md-tab(md-label="聞き手として入室" @click="flag = 'join'" @change="joinValidate")
          p 参加するルーム名を入れてください
          md-field(:class="checkJoinEmpty")
            label Room Name
            md-input(v-model="joinRoomName" required)

        md-tab(md-label="プレゼンターとして入室" @click="flag = 'auth'" @change="authValidate")
          p 入室するルーム名を入れてください
          md-field(:class="checkAuthEmpty")
            label Room Name
            md-input(v-model="authRoomName" required)
          p パスワードを入力してください
          md-field(:class="checkAuthEmpty")
            label password
            md-input(v-model="authPassword" type="password" required)
        //- md-tab(md-label="ルーム作成" @click="flag = 'make'" @change="makeValidate")
        //-   p 作成するルーム名を入れてください
        //-   md-field(:class="checkMakeEmpty")
        //-     label Room Name
        //-     md-input(v-model="makeRoomName" required)
        //-   p パスワードを入力してください
        //-   md-field(:class="checkMakeEmpty")
        //-     label password
        //-     md-input(v-model="makePassword" type="password" required)
        //-   p.red_text データ保存期間は1日です
      md-dialog-actions
        md-button.md-primary(@click="showDialog = false") CANCEL
        md-button.md-primary(@click="check") OK
</template>

<script>
import { mapMutations } from 'vuex'
import FirebaseApp from './../firebase/firebase.js'
const db = FirebaseApp.database()
export default {
  data: () => ({
    showImg: false,
    showDialog: false,
    makeError: false,
    authError: false,
    joinError: false,
    makeRoomName: null,
    authRoomName: null,
    joinRoomName: null,
    authPassword: null,
    makePassword: null,
    flag: 'join'
  }),
  firebase: function () {
    return {
      ref: {
        source: db.ref(`room/`),
        asObject: true
      }
    }
  },
  computed: {
    checkJoinEmpty () {
      return {
        'md-invalid': this.joinError
      }
    },
    checkAuthEmpty () {
      return {
        'md-invalid': this.authError
      }
    },
    checkMakeEmpty () {
      return {
        'md-invalid': this.makeError
      }
    }
  },
  mounted () {
    this.showImg = true
  },
  methods: {
    ...mapMutations([
      'changeAuth'
    ]),
    handleDialog () {
      this.flag = 'join'
      this.showDialog = true
    },
    joinValidate () {
      if (!this.joinRoomName) {
        this.joinError = true
      } else {
        this.joinError = false
      }
    },
    authValidate () {
      if (!this.authRoomName) {
        this.authError = true
      } else {
        this.authError = false
      }
    },
    makeValidate () {
      if (!this.makeRoomName) {
        this.makeError = true
      } else {
        this.makeError = false
      }
    },
    check () {
      if (this.flag === 'join') {
        this.joinRoom()
      }
      if (this.flag === 'auth') {
        this.authRoom()
      }
      if (this.flag === 'make') {
        this.makeRoom()
      }
    },
    joinRoom () {
      if (this.ref[this.joinRoomName]) {
        this.changeAuth('listener')
        this.$router.push({ path: `Room/${this.joinRoomName}` })
      } else {
        this.joinError = true
      }
    },
    authRoom () {
      if (!this.ref[this.authRoomName]) {
        this.authError = true
        return
      }
      if (this.ref[this.authRoomName].password === this.authPassword) {
        this.changeAuth('speaker')
        this.$router.push({ path: `Room/${this.authRoomName}` })
        return
      }
      this.authError = true
    },
    makeRoom () {
      if (!this.makeRoomName || !this.makePassword) {
        this.makeError = true
        return
      }
      if (this.ref[this.makeRoomName]) {
        this.makeError = true
        return
      }
      this.$firebaseRefs.ref.child(`${this.makeRoomName}/password`).transaction(currentValue => {
        return this.makePassword
      })
      this.$firebaseRefs.ref.child(`${this.makeRoomName}/post`).push(`ルーム「${this.makeRoomName}」作成されました`)
      this.$firebaseRefs.ref.child(`${this.makeRoomName}/good`).transaction(currentValue => {
        return 0
      })
      this.$firebaseRefs.ref.child(`${this.makeRoomName}/stop`).transaction(currentValue => {
        return 0
      })
      this.changeAuth('speaker')
      this.$router.push({ path: `Room/${this.makeRoomName}` })
    }
  }
}
</script>

<style scoped>
  .md-tab {
    padding: 36px;
  }
  main {
    display: flex;
    padding: 24px 18vw;
    height: calc(80vh);
  }
  .left_box, .right_box {
    align-items: center;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    padding: 24px;
    width: 40%;
  }
  .right_box {
    width: 60%;
  }
  .left_box_img {
    width: 128px;
  }
  .right_box_img {
    box-shadow: 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12);
    border-radius: 1%;
    max-width: 580px;
    min-width: 380px;
    width: 100%;
  }
  .left_box_description {
    background-color: rgba(93, 193, 51, .2);
    margin: 24px 0;
    max-width: 420px;
    padding: 20px;
    text-align: left;
  }
  a{
    color: #2c3e50;
    text-decoration: none;
  }
  a:hover {
    text-decoration: none;
  }
  .red_text {
    color: #ff5252;
    display: block;
    padding: 24px 0;
  }
  .slide-fade-enter-active {
  transition: all .7s ease;
  }
  .slide-fade-enter {
    transform: translateX(24px);
    opacity: 0;
  }
  @media (max-width: 1600px) {
    main {
      padding: 24px 11vw;
    }
  }
  @media (max-width: 980px) {
    main {
      padding: 24px 3vw;
    }
  }
  @media (max-width: 700px) {
    .right_box {
      display: none;
    }
    .left_box {
      width: 100%;
    }
  }
</style>
