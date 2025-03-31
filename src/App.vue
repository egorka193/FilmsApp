<template>
  <div class="app">
    <p>App</p>
    <InputText
      v-model="value"
      type="text" 
    />
    <Button>jr ksd</Button>
  </div>
</template>

<script lang="ts">
import Button from "primevue/button";
import InputText from 'primevue/inputtext';
import { ref } from "vue";
export default {
  components: {
    // eslint-disable-next-line vue/no-reserved-component-names
    Button,
    InputText,
  },
  setup() {
    const value = ref('');

    return {
      value,
    };
  },
};
</script>
