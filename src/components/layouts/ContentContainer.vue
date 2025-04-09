<template>
  <div class="container">
    <RouterView />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
 
});
</script>

<style scoped>
.container{
  /* flex-shrink: 1;
  padding: 20px;
  background-color: rgba(154, 166, 167, 0.779);
  margin-top: 10px; */
  flex-grow: 1;
  margin: 20px;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.172);
  background-color: #f4f4f4;
  transition: margin-left 0.3s ease; /* Плавный сдвиг контента при открытии sidebar */
}

</style>