<template>
  <v-card width="400px" class="mx-auto mt-5">
    <v-card-title>
      <div class="display-1 pa-5">Login</div>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field
          prepend-icon="mdi-account-circle"
          label="UserName"
          v-model="name"
        />
        <v-text-field
          prepend-icon="mdi-lock"
          @click:append="showPassword = !showPassword"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          v-model="pwd"
          label="Password"
        />
        <v-card-actions>
          <v-btn class="info" @click="submit">Login</v-btn>
        </v-card-actions>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      showPassword: false,
      name: "",
      pwd: "",
    };
  },
  methods: {
    submit() {
      console.log(this.name, this.pwd);
    },
  },
};
</script>
