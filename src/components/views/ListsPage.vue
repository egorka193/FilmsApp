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
    <div
      v-for="list in lists"
      v-else
      :key="list.id"
      class="list"
      @click="goToList()"
    >
      <div class="list__name">
        {{ list.name }}
      </div>
      <div class="list__buttons">
        <FAButton 
          icon="pi-trash"
          :class="[list.isSystem === true ? 'disabled' : '']"
          @click.stop="handleClick(list.id)"
        />
        <FAButton 
          icon="pi-pencil"
          :class="[list.isSystem === true ? 'disabled' : '']"
          @click.stop="handleEdit(list.id)"
        />
      </div>
    </div>
    <ModalListAdd
      :visible="isAdding"
      @close="closeAdd"
      @handleClick="(value) => addListToApi(value)"
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
      @confirm="(id) => deleteList(id)"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { RoutesNames } from '@/router/types';
import ModalListAdd from '../layouts/ModalListAdd.vue';
import { LocalStorageKeys } from '@/services/api/types';
import type { List } from '@/services/api/types';
import ModalListEditor from '../layouts/ModalListEditor.vue';
import ModalListDelete from '../layouts/ModalListDelete.vue';
import FAButton from '../shared/FAButton.vue';
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
    const isLoading = ref(true);
    const editingList = ref<List | undefined>();
    const deletingList = ref<List | undefined>();
    const listId = ref(0);
    const isAdding = ref(false);
    onMounted(async () => {
      // localStorage.clear();
      await store.dispatch('initList');
      isLoading.value = false;
    });
    const router = useRouter();

    const goToList = async () => {
      await router.push({ name: RoutesNames.List });
    };
    const addListToApi = async (value: string) => {
      await store.dispatch('addList', value);
      isAdding.value = false;
    };
    const handleClick = (id: number) => {
      deletingList.value = lists.value.filter((list) => list.id === id)[0];
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
    const renameList = async (id: number, value: string) => {
      const result = lists.value.filter((item) => item.id === id)[0];
      result.name = value;
      await store.dispatch('updateList', result);
      closeEditor();
      // lists.value = lists.value.map((list) => {
      //   return {
      //     ...list,
      //     name: list.id === id ? value : list.name,
      //   };
      // });
      // await updateLists(lists.value);
      // editingList.value = undefined;
    };
    const deleteList = async (id: number) => {
      await store.dispatch('deleteList', id);
      closeDeleted();
    };

    return{
      RoutesNames,
      lists,
      addList,
      isAdding,
      closeEditor,
      LocalStorageKeys,
      addListToApi,
      goToList,
      deleteList,
      closeDeleted,
      handleClick,
      listId,
      handleEdit,
      closeAdd,
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
}
.list:hover{
  border: 1px solid blue;
  transform: scale();
}
.lists__name{
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