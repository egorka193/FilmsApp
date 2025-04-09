<template>
  <div class="search">
    <div class="search__title">
      <h2>What movie are we looking for?</h2>
    </div>
    <div class="search__input">
      <InputText
        v-model="query"
        class="search__input-text"
        variant="filled"
      />
      <CVButton
        label="Search"
        @click="onSearchClick"
      />
    </div>
    <div v-if="isLoading">
      <p>Loading.......</p>
    </div>
    <div v-else-if="!results">
      <p>{{ nothFound }}</p>
    </div>
    <div class="results-container">
      <RouterLink 
        v-for="film in results"
        :key="film.imdbID"
        :to="{ name: 'Film', params: { id: film.imdbID } }"
      >
        <div
          class="results-container__film"
        >
          <FAFilmCardRow
            :poster="film.Poster"
            :title="film.Title"
            :year="film.Year"
            :type="film.Type"
          />
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import InputText from 'primevue/inputtext';
import CVButton from 'primevue/button';
import { searchFilms, type FilmShort } from '@/services/api/filmsApi';
import FAFilmCardRow from '@/components/shared/FAFilmCardRow.vue';
import { getFilmById } from '@/services/api/filmsApi';

export default defineComponent({
  components: {
    FAFilmCardRow,
    InputText,
    CVButton,
  },
  setup() {
    const query = ref('Blade');
    const results = ref<FilmShort[]>([]);
    const isLoading = ref(false);
    const nothFound = ref('');

    const ClickOnFilm = async (id: string) => {
      const response = await getFilmById(id);
      console.log(response);
      
      return id;
    };
    const onSearchClick = async () => {
      isLoading.value = !isLoading.value;
      const response = await searchFilms(query.value);
      results.value = response.Search;
      if(!results.value){
        isLoading.value = !isLoading.value;
        nothFound.value = 'Упс, ничего не удалось найти';
      } else {
        isLoading.value = !isLoading.value;
      }
    };

    return {
      query,
      onSearchClick,
      results,
      isLoading,
      ClickOnFilm,
      nothFound,
    };
  },
});
</script>

<style scoped>
.search__title{
  margin-bottom: 20px;
}
.search__input{
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
.search__input-text{
  width: 100%;
}
.results-container{
  overflow-y: auto; 
  max-height: 60vh;
}
.results-container__film{
  margin-bottom: 10px;
  border: 1px solid rgb(0, 0, 0);
  border-radius: 10px;
  padding: 10px;
}
.results-container__film:hover{
  border: 1px solid rgb(66, 218, 32);
}
</style>