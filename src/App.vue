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
      <FAHero />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import FAheader from "./components/FAheader.vue";
import SideBar from "./components/Sidebar.vue";
import FAHero from './components/FAHero.vue';

export default defineComponent({
  components: {
    FAheader,
    SideBar,
    FAHero,
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

<style>
.app{
  display: flex;
}
.content{
  width: 100%;
}
</style>