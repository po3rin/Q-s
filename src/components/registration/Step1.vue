<template>
  <div>
    <small>あなたの名前を教えてください</small>
    <md-field>
      <label>名前</label>
      <md-input v-model.trim="temporaries.name" required></md-input>
      <span class="md-error">There is an error</span>
    </md-field>
    <small>性別を教えてください</small>
    <md-radio v-model="temporaries.sex" value="男性" class="md-primary">男性</md-radio>
    <md-radio v-model="temporaries.sex" value="女性">女性</md-radio>
    <small>入社日を教えてください</small>
    <md-datepicker v-model="temporaries.date" required/>
    <small>自己紹介を書きましょう</small>
    <md-field>
      <label>一言コメント</label>
      <md-input v-model.trim="temporaries.intro" maxlength="30"></md-input>
    </md-field>
  </div>
</template>

<script>
export default {
  name: 'Step1',
  props: ['temporaries']
}
</script>

<style scoped>
small {
  display: block;
  margin-top: 64px;
}
</style>
