
<template>
  <FAModal
    :visible="list !== undefined"
    :header="`Do you want to delete '${value?.name}' list?`"
    @close="close"
  >
    <template #footer>
      <PrimeButton
        label="Cancel"
        text
        severity="secondary"
        @click="close"
      />
      <PrimeButton
        label="Delete"
        :loading="loading"
        :disabled="loading"
        severity="primary"
        @click="confirm(value!.id)"
      /> 
    </template>
  </FAModal>
</template>

<script lang="ts">
import { defineComponent, ref, watch, type PropType } from 'vue';
import { Button as PrimeButton } from 'primevue';
import type { List } from '@/services/api/types';
import FAModal from '@/components/shared/FAModal.vue';

export default defineComponent({
  components: {
    FAModal,
    PrimeButton,
  },
  props: {
    list: {
      type: Object as PropType<List | undefined>,
      default: undefined,
    },
  },
  emits: ['close', 'confirm'],
  setup(props, ctx) {
    const loading = ref(false);
    const value = ref<List | undefined>();
    const close = () => {
      ctx.emit('close');
    };
    const confirm = async (id: number) => {
      loading.value = true;
      ctx.emit('confirm', id);
      await new Promise(resolve => setTimeout(resolve, 1000));
      loading.value = false;
    };

    watch(
      () => props.list,
      (newVal) => {
        if(newVal !== undefined){
          value.value = newVal;
        }
      },
    );

    return {
      close,
      value,
      confirm,
      loading,
    };
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