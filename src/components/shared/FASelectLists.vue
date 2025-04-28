<template>
  <div class="fa-select">
    <PrimeSelect
      v-model="selectedList"
      class="film-row__select"
      :options="options"
      option-label="name"
      :placeholder="`Added in ${count} lists`"
      @click.stop
      @change="chooseFlim(selectedList, currentFilmId)"
    > 
      <template #value>
        <span class="film-row__placeholder">
          {{ `Added in ${count} lists` }}
        </span>
      </template>

      <template #option="slotProps">
        <div class="select-item">
          {{ slotProps.option.name }}
          <span
            v-if="slotProps.option.filmsIds?.includes(currentFilmId) === true"
            class="pi pi-check"
          />
        </div>
      </template>
    </PrimeSelect>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import PrimeSelect from 'primevue/select';
import type { List } from '@/services/api/types';
import { useStore } from 'vuex';
import type { State } from '@/store/store';

export default defineComponent({
  components: {
    PrimeSelect,
  },
  props: {
    currentFilmId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const store = useStore<State>();
    const options = computed(() => store.state.lists);
    const allFilmsIds = computed<string[]>(() => options.value.flatMap(list => list.filmsIds));
    const count = computed(() => {
      return allFilmsIds.value.filter((item) => item === props.currentFilmId).length;
    });
    const selectedList = ref();

    const chooseFlim = async (list: List, currentFilmId: string) => {
      if(!list.filmsIds.includes(currentFilmId)){
        list.filmsIds.push(currentFilmId);
      } else {
        list.filmsIds = list.filmsIds.filter(id => id !== currentFilmId);
      }
      await store.dispatch('updateList', list);
    };
  
    return {
      options,
      selectedList,
      count,
      chooseFlim,
    };
  },
});
</script>

<style scoped>
.film-row__select{
  margin-bottom: 10px;
}
</style>