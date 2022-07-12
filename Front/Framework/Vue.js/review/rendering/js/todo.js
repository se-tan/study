new Vue({
  el: "#todo",
  data: {
    todos: [
      { task: "Study Python", isCompleted: false },
      { task: "Study AWS", isCompleted: false },
      { task: "Entry AzureFundamental", isCompleted: false },
    ],
    newTask: "",
  },
  methods: {
    addTodo() {
      if (this.newTask == "") return;
      this.todos.push({ task: this.newTask, isCompleted: false });
      this.newTask = "";
    },
    deleteTodo(todo) {
      var index = this.todos.indexOf(todo);
      this.todos.splice(index, 1);
    },
  },
});
