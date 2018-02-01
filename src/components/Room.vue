<template lang="pug">
  div
    main.container
      .box_button
        md-button.md-fab.md-primary(@click="good")
          md-icon thumb_up
        p {{ ref.good }}
        md-button.md-fab.md-accent(@click="stop")
          md-icon pan_tool
        p {{ ref.stop }}
        md-button.md-fab.md-primary(@click="showDialog = true")
          md-icon description
      .box_post
        transition-group.md-triple-line.box_post_feed(name="list" tag="md-list")
          md-list-item(v-for="post of ref.post" v-bind:key="post")
            md-icon.md-primary person
            .md-list-item-text
              span.box_post_text {{ post }}
              span.box_post_name.md-list-item-text user
        md-list.md-triple-line
          md-list-item
            md-field
              label Post question!
              md-input(v-model="text")
            md-button.md-raised.md-primary(@click="post") POST
      md-dialog(:md-active.sync="showDialog")
        md-dialog-title Q’s
          p アップロードするファイルを選択してください
          md-field
            label Single
            md-file(v-model="file")
        md-dialog-actions
          md-button.md-primary(@click="showDialog = false") CANCEL
          md-button.md-primary(@click="showDialog = false") OK
      form(novalidate @submit.stop.prevent="showSnackbar = true")
        md-snackbar(:md-position="position" :md-duration="duration", :md-active.sync="showSnackbar" md-persistent)
          span 「待って！」ボタンが押されました。
          md-button.md-primary(@click='showSnackbar = false') OK
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import FirebaseApp from './../firebase/firebase.js'
const db = FirebaseApp.database()
export default {
  data () {
    return {
      required: null,
      text: null,
      file: null,
      hasMessages: false,
      showDialog: false,
      roomName: this.$route.params.name,
      showSnackbar: false,
      position: 'center',
      duration: 3000
    }
  },
  computed: {
    ...mapGetters([
      'status'
    ])
  },
  firebase: function () {
    return {
      ref: {
        source: db.ref(`room/${this.roomName}`),
        asObject: true
      }
    }
  },
  mounted () {
    this.$firebaseRefs.ref.child('post').on('value', () => {
      setTimeout(this.scrollBottom, 10)
    })
    this.$firebaseRefs.ref.child('stop').on('value', () => {
      this.showSnackbar = true
    })
  },
  methods: {
    good: function () {
      this.$firebaseRefs.ref.child('good').transaction(currentValue => {
        return (currentValue || 0) + 1
      })
    },
    stop: function () {
      this.$firebaseRefs.ref.child('stop').transaction(currentValue => {
        return (currentValue || 0) + 1
      })
      axios.post(`****************/「待って！」が押されました`)
    },
    post: function () {
      this.$firebaseRefs.ref.child('post').push(this.text)
      axios.post(`****************/${this.text}`)
      this.text = null
    },
    scrollBottom: () => {
      const obj = document.getElementsByClassName('box_post_feed')[0]
      obj.scrollTop = obj.scrollHeight
    }
  }
}
</script>

<style scoped>
.md-field {
  margin: auto;
}
.box {
  padding: 24px;
}
.box_button {
  position: fixed;
  top: 10%;
  left: 3%;
  padding: 64px 0;
}
.box_post {
  text-align: left;
  padding: 24px calc(6% + 72px);
}
.box_post_feed {
  overflow-y: scroll;
  height: calc(100vh - 240px);
}
.box_post_text {
  font-size: 1rem;
}
.box_post_name {
  color: gray;
  font-size: .9rem;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.box_notice {
  align-items: center;
  background: black;
  display: flex;
  height: 68px;
  justify-content: center;
  opacity: 0;
  position: fixed;
  top: 64px;
  width: 100%;
  z-index: 5;
  transition: all 1s;
}
.notice_text {
  color: white;
  font-size: 1.1rem;
}
@media (max-width:480px) {
  .box_post {
    padding: 24px 0 24px calc(6% + 50px);
  }
  .box_post_text {
    font-size: .8rem;
  }
  .box_button {
    position: fixed;
    top: 10%;
    left: 0;
    padding: 64px 0;
  }
}
</style>
