<template>
  <button class="ui primary button" @click="onClick">
    {{ name }}
  </button>
</template>

<script>
export default {
    name: 'CustomButton',
    props: ['name'],
    methods: {
        onClick(e) {
            this.$emit('click', e);
        },
    },
}
</script>

<style>

</style>