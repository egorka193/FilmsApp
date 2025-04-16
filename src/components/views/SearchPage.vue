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
      <FAButton
        label="Search"
        @click="onSearchClick"
      />
    </div>
    <div v-if="isLoading">
      <p>Loading.......</p>
    </div>
    <div v-else-if="!results">
      <p>Упс, ничего не удалось найти</p>
    </div>
    <div class="results-container">
      <div 
        v-for="film in results"
        :key="film.imdbID"
        :to="{ name: 'Film', params: { id: film.imdbID } }"
        @click="goToList(film.imdbID)"
      >
        <div
          class="results-container__film"
        >
          <FAFilmRow
            :lists-options="lists"
            :poster="film.Poster"
            :title="film.Title"
            :year="film.Year"
            :type="film.Type"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import InputText from 'primevue/inputtext';
import FAButton from 'primevue/button';
import { searchFilms, type FilmShort } from '@/services/api/filmsApi';
import FAFilmRow from '@/components/shared/FAFilmRow.vue';
import { getFilmById } from '@/services/api/filmsApi';
import { getLists } from '@/services/api/listsApi';
import type { List } from '@/services/api/types';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: {
    FAFilmRow,
    InputText,
    FAButton,
  },
  setup() {
    onMounted(async () => {
      lists.value = await getLists();
      getListsName(lists.value);
      console.log( typeof lists.value);
    });
    const router = useRouter();
    const goToList = async (id: string) => {
      await router.push({ name: 'Film', params: { id } });
    };
    const lists = ref<List[]>([]);;
    const listsName = ref();
    const getListsName = (lists: List[]) => {
      listsName.value = lists.map(item => item.name);
      console.log(listsName.value);
    };
    const query = ref('Blade');
    const results = ref<FilmShort[]>([]);
    const isLoading = ref(false);

    const clickOnFilm = async (id: string) => {
      const response = await getFilmById(id);
      console.log(response);
      return id;
    };
    const handleClick = (value: MouseEvent) => {
      console.log(value);
      
    };
    const onSearchClick = async () => {
      isLoading.value = true;
      const response = await searchFilms(query.value);
      results.value = response.Search;
      isLoading.value = false;
    };

    return {
      query,
      onSearchClick,
      results,
      isLoading,
      clickOnFilm,
      listsName,
      handleClick,
      goToList,
      lists,
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