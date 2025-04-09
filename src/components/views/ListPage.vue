<template>
  <div>
    <h2 class="list__name">
      Name of list
    </h2>
    <FAFilmCard />
  </div>
</template>

<script lang="ts">
import FAFilmCard from '@/components/shared/FAFilmCard.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    FAFilmCard,
  },
});
</script>

<style scoped>
.list__name{
  margin-bottom: 30px;
}
</style>