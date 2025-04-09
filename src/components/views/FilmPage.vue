<template>
  <div class="film-page">
    <div
      v-if="!result"
      class="film-page__loading"
    >Loading...</div>
    <div
      v-else
      class="film-layout"
    >
      <img
        class="results-container__film-poster"
        :src="result.Poster"
      >
      <div>
        <h2>{{ `${result.Title} (${result.Year})` }}</h2>
        <p>{{ `Runtime: ${result.Runtime}` }}</p>
        <p>{{ `Raiting: ${result.Rated}` }}</p>
        <p>{{ result.Genre }}</p>
        <p>{{ `Score: ${result.imdbRating}` }}</p>
        <p>{{ `Descriptions: ${result.Plot}` }}</p>
        <p>{{ `Actors: ${result.Actors}` }}</p>
        <p>{{ `Country: ${result.Country}` }}</p>
        <p>{{ `Actors: ${result.Actors}` }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { getFilmById, type FilmInformation } from '@/services/api/filmsApi';

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup (props) {
    const result = ref<FilmInformation | null>(null);
    onMounted( async() => {
      result.value = await getFilmById(props.id);
    });
    return {
      result,
    };
  },
});
</script>

<style scoped>
.film-layout{
  display: flex;
  gap: 10px;
}
p{
  font-weight: 600;
  margin-bottom: 10px;
}
h2{
  font-weight: 600;
  font-size: 30px;
}
</style>