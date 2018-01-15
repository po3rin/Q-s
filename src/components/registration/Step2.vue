<template>
  <div>
    <small>あなたの最近の興味を教えて下さい！</small>
    <div class="web-create">
      <p>WEB制作</p>
      <md-checkbox v-for="tag in tags.web" v-model="temporaries.tags" v-bind:value="tag" :key="tag" class="md-primary">{{ tag }}</md-checkbox>
    </div>
    <div class="program">
      <p>プログラム</p>
      <md-checkbox v-for="tag in tags.program" v-model="temporaries.tags" v-bind:value="tag" :key="tag" class="md-primary">{{ tag }}</md-checkbox>
    </div>
    <div class="dev-support">
      <p>開発サポート</p>
      <md-checkbox v-for="tag in tags.support" v-model="temporaries.tags" v-bind:value="tag" :key="tag" class="md-primary">{{ tag }}</md-checkbox>
    </div>
    <div class="database">
      <p>データベース</p>
      <md-checkbox v-for="tag in tags.database" v-model="temporaries.tags" v-bind:value="tag" :key="tag" class="md-primary">{{ tag }}</md-checkbox>
    </div>
    <div class="cloud">
      <p>クラウド</p>
      <md-checkbox v-for="tag in tags.cloud" v-model="temporaries.tags" v-bind:value="tag" :key="tag" class="md-primary">{{ tag }}</md-checkbox>
    </div>
    <small>あなたは{{ temporaries.tags.length }}つのジャンルにチェックしました</small>
  </div>
</template>

<script>
export default {
  name: 'Step2',
  props: ['temporaries'],
  data: () => ({
    tags: {
      web: [
        'HTML',
        'CSS',
        'Sass',
        'JavaScript',
        'jQuery',
        'WordPress'
      ],
      program: [
        'Node.js',
        'React.js',
        'AngularJS',
        'Vue.js',
        'PHP',
        'Ruby',
        'Python',
        'Java',
        'Webpack',
        'Gulp'
      ],
      support: [
        'Git',
        'GitHub'
      ],
      database: [
        'MySQL',
        'PostgreSQL',
        'MariaDB',
        'GraphQL',
        'MongoDB'
      ],
      cloud: [
        'AWS',
        'Azure',
        'Firebase'
      ]
    }
  })
}
</script>

<style scoped>
.md-checkbox {

}
p {
  background-color: #9E9E9E;
  color: white;
  display: block;
  padding: 6px;
}
</style>
