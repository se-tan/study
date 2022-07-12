Vue.use(window["vue-js-modal"].default);

const app = new Vue({
  data: {
    title: "User List",
    // ユーザー登録に使用するデータプロパティ
    form: {
      id: "",
      name: "",
      email: "",
    },
    users: [],
    editIndex: -1,
    createdFlag: true,
  },
  created() {
    this.users = [
      {
        id: 1,
        name: "Leanne Graham",
        email: "Sincere@april.biz",
      },
      {
        id: 2,
        name: "Ervlin Howell",
        email: "Shanna@melissa.tv",
      },
      {
        id: 3,
        name: "Clementine Bauch",
        email: "Nathan@yesenia.net",
      },
    ];
  },
  methods: {
    // モーダルウィンドウ表示用メソッド
    showModal() {
      this.createdFlag = true;
      this.resetForm();
      this.$modal.show("user-modal");
    },
    registerUser() {
      const user = Object.assign({}, this.form);
      this.users.push(user);
      this.$modal.hide("user-modal");
      this.resetForm();
    },
    resetForm() {
      this.form.id = "";
      this.form.name = "";
      this.form.email = "";
    },
    deleteUser(user) {
      const index = this.users.indexOf(user);
      this.users.splice(index, 1);
    },
    editUser(user) {
      this.createdFlag = false;
      this.editIndex = this.users.indexOf(user);
      this.form = Object.assign({}, user);
      this.$modal.show("user-modal");
    },
    updateUser() {
      Object.assign(this.users[this.editIndex], this.form);
      this.$modal.hide("user-modal");
    },
  },
}).$mount("#app");
