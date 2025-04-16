<template>
  <div class="lists">
    <div class="lists__header">
      <h2 class="lists__name">
        Lists of Movie
      </h2>
      <div>
        <button 
          class="lists__header__btn"
          @click="addList"
        >
          <i 
            class="pi pi-plus"
            style="font-size: small"
          />
          Add List
        </button>
      </div>
    </div>
    <ModalListAdd
      :isAdding="isAdding"
      @close="closeAdd"
      @handleClick="(value) => addListToLocalStorage(value)"
    />
    <ModalListEditor
      :list="editingList"
      @close="closeEditor"
      @rename="(id, value) => renameList(id, value)"
    />
    <ModalListDelete
      :list="deletingList"
      @close="closeDeleted"
      @reject="closeDeleted"
      @confirm="(id) => handleDelete(id)"
    />
    <div
      v-for="list in lists"
      :key="list.id"
      class="list"
      @click="goToList()"
    >
      <div class="list__name">
        {{ list.name }}
      </div>
      <div class="list__buttons">
        <button
          :class="['pi pi-trash', list.isSystem === true ? 'disabled' : '']"
          @click.stop="handleClick(list.id)" 
        />
        <button 
          class="pi pi-pencil" 
          @click.stop="handleEdit(list.id)" 
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getLists } from '@/services/api/listsApi';
import { RoutesNames } from '@/router/types';
import ModalListAdd from '../layouts/ModalListAdd.vue';
import { LocalStorageKeys } from '@/services/api/types';
import type { List } from '@/services/api/types';
import { createList } from '@/services/api/listsApi';
import ModalListEditor from '../layouts/ModalListEditor.vue';
import { updateLs } from '@/services/api/listsApi';
import ModalListDelete from '../layouts/ModalListDelete.vue';


export default defineComponent({
  components: {
    // Dialog,
    ModalListAdd,
    ModalListDelete,
    ModalListEditor,
  },
  setup() {
    const editingList = ref<List | undefined>();
    const deletingList = ref<List | undefined>();
    const listId = ref(0);
    const isAdding = ref(false);
    const isEditing = ref(false);
    const isDeleted = ref(false);
    const lists = ref<List[]>([]);
    onMounted(async () => {
      // localStorage.clear();
      await drawLists();
    });
    const router = useRouter();

    const goToList = async () => {
      await router.push({ name: RoutesNames.List });
    };
    const addListToLocalStorage = async (value: string) => {
      await createList(value);
      closeAdd();
      await drawLists();
      
    };
    const drawLists = async () => {
      lists.value = await getLists();
    };
    const handleClick = (id: number) => {
      deletingList.value = lists.value.filter((list) => list.id === id)[0];
      isDeleted.value = true;
    };
    const handleEdit = (id: number) => {
      editingList.value = lists.value.filter((list) => list.id === id)[0];
    };
    const addList = () => {
      isAdding.value = true;
    };
    const closeEditor = () => {
      editingList.value = undefined;
    };
    const closeAdd = () => {
      isAdding.value = false;
    };
    const closeDeleted = () => {
      deletingList.value = undefined;
    };
    const renameList = (id: number, value: string) => {
      lists.value = lists.value.map((list) => {
        return {
          ...list,
          name: list.id === id ? value : list.name,
        };
      });
      updateLs(lists.value);
      editingList.value = undefined;
    };
    const handleDelete = (id: number) => {
      lists.value = lists.value.filter((list) => list.id !== id);
      updateLs(lists.value);
      deletingList.value = undefined;
    };

    return{
      RoutesNames,
      lists,
      addList,
      isAdding,
      closeEditor,
      LocalStorageKeys,
      addListToLocalStorage,
      goToList,
      handleDelete,
      isDeleted,
      closeDeleted,
      handleClick,
      listId,
      handleEdit,
      isEditing,
      closeAdd,
      renameList,
      editingList,
      deletingList,
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
}
.list:hover{
  border: 1px solid blue;
  transform: scale();
}
.lists__name{
  margin-bottom: 20px;
}
.lists__header{
  display: flex;
  justify-content: space-between;
}
.lists__header__btn{
  display: flex;
  gap: 5px;
  padding: 5px;
  cursor: pointer;
}
.list__buttons{
  display: flex;
  gap: 10px;
}
.list__buttons button{
  padding: 5px;
}
.list__buttons button:hover{
  background-color: antiquewhite;
}
.disabled{
  opacity: 0.5;
  pointer-events: none;
}
</style>