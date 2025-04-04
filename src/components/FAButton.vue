<template>
  <button class="btn">
    <div class="img-wrapper">
      <i :class="src" />
    </div>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    src: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped>
.img-wrapper i{
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>