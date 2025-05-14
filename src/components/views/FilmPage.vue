<template>
  <div class="film-page">
    <div
      v-if="!result"
      class="film-page__loading"
    >
      Loading...
    </div>
    <div
      v-else
      class="film-page__layout"
    >
      <div class="film-page__layout-wrapper">
        <img
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
      <FASelect
        :current-film-id="id"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { getFilmById } from '@/services/api/filmsApi';
import FASelect from '@/components/shared/FASelectLists.vue';
import type { FilmInformation } from '@/services/api/types';

export default defineComponent({
  components: {
    FASelect,
  },
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
.film-page__layout{
  display: flex;
  justify-content: space-between;
}
.film-page__layout-wrapper{
  display: flex;
  gap: 20px;
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