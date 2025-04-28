<template>
  <div class="film-card">
    <div class="film-card__wrapper">
      <div 
        v-if="type === 'list'"
        class="film-card__btn"
      >
        <img
          class="film-card__img"
          :src="poster"
        >
        <button
          class="pi pi-trash"
          @click.stop="handleClick(id)"
        />
      </div>
      <div
        v-else-if="type === 'home'"
        class="film-card__select"
      >
        <img
          class="film-card__img"
          :src="poster"
        >
        <FASelect :current-film-id="id" />
      </div>
      <!-- <img
        class="film-card__img"
        :src="poster"
      > -->
      <h2>{{ `${title}` }}</h2>
      <p>{{ plot }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FASelect from './FASelectLists.vue';

export default defineComponent({
  components: {
    FASelect,
  },
  props: {
    plot: {
      type: String,
      required: true,
    },
    poster: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  setup(props, ctx) {
    const handleClick = (id: string) => {
      console.log(id);
      
      ctx.emit('handleClick', id);
    };


    return {
      handleClick,
    };
  },
});
</script>

<style scoped>
.film-card{
  max-width: 330px;
}
.film-card__img{
  height: 180px;
}
.sucses{
  font-size: 60px;
  font-weight: 700;
}
.film-card__btn{
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
}
.film-card__btn button{
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background-color: #f44336;
  color: white;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s ease;
}
.film-card__btn button:hover {
  background-color: #d32f2f;
}
.film-card__select{
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
}
</style>