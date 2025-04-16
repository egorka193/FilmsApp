
<template>
  <PrimeDialog
    modal
    dismissable-mask
    :visible="isAdding"
    :style="{ width: '500px' }"
    header="What shall we call your new list?"
    @update:visible="close"
  >
    <div class="modal-content">
      <InputText
        v-model="value"
        class="modal-content__input"
        placeholder="Name of list"
        @keydown.enter="handleClick"
      />
    </div>
    <template #footer>
      <PrimeButton
        label="Cancel"
        text
        severity="secondary"
        @click="close"
      />
      <PrimeButton
        label="Add"
        severity="primary"
        @click="handleClick"
      />
    </template>
  </PrimeDialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { InputText, Dialog as PrimeDialog, Button as PrimeButton } from 'primevue';

export default defineComponent({
  components: {
    InputText,
    PrimeDialog,
    PrimeButton,
  },
  props: {
    isAdding: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['close', 'handleClick'],
  setup(props, ctx) {
    const value = ref('');
    const close = () => {
      ctx.emit('close');
    };
    const handleClick = () => {
      if (value.value) {
        ctx.emit('handleClick', value.value);
      }
    };

    return {
      close,
      value,
      handleClick,
    };
  },
});
</script>

<style scoped>
.modal-content__input {
  width: 100%;
}
</style>