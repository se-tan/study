<script>
import FormName from "./forms/FormName.vue";
import FormContact from "./forms/FormContact.vue";
import FormBirthday from "./forms/FormBirthday.vue";
import FormConfirm from "./forms/FormConfirm.vue";
import FormButton from "./forms/FormButton.vue";
</script>

<template>
  <FormName v-if="stepNumber === 1" @update="formUpdate"></FormName>
  <FormContact v-if="stepNumber === 2" @update="formUpdate"></FormContact>
  <FormBirthday v-if="stepNumber === 3" @update="formUpdate"></FormBirthday>
  <FormConfirm v-if="stepNumber === 4" @update="formUpdate"></FormConfirm>
  <FormButton></FormButton>
</template>

<style></style>
