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
      :to="{ name: 'Home' }"
    />
    <SidebarOption 
      text="Search"
      icon="pi-search"
      :to="{ name: 'Search' }"
    />
    <SidebarOption 
      text="Lists"
      icon="pi-list-check"
      :to="{ name: 'Lists' }"
    />
  </div>
</template>

<script lang="ts">
import SidebarOption from '../layouts/SidebarOption.vue';
import Logo from '../layouts/Logo.vue';

export default {
  components: {
    SidebarOption,
    Logo,
  },
};
</script>

<style scoped>
.sidebar {
  background-color: rgb(154, 166, 167);
  width: 300px;
  height: 100vh;
}
/* .router-link-active{
  text-decoration: none;
  color: black;
}
.router-link-exact-active{
  text-decoration: none;
  color: black;
} */
</style>