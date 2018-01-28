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
      .box_post
        transition-group.md-triple-line.box_post_feed(name="list" tag="md-list")
          md-list-item.list-item(v-for="post of ref.post" v-bind:key="post")
            md-icon.md-primary person
            .md-list-item-text
              p.box_post_text {{ post }}
              span.box_post_name user
        md-list.md-triple-line
          md-list-item
            md-field
              label Post question!
              md-input(v-model="text")
            md-button.md-raised.md-primary(@click="post") 投稿
      .box_notice
        p.notice_text 「待って！」がおされました。
</template>
<script>
import FirebaseApp from './../firebase/firebase.js'
const db = FirebaseApp.database()
export default {
  data () {
    return {
      required: null,
      text: null,
      hasMessages: false,
      roomName: this.$route.params.name
    }
  },
  firebase: function () {
    return {
      ref: {
        source: db.ref(`room/${this.roomName}`),
        asObject: true
      }
    }
  },
  created () {
    if (!this.ref.post) {
      this.$firebaseRefs.ref.child('post').push(`ルーム「${this.roomName}」作成されました`)
      this.$firebaseRefs.ref.child('good').transaction(currentValue => {
        return 0
      })
      this.$firebaseRefs.ref.child('stop').transaction(currentValue => {
        return 0
      })
    }
    let flag = false
    this.$firebaseRefs.ref.child('post').on('value', () => {
      setTimeout(this.scrollBottom, 10)
    })
    this.$firebaseRefs.ref.child('stop').on('value', () => {
      if (!flag) {
        flag = true
      } else {
        this.showNotice()
        setTimeout(this.invisibleNotice, 2000)
      }
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
    },
    post: function () {
      this.$firebaseRefs.ref.child('post').push(this.text)
      this.text = null
    },
    scrollBottom: () => {
      const obj = document.getElementsByClassName('box_post_feed')[0]
      obj.scrollTop = obj.scrollHeight
    },
    showNotice: () => {
      const obj = document.getElementsByClassName('box_notice')[0]
      obj.style.opacity = 0.7
    },
    invisibleNotice: () => {
      const obj = document.getElementsByClassName('box_notice')[0]
      obj.style.opacity = 0
    }
  }
}
</script>

<style scoped>
.md-field {
  margin: auto;
}
.md-list {
  border: 1px solid rgba(#000, .12);
  vertical-align: top;
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
  overflow: scroll;
  height: calc(100vh - 220px);
}
.box_post_text {
  font-size: 1rem;
}
.box_post_name {
  color: gray;
  font-size: .9rem;
}
.list-item {
  display: inline-block;
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
    padding: 24px 0 24px 0;
  }
}
</style>
