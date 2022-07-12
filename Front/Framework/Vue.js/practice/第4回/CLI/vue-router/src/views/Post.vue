<template>
  <div class="post">
      <h1>This is a post page.</h1>
      <div v-for="post in posts" :key="post.id">
          <router-link :to="`/post/${post.id}`">
            {{ post.title }}
          </router-link>
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            posts: [
                {
                    id: 1,
                    title: 'vue.js',
                },
                {
                    id: 2,
                    title: 'react',
                },
                {
                    id: 3,
                    title: 'alpine.js',
                },
            ]
        }
    }
 }
</script>

<style>

</style>