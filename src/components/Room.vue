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
const Ref = FirebaseApp.database().ref('presentation')
let flag = false
const scrollBottom = () => {
  const obj = document.getElementsByClassName('box_post_feed')[0]
  obj.scrollTop = obj.scrollHeight
}
const showNotice = () => {
  const obj = document.getElementsByClassName('box_notice')[0]
  obj.style.opacity = 0.7
}
const invisibleNotice = () => {
  const obj = document.getElementsByClassName('box_notice')[0]
  obj.style.opacity = 0
}
Ref.child('post').on('value', () => {
  setTimeout(scrollBottom, 10)
})
Ref.child('stop').on('value', () => {
  if (!flag) {
    flag = true
  } else {
    showNotice()
    setTimeout(invisibleNotice, 2000)
  }
})
export default {
  data () {
    return {
      required: null,
      text: null,
      hasMessages: false
    }
  },
  firebase: {
    ref: {
      source: Ref,
      asObject: true
    }
  },
  methods: {
    good: function () {
      Ref.child('good').transaction(currentValue => {
        return (currentValue || 0) + 1
      })
    },
    stop: function () {
      Ref.child('stop').transaction(currentValue => {
        return (currentValue || 0) + 1
      })
    },
    post: function () {
      Ref.child('post').push(this.text)
      this.text = null
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
