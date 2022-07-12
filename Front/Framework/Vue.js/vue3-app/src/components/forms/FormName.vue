<template>
  <form @input="submit">
    <h2>Name Info</h2>
    <div class="form-group">
      <label for="firstName">First Name</label>
      <input type="text" class="form-control" v-model="firstName" placeholder="Enter First Name">
    </div>
    <div class="form-group">
      <label for="lastName">Last Name</label>
      <input type="text" class="form=control" v-model="lastName" placeholder="Enter Last Name">
    </div>
  </form>
</template>

<script setup>

</script>

<style>

</style>