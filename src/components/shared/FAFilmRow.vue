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
    <div>
      <div>
        <PrimeSelect
          v-model="selectedList"
          class="film-row__select"
          :options="listsOptions"
          option-label="name"
          placeholder="Select a list"
          @click.stop
        />
      </div>
      <PrimeButton
        class="film-row__button"
        label="Add to list"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, type PropType} from 'vue';
import PrimeSelect from 'primevue/select';
import { Button as PrimeButton } from 'primevue';
import type { List } from '@/services/api/types';

export default defineComponent({
  components: {
    PrimeSelect,
    PrimeButton,
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
    listsOptions: {
      type: Array as PropType<List[]>,
      required: true,
    },
  },
  setup() {
    const selectedList = ref();

    return {
      selectedList,
    };  
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
.film-row__select{
  margin-bottom: 10px;
}
.film-row__button{
  display: flex;
  justify-content: center;
}
</style>