
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
        :loading="loading"
        :disabled="loading || value === ''"
        severity="primary"
        @click="handleClick"
      /> 
    </template>
  </FAModal>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { InputText, Button as PrimeButton } from 'primevue';
import FAModal from '@/components/shared/FAModal.vue';

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
    const loading = ref(false);
    const close = () => {
      ctx.emit('close');
    };
    const handleClick = () => {
      loading.value = true;
      if (value.value) {
        ctx.emit('handleClick', value.value);
      }
      value.value = '';
    };
    watch(
      () => props.visible,
      (newVal) => {
        if(newVal === false){
          loading.value = false;
        }
      },
    );

    return {
      close,
      value,
      handleClick,
      loading,
    };
  },
});
</script>

<style scoped>
.modal-content__input {
  width: 100%;
}
.disabled{
  opacity: 0.3;
  pointer-events: none;
}
</style>