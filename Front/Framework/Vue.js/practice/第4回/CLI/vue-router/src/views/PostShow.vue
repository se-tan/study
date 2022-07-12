<template>
  <div class="post" v-if="post">
      <h1>This is a post Show page.</h1>
      <p>{{ $route.params.id }}</p>
      <div>{{ post.id }}</div>
      <div>{{ post.title }}</div>
  </div>
  <div class="post" v-else>
    <h1>404 Not Found</h1>
  </div>
</template>

<script>
export default {
    mounted() {
        console.log(this.$route);
    },
    props: {
        id: {
            type: String,
            required: true,
        }
    },
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
    },
    computed: {
        post() {
            return this.posts.find(post => post.id == this.$route.params.id);
        },
    },
}
</script>

<style>

</style>