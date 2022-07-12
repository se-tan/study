<template>
  <button class="btn btn-primary" @click="backStep" v-show="stepNumber != 1">Back</button>
  <button class="btn btn-primary" @click="nextStep" v-show="stepNumber != 4">Next</button>
</template>