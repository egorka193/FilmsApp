<template>
  <div class="home-pade">
    <p class="home-pade__title">
      Popular Films
    </p>
    <div class="home-pade__films">
      <div v-if="popularFilms.length === 0">
        Loading.......
      </div>
      <template v-if="popularFilms.length !== 0">
        <div
          v-for="film in popularFilms"
          :key="film.imdbID"
          class="home-pade__film"
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
import FAFilmCard from '@/components/shared/FAFilmCard.vue';
import { getPopularFilms, type FilmInformation } from '@/services/api/filmsApi';
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
    components:{
      FAFilmCard,
    },
    setup() {
      const popularFilms = ref<FilmInformation[]>([]);

      onMounted(async () => {
        popularFilms.value = await getPopularFilms();
        console.log(popularFilms.value);
      });

      return{
        popularFilms,
      };
    },
});
</script>

<style scoped>
.home-pade__title{
  font-size: 25px;
  font-weight: 700;
}
.img{
  width: 50px;
  height: 50px;
}
.home-pade__films{
  padding: 10px;
  display: flex;
  gap: 30px;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.home-pade__film{
  cursor: pointer;
  padding: 10px;
  border: 1px solid black;
  border-radius: 10px;
  margin-bottom: 20px;
  transition: all 0.5s ease-in-out;
}
.home-pade__film:hover{
  transform: translateY(-5px);
  background-color: gainsboro;
}
</style>