<template>
  <div class="film-card-row">
    <img
      class="results-container__film-poster"
      :src="poster"
    >
    <div>
      <h2>{{ `${title} (${year})` }}</h2>
      <p>{{ type }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    poster: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped>
.film-card-row{
  display: flex;
  gap: 20px;
}
.results-container__film-poster{
  height: 150px;
}
</style>