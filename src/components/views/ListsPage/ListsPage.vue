<template>
  <div class="lists">
    <div class="lists__header">
      <h2 class="lists__name">
        Lists of Movie
      </h2>
      <div>
        <FAButton 
          class="lists__header-btn"
          icon="pi-plus"
          @click="addList"
        >
          Add List
        </FAButton> 
      </div>
    </div>
    <div v-if="isLoading">
      <p>Loading.....</p>
    </div>
    <template v-else>
      <div
        v-for="list in lists"
        :key="list.id"
        class="list"
        @click="goToList(list.id)"
      >
        <div class="list__name">
          {{ list.name }}
        </div>
        <div class="list__buttons">
          <FAButton 
            icon="pi-trash"
            :class="[list.isSystem === true ? 'disabled' : '']"
            @click.stop="handleDelete(list.id)"
          />
          <FAButton 
            icon="pi-pencil"
            :class="[list.isSystem === true ? 'disabled' : '']"
            @click.stop="handleEdit(list.id)"
          />
        </div>
      </div>
    </template>
    <ModalListAdd
      :visible="isAdding"
      @close="closeModalAdd"
      @handleClick="(value) => addListToApi(value)"
    />
    <ModalListEditor
      :list="editingList"
      @close="closeModalEdit"
      @rename="(id, value) => renameList(id, value)"
    />
    <ModalListDelete
      :list="deletingList"
      @close="closeModalDelete"
      @reject="closeModalDelete"
      @confirm="(id) => deleteList(id)"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { RoutesNames } from '@/router/types';
import ModalListAdd from '@/components/views/ListsPage/components/ModalListAdd.vue';
import { LocalStorageKeys } from '@/services/api/types';
import type { List } from '@/services/api/types';
import ModalListEditor from '@/components/views/ListsPage/components/ModalListEditor.vue';
import ModalListDelete from '@/components/views/ListsPage/components/ModalListDelete.vue';
import FAButton from '@/components/shared/FaIconButton.vue';
import { useStore } from 'vuex';
import type { State } from '@/store/store';

export default defineComponent({
  components: {
    ModalListAdd,
    ModalListDelete,
    ModalListEditor,
    FAButton,
  },
  setup() {
    const store = useStore<State>();
    const lists = computed(() => store.state.lists);
    const isLoading = computed(() => store.state.isListsLoading);
    const editingList = ref<List | undefined>();
    const deletingList = ref<List | undefined>();
    const isAdding = ref(false);
    const router = useRouter();

    const goToList = async (id: number) => {
      await router.push({ name: RoutesNames.List, params: { id } });
    };
    const addListToApi = async (value: string) => {
      await store.dispatch('addList', value);
      isAdding.value = false;
    };
    const handleDelete = (id: number) => {
      deletingList.value = lists.value.filter((list) => list.id === id)[0];
    };
    const handleEdit = (id: number) => {
      editingList.value = lists.value.filter((list) => list.id === id)[0];
    };
    const addList = () => {
      isAdding.value = true;
    };
    const closeModalEdit = () => {
      editingList.value = undefined;
    };
    const closeModalAdd = () => {
      isAdding.value = false;
    };
    const closeModalDelete = () => {
      deletingList.value = undefined;
    };
    const renameList = async (id: number, value: string) => {
      const result = lists.value.filter((item) => item.id === id)[0];
      result.name = value;
      await store.dispatch('updateList', result);
      closeModalEdit();
    };
    const deleteList = async (id: number) => {
      await store.dispatch('deleteList', id);
      closeModalDelete();
    };

    return{
      RoutesNames,
      lists,
      addList,
      isAdding,
      closeModalEdit,
      LocalStorageKeys,
      addListToApi,
      goToList,
      deleteList,
      closeModalDelete,
      handleDelete,
      handleEdit,
      closeModalAdd,
      renameList,
      editingList,
      deletingList,
      isLoading,
    };
  },
});
</script>

<style scoped>
.list{
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  border: 1px solid black;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.5s ease;
}
.list:hover{
  border: 1px solid blue;
  transform: translateY(-5px);
  background-color: gainsboro;
}
.lists__name{
  font-size: 25px;
  font-weight: 700;
  margin-bottom: 20px;
}
.list__name{
  display: flex;
  align-items: center;
  font-size: 20px;
}
.lists__header{
  display: flex;
  justify-content: space-between;
}
.lists__header-btn{
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  padding: 7px;
}
.list__buttons{
  display: flex;
  gap: 10px;
}
.list__buttons button{
  padding: 5px;
}
.disabled{
  opacity: 0.5;
  pointer-events: none;
}
</style>