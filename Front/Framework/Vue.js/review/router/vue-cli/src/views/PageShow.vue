<template>
  <div class="post">
    <h1>This is a Post Show page</h1>
    <div>{{ $route.path }}</div>
    <div>{{ $route.params.id }}</div>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log(this.$route);
  },
};
</script>

<style></style>
