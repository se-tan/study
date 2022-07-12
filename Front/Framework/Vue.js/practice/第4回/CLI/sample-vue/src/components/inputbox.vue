<template>
  <div class="field" :class="{ 'error': isValide }">
    <label for="title">{{ title }}</label>

    <!-- 
        5行目：入力イベントを取得する
        6行目：Enterキー入力時のイベントを取得
    -->
    <input
      ref="input"
      :type="typeName"
      :placeholder="placeholder"
      :value="value"
      @input="onInput($event.target.value)"
      @keydown.enter="onEnter" 
    />
    <label v-if="isValide">{{ message }}</label>
  </div>
</template>

<script>
export default {
    name: 'InputBox',
    data() {
        return {
            isValide: false,
        };
    },
    props: ['title', 'value', 'typeName', 'placeholder', 'message',],
    watch: {
        message() {
            if(this.message.length > 0) {
                this.isValide = true;
            } else {
                this.isValide = false;
            }
        },
    },
    methods: {
        onEvent(event) {
            this.$emit('enter', event);
        },
        onInput(value) {
            this.$emit('input', value);
        },
    },
};
</script>

<style>
</style>