<template>
  <div class="app">
    <div>
      <SideBar 
        v-if="menuOpen"
      />
    </div>
    <div class="content">
      <FAheader 
        @clickOnMenu="toggleMenu()"
      />
      <ContentContainer />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import FAheader from './components/layouts/Header.vue';
import SideBar from './components/layouts/Sidebar.vue';
import ContentContainer from './components/layouts/ContentContainer.vue';

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
}
.content{
  width: 100%;
}
</style>