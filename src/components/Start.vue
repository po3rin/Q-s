<template lang="pug">
  div
    main
      .left_box
        .left_box_wrapper
          img.left_box_img(src="../assets/seraWeb.svg")
          h1 Q's
          h2 プレゼンターと繋がろう
          section.left_box_description
            h3 プレゼンターに匿名で発言や質問しながら理解度を共有できるプレゼン支援サービスです。登録不要でチャットルームを作成できます。
          md-button.md-raised.md-primary(@click="active = true") はじめる
          p.error_text(v-if="roomError") 存在しないルーム名です。
      .right_box
       img.right_box_img(src="../assets/screenShot.png")
    md-dialog-prompt(
      :md-active.sync="active"
      v-model="value"
      md-title="ルーム名を入れてください"
      md-input-maxlength="30"
      md-input-placeholder="Type room's name..."
      md-confirm-text="Done"
      @md-confirm="onConfirm")
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
    display: flex;
    padding: 0 18vw;
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
  .error_text {
    color: #ff5252;
  }
  @media (max-width: 1600px) {
    main {
      padding: 0 11vw;
    }
  }
  @media (max-width: 980px) {
    main {
      padding: 0 3vw;
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
