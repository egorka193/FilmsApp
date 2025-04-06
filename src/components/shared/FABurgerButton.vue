<template>
  <div class="burger-button">
    <button 
      class="btn"
      @click="handleClick()"
    >
      <i class="pi pi-bars" />
    </button>
  </div>
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
.burger-button{
  display: block;
}
.pi-bars{
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>