<script setup lang="ts">
import { storeToRefs } from 'pinia'
import useCounterStore from '../stores/counter'
defineProps<{ msg: string }>()
const mainStore = useCounterStore()
const { count, double } = storeToRefs(mainStore)
function aa () {
  mainStore.increment()
}
mainStore.$patch(state => {
  state.count += 10
})
</script>

<template>
  <h1>{{ msg }}</h1>
  <h1>{{ count }}</h1>
  <h1>{{ double }}</h1>
  <button @click="aa"></button>
  <!-- <h1>{{ increment }}</h1> -->
</template>

<style scoped>
</style>
