<template>
  <div class="lists">
    <h2 class="lists__name">
      Favorites Movie
    </h2>
    <RouterLink :to="{ name: RoutesNames.List }">
      <div class="list">
        Name of list
      </div>
    </RouterLink>
    <RouterLink :to="{ name: RoutesNames.List }">
      <div class="list">
        Name of list
      </div>
    </RouterLink>
    <RouterLink :to="{ name: RoutesNames.List }">
      <div class="list">
        Name of list
      </div>
    </RouterLink>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { getLists } from '@/services/api/listsApi';
import { RoutesNames } from '@/router/types';

export default defineComponent({
  setup() {
    onMounted(async () => {
      const lists = await getLists();
      console.log(lists);
    });

    return{
      RoutesNames,
    };
  },
});
</script>

<style scoped>
.list{
  margin-bottom: 20px;
  border: 1px solid black;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  text-decoration: none;
}
.list:hover{
  border: 1px solid blue;
  transform: scale();
}
.lists__name{
  margin-bottom: 20px;
}
</style>