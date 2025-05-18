<template>
  <div class="profile-input">
    <label class="profile-input__text">
      {{ label }}:
    </label>
    <InputText
      :modelValue="value"
      class="profile__page__input"
      variant="filled"
      @update:modelValue="handleInput"
    />
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
.profile__page__input{
  width: 400px;
  height: 50px;
}
.profile-input__text{
  margin-bottom: 10px;
}
</style>