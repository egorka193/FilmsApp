<template>
  <div class="home-page">
    <p class="home-page__title">
      Popular Films
    </p>
    <div class="home-page__films">
      <div v-if="popularFilms.length === 0">
        Loading.......
      </div>
      <template v-if="popularFilms.length !== 0">
        <div
          v-for="film in popularFilms"
          :key="film.imdbID"
          class="home-page__film"
        >
          <FAFilmCard
            :id="film.imdbID"
            :poster="film.Poster" 
            :title="film.Title" 
            :plot="film.Plot" 
            type="home"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import FAFilmCard from '@/components/features/FilmCard.vue';
import type { FilmInformation } from '@/router/types';
import { getPopularFilms } from '@/services/api/filmsApi';
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
    components:{
      FAFilmCard,
    },
    setup() {
      const popularFilms = ref<FilmInformation[]>([]);

      onMounted(async () => {
        popularFilms.value = await getPopularFilms();
      });

      return{
        popularFilms,
      };
    },
});
</script>

<style scoped>
.home-page__title{
  font-size: 25px;
  font-weight: 700;
}
.img{
  width: 50px;
  height: 50px;
}
.home-page__films{
  padding: 10px;
  display: flex;
  gap: 30px;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.home-page__film{
  cursor: pointer;
  padding: 10px;
  border: 1px solid black;
  border-radius: 10px;
  margin-bottom: 20px;
  transition: all 0.5s ease-in-out;
}
.home-page__film:hover{
  transform: translateY(-5px);
  background-color: gainsboro;
}
</style>