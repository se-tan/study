<template>
  <div class="Home">
    <b-container fluid="xl">
      <div class="my-2">
        <h1 class="title">Typing Game</h1>
      </div>

      <div class="my-3">
        <b-button variant="info" v-if="gameState == ''" @click="startGame">START</b-button>
      </div>

      <div v-if="gameState == 'play'">
        <h2 class="text-secondary">{{ currentQuestion }}</h2>
      </div>
      <div v-if="gameState == 'end'" class="mb-2">
        <h2 class="text-success">Clear!</h2>
        <b-button variant="info" @click="reload">Again?</b-button>
      </div>

      <b-form-input class="bd" id="typeForm" type="text" v-model="typeAnswer" />

      <b-progress :value="value" :max="max" class="my-3" />
      <p>{{ count }}/{{ questions_count }}</p>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      questions: ["Javascript", "Python", "Java", "Docker", "Amazon web service"],
      currentQuestion: "",
      questions_count: 0,
      count: 0,
      value: 0,
      max: 100,
      gameState: "",
      typeAnswer: "",
    };
  },
  mounted() {
    this.currentQuestion = this.questions[0];
    this.questions_count = this.questions.length;
  },
  watch: {
    // inputの回答と問題の正誤判定
    typeAnswer(e) {
      if (e === this.currentQuestion) {
        this.questions.splice(0, 1);
        this.count++;
        this.upCount();
        this.currentQuestion = this.questions[0];
        this.typeAnswer = "";
      } else {
        return;
      }
    },
    questions() {
      if (this.questions.length == 0) {
        this.gameState = "end";
      }
    },
  },
  methods: {
    startGame() {
      this.gameState = "play";
      this.$nextTick(function () {
        document.getElementById("typeForm").focus();
      });
    },
    upCount() {
      this.value = this.count * 20;
    },
    reload() {
      window.location.reload();
    },
  },
};
</script>

<style>
.title {
  background: linear-gradient(transparent 60%, rgb(179, 179, 179) 60%);
  display: inline;
}
.bd {
  border: none;
  border-bottom: 2px solid black;
  text-align: center;
}
</style>
