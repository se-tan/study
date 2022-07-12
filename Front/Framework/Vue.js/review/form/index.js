var app = new Vue({
  data: {
    textInput: "",
    checkValue: "Yes",
    checkItems: [],
    selectValues: [],
    selectUser: [],
    design_users: [
      { id: 1, name: "John" },
      { id: 2, name: "Marry" },
      { id: 3, name: "Ken" },
    ],
    fileData: "",
  },
  methods: {
    handleFile(event) {
      file = event.target.files[0];
      this.fileData = file;
    },
  },
}).$mount("#app");
