<template>
  <div class="logo">
    <img
      class="logo__img"
      :src="`/src/assets/img/${type}.png`"
    >
    <p class="logo__text">
      {{ text }}
    </p>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.logo{
  display: flex;
  gap: 15px;
  padding: 25px;
}
.logo__img{
  width: 50px;
  height: 50px;
}
.logo__text{
  font-size: 40px;
  font-weight: 500;
  font-family: fantasy;
}
</style>