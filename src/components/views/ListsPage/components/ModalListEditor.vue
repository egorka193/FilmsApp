
<template>
  <FAModal
    :visible="list !== undefined"
    header="What shall we rename this list?"
    @close="close"
  >
    <div class="modal-content">
      <InputText
        v-model="value"
        class="modal-content__input"
        placeholder="Name of list"
        @keyup.enter="rename(list!.id, value)"
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
        label="Rename"
        severity="primary"
        @click="rename(list!.id, value)"
      /> 
    </template>
  </FAModal>
</template>

<script lang="ts">
import { defineComponent, ref, type PropType, watch } from 'vue';
import { InputText, Button as PrimeButton } from 'primevue';
import type { List } from '@/services/api/types';
import FAModal from '@/components/shared/FAModal.vue';


export default defineComponent({
  components: {
    FAModal,
    InputText,
    PrimeButton,
  },
  props: {
    list: {
      type: Object as PropType<List | undefined>,
      default: undefined,
    },
  },
  emits: ['close', 'rename'],
  setup(props, ctx) {
    const value = ref('');
    const close = () => {
      ctx.emit('close');
    };
    const rename = (id: number, value: string) => {
      ctx.emit('rename', id, value);
    };

    watch(
      () => props.list,
      (newVal) => {
        if(newVal !== undefined){
          value.value = newVal.name;
        }
      },
    );

    return {
      close,
      value,
      rename,
    };
  },
});
</script>

<style scoped>
.modal-content__input {
  width: 100%;
}
</style>