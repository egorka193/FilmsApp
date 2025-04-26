<template>
  <div class="fa-select">
    <PrimeSelect
      v-model="selectedList"
      class="film-row__select"
      :options="options"
      option-label="name"
      :placeholder="`Added in ${count} lists`"
      @click.stop
      @change="choseFlim(selectedList, currentFilmId)"
    > 
      <template #option="slotProps">
        <div class="select-item">
          {{ slotProps.option.name }}
          <span :class="['pi', slotProps.option.filmsIds?.includes(currentFilmId) === true ? 'pi-check' : '']" />
        </div>
      </template>
    </PrimeSelect>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, ref } from 'vue';
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
  setup(props, ctx) {
    const store = useStore<State>();
    const options = computed(() => store.state.lists);
    const allFilmsIds: string[] = options.value.flatMap(list => list.filmsIds);
    const count = ref(0);
    const addedCount = () => allFilmsIds.map((item) => {
      if(item === props.currentFilmId){
        count.value++;
      }
      return count;
    });
    const selectedList = ref();
    const handleClick = (value: List) => {
      addedCount();
      ctx.emit('handleClick', value);
      console.log(value);
    };
    const choseFlim = async (list: List, id: string) => {
      const result = options.value.filter((item) => item.id === list.id)[0];
      if(!result.filmsIds.includes(id)){
        result.filmsIds.push(id);
      } else {
        result.filmsIds = result.filmsIds.filter(id => id !== id);
      }
      await store.dispatch('updateList', result);
    };

    onMounted(() => {
      addedCount();
    });
    return {
      options,
      selectedList,
      handleClick,
      count,
      choseFlim,
    };  
  },
});
</script>

<style scoped>
.film-row__select{
  margin-bottom: 10px;
}
</style>