<template>
  <div class="search">
    <div class="search__title">
      <h2>What movie are we looking for?</h2>
    </div>
    <div class="search__input">
      <InputText
        class="search__input-text"
        variant="filled"
      />
      <CVButton label="Search" />
    </div>
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
.search__title{
  margin-bottom: 20px;
}
.search__input{
  display: flex;
  gap: 10px;
}
.search__input-text{
  width: 100%;
}
</style>