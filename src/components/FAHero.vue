<template>
  <div class="container">
    <RouterView />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
 
});
</script>

<style scoped>
.container{
  margin: 20px;
  border: 1px solid black;
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
}
</style>