<template>
  <div id="score">
      <h2>せいせき</h2>
      <div><button type="button" @click.prevent="dataReset">クリア</button></div>
      <ul v-if="scores">
          <li v-for="(score, i) of $parent.$data.scores" :key="i">
              <span>{{ (i + 1) }}:</span>
                {{ score.message }}
          </li>
      </ul>
  </div>
</template>

<script>
export default {
    name: 'score',
    props: ['scores'],
    data() {
        return {}
    },
    methods: {
        dataReset() {
            this.$parent.$data.scores = [];
        },
    },
}
</script>

<style>

</style>