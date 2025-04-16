
<template>
  <PrimeDialog
    modal
    dismissable-mask
    :visible="list !== undefined"
    :style="{ width: '500px' }"
    :header="`Do you want to delete '${value?.name}' list?`"
    @update:visible="close"
  >
    <template #footer>
      <PrimeButton
        label="Cancel"
        text
        severity="secondary"
        @click="reject"
      />
      <PrimeButton
        label="Delete"
        severity="primary"
        @click="confirm(value!.id)"
      />
    </template>
  </PrimeDialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Dialog as PrimeDialog, Button as PrimeButton } from 'primevue';
import type { List } from '@/services/api/types';

export default defineComponent({
  components: {
    PrimeDialog,
    PrimeButton,
  },
  props: {
    list: {
      type: Object,
      default: undefined,
    },
  },
  emits: ['close', 'reject', 'confirm'],
  setup(props, ctx) {
    const value = ref<List | undefined>();
    const close = () => {
      ctx.emit('close');
    };
    const confirm = (id: number) => {
      ctx.emit('confirm', id);
    };
    const reject = () => {
      ctx.emit('reject');
    };

    return {
      close,
      value,
      reject,
      confirm,
    };
  },
  watch: {
    list: {
      handler(newNal) {
        if(newNal !== undefined){
          this.value = newNal;
        }
      },
    },
  },
});
</script>

<style scoped>
.overlay {
  position: fixed;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  z-index: 1;
  cursor: pointer;
}
.modal-content{
  background-color: rgb(171, 184, 204);
  width: 500px;
  border-radius: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  padding: 20px;
}
.modal__top-cross {
  cursor: pointer;
  color: black;
  position: absolute;
  right: 20px;
  top: 10px;
}
.modal__top-cross:hover{
  transition: all 0.5s ease;
  color: aliceblue;
}
.modal__top-title {
  font-size: 25px;
  margin: 10px;
  color: rgb(0, 0, 0);
  font-weight: 600;
  display: flex;
  justify-content: center;
}
.modal__buttons{
  display: flex;
  justify-content: center;
  gap: 10px;
}
</style>