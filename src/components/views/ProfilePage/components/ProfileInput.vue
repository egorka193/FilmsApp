<template>
  <div class="profile-input">
    <label class="profile-input__text">
      {{ label }}:
      <InputText
      :modelValue="value"
      class="profile-page__input"
      variant="filled"
      @update:modelValue="handleInput"
      />
    </label>
  </div>
</template>

<script lang="ts">
import InputText from 'primevue/inputtext';
import { defineComponent} from 'vue';

export default defineComponent({
  components: {
    InputText,
  }, 
  props: {
    label:{
      type: String,
      required: true,
    },
    value:{
      type: String,
      required: true,
    },
  },
  setup(props, ctx) {
    const handleInput = (value: string | undefined) => {
      ctx.emit('handleInput', value ?? '');
    };
    return{
      handleInput,
    };
  },
  
});
</script>

<style scoped>
.profile-page__input{
  width: 100%;
  height: 50px;
}
.profile-input__text{
  margin-bottom: 10px;
}
</style>