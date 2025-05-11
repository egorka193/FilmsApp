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
        :list-info="listInfo"
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
    const store = useStore();
    const listInfo = computed<List>(() => store.state.lists.lists.find((item: List) => item.id === +props.id));
    const isLoading = computed(() => store.state.isListsLoading);

    return {
      listInfo,
      isLoading,
    };
  },
});
</script>

<style scoped>

</style>