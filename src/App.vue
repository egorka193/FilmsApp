<template>
  <div class="app">
    <Transition>
      <SideBar 
        v-if="menuOpen"
      />
    </Transition>
    <div class="content">
      <FAheader 
        @clickOnMenu="toggleMenu()"
      />
      <ContentContainer />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from 'vue';
import FAheader from '@/components/layouts/Header.vue';
import SideBar from '@/components/layouts/Sidebar.vue';
import ContentContainer from '@/components/layouts/ContentContainer.vue';
import { useStore } from 'vuex';
import type { ListsState } from './store/modules/lists';

export default defineComponent({
  components: {
    FAheader,
    SideBar,
    ContentContainer,
  },
  setup() {
    const menuOpen = ref(false);
    const toggleMenu = () => {
      menuOpen.value = !menuOpen.value;
    };
    const store = useStore<ListsState>();
    
    onBeforeMount(async () => {
      await store.dispatch('lists/initList');
    });
    return {
      menuOpen,
      toggleMenu,
    };
  },
});
</script>

<style scoped>
.app{
  display: flex;
  height: 100vh;
}
.content{
  width: 100%;
  overflow-y: auto;
}
</style>