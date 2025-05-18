<template>
  <div :class="[listInfo.filmsIds.length > 4 ? 'film-card-list' : 'film-card-list__wrap']">
    <div 
      v-for="film in films"
      :key="film.imdbID"
      class="film-card-list__wrapper"
      :to="{ name: 'Film', params: { id: film.imdbID } }"
      @click="goToList(film.imdbID)"
    >
      <FAFilmCard
        :id="film.imdbID"
        :poster="film.Poster" 
        :title="film.Title" 
        :plot="film.Plot" 
        type="list"
        @handleDelete="(id) => deleteFilm(id)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, type PropType } from 'vue';
import FAFilmCard from '@/components/features/FilmCard.vue';
import { store } from '@/store/store';
import { useRouter } from 'vue-router';
import { RoutesNames } from '@/router/types';
import type { FilmInformation, List } from '@/services/api/types';

export default defineComponent({
  components: {
    FAFilmCard,
  },
  props: {
    listInfo: {
      type: Object as PropType<List>,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
    const films = computed<FilmInformation[]>(() => store.state.films.films.filter((item: FilmInformation) => props.listInfo.filmsIds.includes(item.imdbID)));
    const updatedList = props.listInfo;
    const goToList = async (id: string) => {
      await router.push({ name: RoutesNames.Film, params: { id } });
    };
    const deleteFilm = async (id: string) => {
      updatedList.filmsIds = props.listInfo.filmsIds.filter(item => item !== id);
      await store.dispatch('lists/updateList', updatedList);
    };

    onMounted(async () => {
      await store.dispatch('films/getFilms', props.listInfo.filmsIds);
    });

    return {
      goToList,
      films,
      deleteFilm,
    };
  },
});
</script>

<style scoped>
.film-card-list{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 20px;
}
.film-card-list__wrap{
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 20px;
}
.film-card-list__wrapper{
  cursor: pointer;
  padding: 10px;
  border: 1px solid black;
  border-radius: 10px;
  margin-bottom: 20px;
  transition: all 0.5s ease-in-out;
}
.film-card-list__wrapper:hover{
  transform: translateY(-5px);
  background-color: gainsboro;
}
</style>