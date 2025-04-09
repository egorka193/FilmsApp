<template>
  <div>
    <p class="sucses">
      Popular Films
    </p>
    <div class="home-pade__films">
      <div
        v-for="item in 20"
        :key="item"
      >
        <FAFilmCard />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import FAFilmCard from '@/components/shared/FAFilmCard.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    components:{
      FAFilmCard,
    },
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