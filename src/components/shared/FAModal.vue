<template>
  <PrimeDialog
    modal
    dismissable-mask
    :visible="visible"
    :style="{ width: `${width}px` }"
    :header="header"
    @update:visible="close"
  >
    <slot />
    <template #footer>
      <slot name="footer" />
    </template>
  </PrimeDialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Dialog as PrimeDialog } from 'primevue';

export default defineComponent({
  components: {
    PrimeDialog,
  },
  props: {
    width: {
      type: String,
      default: '500',
    },
    visible: {
      type: Boolean,
      default: false,
    },
    header: {
      type: String,
      required: true,
    },
  },
  emits: ['close'],
  setup(props, ctx) {
    const value = ref('');
    const close = () => {
      ctx.emit('close');
    };

    return {
      close,
      value,
    };
  },
});
</script>

<style scoped>

</style>