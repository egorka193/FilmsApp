<template>
  <div>
    <h2 class="list__name">Name of list</h2>
    <div>
      <img class="img" src="/src/img/logo.png" alt="">
      <h2>Someone Film</h2>
      <p>This film about animals</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
 
});
</script>

<style scoped>
.img{
  width: 30px;
  height: 30px;
}
.list__name{
  margin-bottom: 30px;
}
</style>