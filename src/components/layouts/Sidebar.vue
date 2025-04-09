<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="sidebar">
    <Logo
      text="FilmsApp"
      type="Logo"
    />
    <SidebarOption 
      text="Home"
      icon="pi-home"
      :to="{ name: RoutesNames.Home }"
    />
    <SidebarOption 
      text="Search"
      icon="pi-search"
      :to="{ name: RoutesNames.Search }"
    />
    <SidebarOption 
      text="Lists"
      icon="pi-list-check"
      :to="{ name: RoutesNames.Lists }"
    />
  </div>
</template>

<script lang="ts">
import SidebarOption from '@/components/layouts/SidebarOption.vue';
import Logo from '@/components/layouts/Logo.vue';
import { RoutesNames } from '@/router/types';

export default {
  components: {
    SidebarOption,
    Logo,
  },
  setup() {
    return { RoutesNames };
  },
};
</script>

<style scoped>
.sidebar {
  background-color: rgb(154, 166, 167);
  width: 300px;
  flex-shrink: 0;
  height: 100vh;
  transition: 1s ease;
  overflow: hidden;
}
.v-enter-active,
.v-leave-active {
  width: 300px;
  opacity: 1;
  transition: 1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  width: 0px;
}
</style>