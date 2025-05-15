<template>
  <div class="film-row">
    <div class="film-row__wrapper">
      <img
        class="film-row__poster"
        :src="poster"
      >
      <div>
        <h2>{{ `${title} (${year})` }}</h2>
        <p>{{ type }}</p>
      </div>
    </div>
    <FASelect 
      :current-film-id="id"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType} from 'vue';
import FASelect from '@/components/shared/FASelectLists.vue';
import type { List } from '@/services/api/types';

export default defineComponent({
  components: {
    FASelect,
  },
  props: {
    poster: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    listsOptions: {
      type: Array as PropType<List[]>,
      required: true,
    },
  },
});
</script>

<style scoped>
.film-row{
  display: flex;
  justify-content: space-between;
}
.film-row__poster{
  height: 180px;
}
.film-row__wrapper{
  display: flex;
  gap: 20px;
}
</style>