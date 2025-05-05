<template>
  <div class="search">
    <div class="search__title">
      <h2>What movie are we looking for?</h2>
    </div>
    <div class="search__form">
      <InputText
        v-model="query"
        class="search__input"
        variant="filled"
      />
      <FAButton
        label="Search"
        @click="onSearchClick(1)"
      />
    </div>
    <div v-if="isLoading">
      <p>Loading.......</p>
    </div>
    <div v-else-if="!results">
      <p>Упс, ничего не удалось найти</p>
    </div>
    <div class="search__results">
      <div 
        v-for="film in results"
        :key="film.imdbID"
        @click="goToFilm(film.imdbID)"
      >
        <div class="search__results-film">
          <FAFilmRow
            :id="film.imdbID"
            :lists-options="lists"
            :poster="film.Poster"
            :title="film.Title"
            :year="film.Year"
            :type="film.Type"
          />
        </div>
      </div>
    </div>
    <FASelectPages
      :number-page="numberPage"
      :total-page="pagesCount"
      :class="['search__buttons', results.length === 0 ? 'search__buttons-disabled' : '']"
      @prev="(num, numberPage) => goPrev(num, numberPage)"
      @next="(num, numberPage) => goNext(num, numberPage)"
      @loadPage="(num) => loadAnotherPage(num)"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import InputText from 'primevue/inputtext';
import FAButton from 'primevue/button';
import { searchFilms } from '@/services/api/filmsApi';
import FAFilmRow from '@/components/views/SearchPage/components/FAFilmRow.vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import type { State } from '@/store/store';
import FASelectPages from '@/components/views/SearchPage/components/FASelectPages.vue';
import type { FilmShort } from '@/router/types';

export default defineComponent({
  components: {
    FAFilmRow,
    InputText,
    FAButton,
    FASelectPages,
  },
  setup() {
    const router = useRouter();
    const store = useStore<State>();
    const lists = computed(() => store.state.lists);
    const query = ref();
    const results = ref<FilmShort[]>([]);
    const isLoading = ref(false);
    const numberPage = ref(0);
    const pagesCount = ref(0);

    const goToFilm = async (id: string) => {
      await router.push({ name: 'Film', params: { id } });
    };
    const getPagesCount = (results: number) => {
      const pages = results/10;
      return Math.round(pages);
    };
    const goPrev = async (number: number, numberPage: number) => {
      await onSearchClick(numberPage - number);
    };
    const goNext = async (number: number, numberPage: number) => {
      await onSearchClick(numberPage + number);
    };
    const loadAnotherPage = async (page: number) => {
      await onSearchClick(page);
    };
    const onSearchClick = async (page: number) => {
      isLoading.value = true;
      results.value = [];
      const response = await searchFilms(query.value, page);
      results.value = response.Search;
      pagesCount.value = getPagesCount(+response.totalResults);
      isLoading.value = false;
      numberPage.value = page;
    };

    return {
      query,
      onSearchClick,
      results,
      isLoading,
      goToFilm,
      lists,
      loadAnotherPage,
      numberPage,
      pagesCount,
      goPrev,
      goNext,
    };
  },
});
</script>

<style scoped>
.search__title{
  margin-bottom: 20px;
}
.search__title h2{
  font-size: 25px;
  font-weight: 700;
}
.search__form{
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
.search__input{
  width: 100%;
}
.search__results-film{
  cursor: pointer;
  margin-bottom: 10px;
  border: 1px solid rgb(0, 0, 0);
  border-radius: 10px;
  padding: 10px;
  transition: all 0.5s ease-in-out;
}
.search__results-film:hover{
  border: 1px solid rgb(66, 218, 32);
  transform: translateY(-2px);
  background-color: gainsboro;
}
</style>