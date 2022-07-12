Vue.createApp({
  data() {
    return {
      message: "Hello Axios",
      users: [],
    };
  },
  mounted() {
    axios
      .get("https://jsonplaceholder.typicode.com/users") // ?name=Glenna Reichert")
      .then((response) => (this.users = response.data))
      .catch((error) => console.log(error));
  },
}).mount("#app");
