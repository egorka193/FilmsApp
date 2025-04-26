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
        :to="{ name: 'Film', params: { id: film.imdbID } }"
        @click="goToFilm(film.imdbID)"
      >
        <div
          class="search__results-film"
        >
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
    <div 
      :class="['search__buttons', results.length === 0 ? 'search__buttons-disabled' : '']"
    >
      <button 
        :class="['search__button', numberPage === 1 ? 'search__button-disabled' : '']"
        @click="goPrev(1, numberPage)"
      >
        ←
      </button>
      <button
        v-for="item in visiblePages"
        :key="item"
        :class="['search__button', item === numberPage || item === '...'? 'search__button-disabled' : '']"
        @click="typeof item === 'number' && loadAnotherPage(item)"
      >
        {{ item }}
      </button>
      <button 
        :class="['search__button', numberPage === quantityPages ? 'search__button-disabled' : '']"
        @click="goNext(1, numberPage)"
      >
        →
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import InputText from 'primevue/inputtext';
import FAButton from 'primevue/button';
import { searchFilms, type FilmShort } from '@/services/api/filmsApi';
import FAFilmRow from '@/components/shared/FAFilmRow.vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import type { State } from '@/store/store';

export default defineComponent({
  components: {
    FAFilmRow,
    InputText,
    FAButton,
  },
  setup() {
    // const quantityPages = computed(() => store.state.lists);
    const router = useRouter();
    const store = useStore<State>();
    const lists = computed(() => store.state.lists);
    const query = ref('Blade');
    const results = ref<FilmShort[]>([]);
    const isLoading = ref(false);
    const numberPage = ref(0);
    const quantityPages = ref(0);
    const visiblePages = computed(() => {
      const total = quantityPages.value;
      const current = numberPage.value;
      const delta = 1;

      const range: (number | string)[] = [];

      if (total <= 7) {
        for (let i = 1; i <= total; i++) range.push(i);
      } else {
        range.push(1);

        if (current > 3) range.push('...');

        const start = Math.max(2, current - delta);
        const end = Math.min(total - 1, current + delta);
        for (let i = start; i <= end; i++) range.push(i);

        if (current < total - 2) range.push('...');

        range.push(total);
      }

      return range;
    });



    const goToFilm = async (id: string) => {
      await router.push({ name: 'Film', params: { id } });
    };
    const countPages = (results: number) => {
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
      quantityPages.value = countPages(+response.totalResults);
      console.log(quantityPages.value);
      isLoading.value = false;
      numberPage.value = page;
    };

    onMounted(() => {
      console.log(quantityPages.value);
      
    });

    return {
      query,
      onSearchClick,
      results,
      isLoading,
      goToFilm,
      lists,
      loadAnotherPage,
      numberPage,
      quantityPages,
      goPrev,
      goNext,
      visiblePages,
    };
  },
});
</script>

<style scoped>
.search__title{
  margin-bottom: 20px;
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
.search__buttons{
  margin: 5px;
  display: flex;
  gap: 10px;
  overflow: hidden;
}
.search__button{
  cursor: pointer;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  transition: all 0.5s ease-in-out;
}
.search__button:hover{
  background-color: #0eba81;
}
.search__buttons-disabled{
  display: none;
}
.search__button-disabled{
  opacity: 0.3;
  background-color: #0eba81;
  pointer-events: none;
}
</style>