<template lang="pug">
  div
    main.container
      .box_button
        md-button.md-fab.md-primary(@click="good")
          md-tooltip(md-direction="right" md-delay="300") いいね！
          md-icon thumb_up
        p {{ ref.good }}
        md-button.md-fab.md-primary(@click="stop")
          md-tooltip(md-direction="right" md-delay="300") 待って！
          md-icon pan_tool
        p {{ ref.stop }}
        md-button.md-fab.md-primary(v-if="status == 'speaker'" @click="showDialog = true")
          md-tooltip(md-direction="right" md-delay="300") ファイル共有
          md-icon description
        p(v-if="status == 'speaker'") File
        md-button.md-fab.md-accent(@click="logout")
          md-tooltip(md-direction="right" md-delay="300") 退出
          md-icon subdirectory_arrow_left
        p Logout
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
            label ファイルを選択してください
            md-file(v-model="beforeUpdateFile" type="file" @change="setfile($event)")
        md-dialog-actions
          md-button.md-primary(@click="showDialog = false") CANCEL
          md-button.md-primary(@click="upload") OK
      md-snackbar(:md-position="position" :md-duration="duration" :md-active.sync="stopSnackbar")
        span 「待って！」ボタンが押されました
        md-button.md-primary(@click='stopSnackbar = false') OK
      md-snackbar(:md-position="position" :md-duration="Infinity" :md-active.sync="fileSnackbar")
        span {{ afterUpdateFile }} がアップされました
        md-button.md-primary(@click='download') DOWNLOAD
        md-button.md-accent(@click='fileSnackbar = false') CANCEL
</template>
<script>
import axios from 'axios'
import { mapMutations, mapGetters } from 'vuex'
import FirebaseApp from './../firebase/firebase.js'
const db = FirebaseApp.database()
const storage = FirebaseApp.storage()
export default {
  data () {
    return {
      required: null,
      text: null,
      beforeUpdateFile: null,
      afterUpdateFile: null,
      hasMessages: false,
      showDialog: false,
      roomName: this.$route.params.name,
      stopSnackbar: false,
      fileSnackbar: false,
      position: 'center',
      duration: 3000,
      stopflag: false,
      fileflag: false,
      getFile: null,
      downloadURL: null
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
      if (this.stopflag) {
        this.stopSnackbar = true
      } else {
        this.stopflag = true
      }
    })
    this.$firebaseRefs.ref.child('fileName').on('value', snapshot => {
      if (this.fileflag) {
        this.fileSnackbar = true
        this.afterUpdateFile = snapshot.val()
      } else {
        this.fileflag = true
      }
    })
  },
  methods: {
    ...mapMutations([
      'changeAuth'
    ]),
    good: function () {
      this.$firebaseRefs.ref.child('good').transaction(currentValue => {
        return (currentValue || 0) + 1
      })
    },
    stop: function () {
      this.$firebaseRefs.ref.child('stop').transaction(currentValue => {
        return (currentValue || 0) + 1
      })
      axios.post(`https://q-sslackbot-onvktkeouf.now.sh/「待って！」が押されました`)
    },
    post: function () {
      this.$firebaseRefs.ref.child('post').push(this.text)
      axios.post(`https://q-sslackbot-onvktkeouf.now.sh/${this.text}`)
      this.text = null
    },
    setfile: function (e) {
      this.getFile = e.target.files[0]
    },
    upload: function () {
      this.showDialog = false
      const storageRef = storage.ref(this.getFile.name)
      storageRef.put(this.getFile).then(result => {
        this.$firebaseRefs.ref.child('fileName').transaction(currentValue => {
          return this.beforeUpdateFile
        })
      }).catch(err => console.log(err))
    },
    download: function () {
      var storageRef = storage.ref(`${this.afterUpdateFile}`)
      storageRef.getDownloadURL().then(function (url) {
        window.location.href = `${url}`
      })
      this.fileSnackbar = false
    },
    logout: function () {
      this.$router.push({ name: `Start` })
      this.changeAuth(null)
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
