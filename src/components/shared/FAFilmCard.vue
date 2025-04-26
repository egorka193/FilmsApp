<template>
  <div class="film-card">
    <div 
      class="film-card__btn"
      v-if="type === 'list'"
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
      <FASelect :current-film-id="id" />
    </div>
    <div class="film-card__wrapper">
      <img
        class="film-card__img"
        :src="poster"
      >
      <h2>{{ `${title}` }}</h2>
      <p>{{ plot }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FASelect from './FASelect.vue';

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
  max-width: 250px;
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
  justify-content: end;
}
.film-card__select{
  margin-bottom: 10px;
  display: flex;
  justify-content: end;
}
</style>