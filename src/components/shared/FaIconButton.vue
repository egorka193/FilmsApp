<template>
  <button class="icon-button">
    <i 
      class="pi"
      :class="icon"
    />
    <slot />
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
.icon-button{
  background-color: rgb(154, 166, 167);
  border: none;
  border-radius: 30%;
  cursor: pointer;
  padding: 5px;
  transition: all 0.5s ease-in-out;
}
.icon-button:hover{
  background-color: rgb(192, 207, 208);
}
</style>