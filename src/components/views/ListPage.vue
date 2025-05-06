<template>
  <div class="list-page">
    <div v-if="isLoading">
      Loading......
    </div>
    <div v-else-if="!listInfo">
      {{ `There is not list with ID: ${id}` }}
    </div>
    <template v-else-if="listInfo">
      <h2 class="list-page__name">
        {{ listInfo.name }}
      </h2>

      <FAFilmCardList 
        v-if="listInfo.filmsIds.length"
        :ids="listInfo.filmsIds"
        @deleteFilm="(id) => deleteFilmInList(id, listInfo)"
      />

      <p v-else>
        Фильмы не добавлены.
      </p>
    </template>
  </div>
</template>

<script lang="ts">
import type { List } from '@/services/api/types';
import FAFilmCardList from '@/components/features/FilmCardList.vue';
import type { State } from '@/store/store';
import { computed, defineComponent} from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  components: {
    FAFilmCardList,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const store = useStore<State>();
    const listInfo = computed(() => store.state.lists.find((item) => item.id === +props.id));
    const isLoading = computed(() => store.state.isListsLoading);
    const deleteFilmInList = async (id: string, listInfo: List | undefined) => {
      if (listInfo) {
        listInfo.filmsIds =  listInfo?.filmsIds.filter((item) => item !== id);
      }
      await store.dispatch('updateList', listInfo);
    };

    return {
      listInfo,
      isLoading,
      deleteFilmInList,
    };
  },
});
</script>

<style scoped>

</style>