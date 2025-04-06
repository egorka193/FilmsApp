<template>
  <button class="btn">
    <i 
      class="pi"
      :class="icon"
    />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    icon: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped>
i{
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>