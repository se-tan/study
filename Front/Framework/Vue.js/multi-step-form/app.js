Vue.component("form-name", {
  template: `<form @input="submit">
              <h2>Name Info</h2>
              <div class="form-group">
                <label for="firstName">First Name</label>
                <input type="text" class="form-control" v-model="firstName" placeholder="Enter First Name">
              </div>
              <div class="form-group">
                <label for="lastName">Last Name</label>
                <input type="text" class="form-control" v-model="lastName" placeholder="Enter Last Name">
              </div>
            </form>`,
  data: function () {
    return {
      firstName: null,
      lastName: null,
    };
  },
  methods: {
    submit() {
      this.$emit("update", {
        firstName: this.firstName,
        lastName: this.lastName,
      });
    },
  },
});

Vue.component("form-contact", {
  template: `<form @input="submit">
              <h2>Contact Info</h2>
              <div class="form-group">
                <label for="Email">Email</label>
                <input type="email" class="form-control" v-model="Email" placeholder="Enter email">
              </div>
              <div class="form-group">
                <label for="tel">Tel</label>
                <input type="text" class="form-control" v-model="tel" placeholder="Enter phone number">
              </div>
            </form>`,
  data:function() {
    return {
      Email: null,
      tel: null,
    }
  },
  methods: {
    submit() {
      this.$emit('update', {
        Email: this.Email,
        tel: this.tel,
      });
    }
  }
});

Vue.component('form-birthday', {
  template:`<form @input="submit">
              <h2>User Info</h2>
              <div class="form-group">
                <label for="Birthday">Birthday</label>
                <input type="date" class="form-control" v-model="birthday" placeholder="Enter Birthday">
              </div>
            </form>`,
  data: function() {
    return {
      birthday: null,
    }
  },
  methods: {
    submit() {
      this.$emit('update', {
        birthday: this.birthday,
      });
    }
  }
})

Vue.component('form-confirm', {
  template:`<div>
              <h2>Confirmation</h2>
              <p>Name: {{ form.firstName }} {{ form.lastName }}</p>
              <p>Email: {{ form.Email }}</p>
              <p>Tel: {{ form.tel }}</p>
              <p>Birthday: {{ form.birthday }}</p>
            </div>`,
  props: {
    form: Object
  }
})