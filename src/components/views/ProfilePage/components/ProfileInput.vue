<template>
  <div class="profile-input">
    <p class="profile-input__text">
      {{ nameOfGraph }}
    </p>
    <InputText
      :modelValue="text"
      class="profile__page__input"
      variant="filled"
      @update:modelValue="handleInput"
    />
  </div>
</template>

<script lang="ts">
import InputText from 'primevue/inputtext';
import { defineComponent,} from 'vue';

export default defineComponent({
  components: {
    InputText,
  }, 
  props: {
    nameOfGraph:{
      type: String,
      required: true,
    },
    text:{
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
.profile__page {
  max-width: 1400px;
  margin: 40px auto;
  background-color: #fff;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  font-family: 'Segoe UI', sans-serif;
}
.profile__page__img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid #4f46e5; /* синий акцент */
}
.profile__page__editor{
  max-width: 1500px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
}
.profile__page__input{
  width: 400px;
  height: 50px;
}
.profile-input__text{
  margin-bottom: 10px;
}
</style>