<template>
  <main>
    <md-steppers :md-active-step.sync="active" md-linear>
      <md-step id="first" md-label="プロフィール入力" :md-done.sync="first">
        <div class="step_wrapper">
          <step1 :temporaries="temporaries"/>
          <md-button class="md-raised md-primary" @click="setDone('first', 'second')">次へ</md-button>
        </div>
      </md-step>

      <md-step id="second" md-label="気になるタグ登録" :md-done.sync="second" :md-error="secondStepError">
        <div class="step_wrapper">
          <step2 :temporaries="temporaries"/>
          <md-button class="md-raised" @click="setDone('second', 'first')">戻る</md-button>
          <md-button class="md-raised md-primary" @click="setDone('second', 'third')">次へ</md-button>
          <!-- <md-button class="md-raised" @click="setError()">Set error!</md-button> -->
        </div>
      </md-step>

      <md-step id="third" md-label="入力確認" :md-done.sync="third">
        <div class="step_wrapper">
          <step3 :temporaries="temporaries"/>
          <md-button class="md-raised" @click="setDone('third', 'second')">戻る</md-button>
          <md-button class="md-primary md-raised" @click="complete">完了</md-button>
          <md-dialog :md-active.sync="showDialog">
            <md-dialog-title>登録が完了しました!</md-dialog-title>
            <md-dialog-content>早速、セラクのエンジニアと交流しましょう！</md-dialog-content>
            <md-dialog-actions>
              <md-button class="md-primary" @click="goMainPage">OK</md-button>
            </md-dialog-actions>
          </md-dialog>
        </div>
      </md-step>
    </md-steppers>
  </main>
</template>

<script>
import FirebaseApp from './../../firebase/firebase.js'
import { mapGetters, mapMutations } from 'vuex'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
let db = FirebaseApp.database()
let members = db.ref('members')
export default {
  name: 'Make',
  components: {
    Step1,
    Step2,
    Step3
  },
  data: () => ({
    active: 'first',
    first: false,
    second: false,
    third: false,
    secondStepError: null,
    open: false,
    value: null,
    showDialog: false,
    temporaries: {
      name: '',
      sex: '',
      date: '',
      intro: '',
      tags: []
    }
  }),
  computed: {
    ...mapGetters(['profiles'])
  },
  methods: {
    ...mapMutations({
      add: 'addData'
    }),
    setDone (id, index) {
      this[id] = true
      this.secondStepError = null
      if (index) {
        this.active = index
      }
    },
    complete () {
      this.showDialog = true
      this.open = true
      this.setDone('third')
      this.add(this.temporaries)
      this.addmember()
    },
    goMainPage () {
      this.showDialog = false
      this.$router.push('/main')
    },
    addmember: function () {
      members.push(this.temporaries)
    }
  }
}
</script>

<style scoped>
main {
  padding: 20px;
}
small{
  margin: 24px;
}
.step_wrapper {
  margin: auto;
  width: 80%;
}
</style>
