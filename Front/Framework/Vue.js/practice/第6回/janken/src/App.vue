<template>
  <div id="app">
    <h1>じゃんけんゲーム</h1>
    <div class="inner">
      <game scores="scores"></game>
      <score scores="scores"></score>
    </div>
  </div>
  <router-view/>
</template>

<script>
import Vue from 'vue'
import Game from './components/Game.vue'
import Score from './components/Score.vue'
import Storage from './util/Storage.js'

let storage = new Storage();

export default new Vue({
  name: '#app',
  data() {
    return {
      scores: storage.getData('scores') || [],
    };
  },
  watch: {
    scores: 'saveData',
  },
  components: {
    Game,
    Score,
  },
  methods: {
    saveData() {
      storage.setData('scores', this.scores);
    },
  },
})
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
