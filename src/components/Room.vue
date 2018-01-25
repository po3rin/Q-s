<template lang="pug">
  div
    main.container
      .box_button
        md-button.md-fab.md-primary(@click="good")
          md-icon thumb_up
        p {{ ref.good }}
        md-button.md-fab.md-accent(@click="stop")
          md-icon pause
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
</template>
<script>
import FirebaseApp from './../firebase/firebase.js'
let Ref = FirebaseApp.database().ref('presentation')
const scrollBottom = () => {
  const obj = document.getElementsByClassName('box_post_feed')[0]
  obj.scrollTop = obj.scrollHeight
}
Ref.child('post').on('value', () => {
  console.log('qq')
  setTimeout(scrollBottom, 10)
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
      setTimeout(scrollBottom, 10)
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
  font-size: 1.2rem;
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
.list-enter, .list-leave-to /* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(30px);
}
</style>
