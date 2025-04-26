<template>
  <div :class="[ids.length > 4 ? 'film-card-list' : 'film-card-list__wrap']">
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
        @handleClick="(id) => deleteFilm(id)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, type PropType } from 'vue';
import FAFilmCard from '@/components/shared/FAFilmCard.vue';
import { store } from '@/store/store';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: {
    FAFilmCard,
  },
  props: {
    ids: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },
  setup(props, ctx) {
    const router = useRouter();
    const films = computed(() => store.state.films.filter(item => props.ids.includes(item.imdbID)));
    const goToList = async (id: string) => {
      await router.push({ name: 'Film', params: { id } });
    };
    const deleteFilm = (id: string) => {
      console.log('delete', id);
      ctx.emit('deleteFilm', id);
    };

    onMounted(async () => {
      await store.dispatch('getFilms', props.ids);
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