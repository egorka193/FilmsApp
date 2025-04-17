
<template>
  <FAModal
    :visible="visible"
    header="What shall we call your new list?"
    @close="close"
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
  </FAModal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { InputText, Button as PrimeButton } from 'primevue';
import FAModal from '../shared/FAModal.vue';

export default defineComponent({
  components: {
    FAModal,
    InputText,
    PrimeButton,
  },
  props: {
    visible: {
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
      value.value = '';
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