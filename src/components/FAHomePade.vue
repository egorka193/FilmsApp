<template>
  <div>
    <p class="sucses">Popular Films</p>
    <div class="home-pade__films">
      <div
        v-for="item in 20"
        :key="item"
      >
        <img class="img" src="/src/img/logo.png" alt="">
        <h2>Someone Film</h2>
        <p>This film about animals</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
});
</script>

<style scoped>
.sucses{
  font-size: 60px;
  font-weight: 700;
}
.img{
  width: 50px;
  height: 50px;
}
.home-pade__films{
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
}
</style>