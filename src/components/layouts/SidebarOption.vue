<template>
  <RouterLink
    class="sidebar-option" 
    :to="to"
  >
    <i
      class="pi"
      :class="icon"
    />
    <span>{{ text }}</span>
  </RouterLink>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { RouteLocationRaw } from 'vue-router';

export default defineComponent({
  props: {
    text: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    to: {
      type: Object as PropType<RouteLocationRaw>,
      required: true,
    },
  },
});
</script>

<style scoped>
.sidebar-option{
  display: flex;
  gap: 10px;
  padding: 15px;
}
.sidebar-option:hover{
  background-color: aqua;
  transition: all 0.5s ease;
}
.sidebar-option i{
  display: flex;
  align-items: center;
  justify-content: center;
}
.router-link-active{
  background-color: aqua;
}
</style>