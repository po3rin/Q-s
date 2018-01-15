<template>
  <div>
    <p>入力結果を確認して下さい</p>
    <md-card>
      <md-ripple>
        <md-card-header>
          <div class="md-title">{{ temporaries.name }}</div>
          <div class="md-subhead">{{ temporaries.sex }}</div>
          <div class="md-subhead">{{ $moment(temporaries.date).format('YYYY[年]MM[月]DD[日]') }}</div>
        </md-card-header>

        <md-card-content>
          {{ temporaries.intro }}
        </md-card-content>
        <md-card-content>
          <md-chip class="md-primary" v-for="data in temporaries.tags" :key="data">{{ data }}</md-chip>
        </md-card-content>
      </md-ripple>
    </md-card>
  </div>
</template>

<script>
export default {
  name: 'Step3',
  props: ['temporaries']
}
</script>

<style scoped>

</style>
