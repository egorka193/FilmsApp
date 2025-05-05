<template>
  <button 
    class="burger-button"
    @click="handleClick()"
  >
    <i class="pi pi-bars" />
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
  emits: ['handleClick'],
  setup(props, ctx) {
    const handleClick = () => {
      ctx.emit('handleClick');
    };
    
    return {
      handleClick,
    };
  },
});
</script>

<style scoped>
.pi-bars{
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.burger-button{
  border: none;
  border-radius: 30%;
  cursor: pointer;
  padding: 5px;
  transition: all 0.5s ease-in-out;
  background-color: rgb(154, 166, 167);
}
.burger-button:hover{
  background-color: rgb(192, 207, 208);
}

</style>