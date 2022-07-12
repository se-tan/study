// todo-item とする新しいコンポーネントを定義
Vue.component("todo-item", {
  props: ["todo"],
  template: "<li>{{ todo.text }}</li>",
});

// Vue instance
var vm = new Vue({
  el: "#app",
  data: {
    groceryList: [
      { id: 0, text: "Vegetables" },
      { id: 1, text: "Cheese" },
      { id: 2, text: "Whatever else humans are supposed to eat" },
    ],
  },
});

var vm2 = new Vue({
  el: "#example",
  data: {
    message: "Hello",
  },
  computed: {
    reversedMessage() {
      return this.message.split("").reverse().join("");
    },
    now() {
      return Date(Date.now());
    },
  },
});

var vm3 = new Vue({
  el: "#demo",
  data: {
    firstName: "Foo",
    lastName: "Bar",
    fullName: " Foo Bar",
  },
  computed: {
    get() {
      return this.firstName + " " + this.lastName;
    },
    set(newValue) {
      var names = newValue.split(" ");
      this.firstName = names[0];
      this.lastName = names[names.length - 1];
    },
  },
  watch: {
    firstName(val) {
      this.fullName = val + " " + this.lastName;
    },
    lastName(val) {
      this.fullName = this.firstName + " " + val;
    },
  },
});

var watchExample = new Vue({
  el: "#watch-example",
  data: {
    question: "",
    answer: "I can't give you an answer until you ask a question!",
  },
  watch: {
    // question が変わるごとに実行される
    question(newQuestion, oldQuestion) {
      this.answer = "Waiting for you to stop typing...";
      this.debouncedGetAnswer();
    },
  },
  created() {
    /* 
        _.debounce は特にコストの高い処理の実行を制御するための
        lodash の関数。この場合、どのくらい頻繁に yesno.wtf/api
        へのアクセスすべきかを制限するために、ユーザーの入力が完全に
        終わるのを待ってから ajax リクエストを実行している。
    */
    this.debouncedGetAnswer = _.debounce(this.getAnswer, 500);
  },
  methods: {
    getAnswer() {
      // ?マークが無ければエラーを返す
      if (this.question.indexOf("?") === -1) {
        this.answer = "Questions usually contain a question mark. ;-)";
        return;
      }
      this.answer = "Thinking...";
      var vm4 = this;
      axios
        .get("https://yesno.wtf/api")
        .then(function (response) {
          vm4.answer = _.capitalize(response.date.answer);
        })
        .catch(function (error) {
          vm4.answer = "Error! Could not reach the API. " + error;
        });
    },
  },
});
