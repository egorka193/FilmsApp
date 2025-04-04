<template>
  <div class="search">
    <InputText class="search-input" variant="filled" />
    <CVButton label="Search" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import InputText from 'primevue/inputtext';
import CVButton from 'primevue/button';

export default defineComponent({
  components: {
    InputText,
    CVButton,
  },
});
</script>

<style scoped>
.search{
  display: flex;
  gap: 10px;
}
.search-input{
  min-width: 500px;
}
</style>