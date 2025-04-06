<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="header">
    <div>
      <FABurgerButton
        src="mode"
        @handleClick="clickOnMenu()"
      />
    </div>
    <div class="header__buttons">
      <FAButton
        src="pi pi-palette"
        @click="toggleDarkMode()"
      />
      <RouterLink to="/profile">
        <FAButton
          src="pi pi-user"
        />
      </RouterLink>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FAButton from '../shared/FAButton.vue';
import FABurgerButton from '../shared/FABurgerButton.vue';

export default defineComponent({
  components: {
    FAButton,
    FABurgerButton,
  },
  emits: ['clickOnMenu'],
  setup(props, ctx) {
    const toggleDarkMode = () => {
      document.documentElement.classList.toggle('my-app-dark');
    };
    const clickOnMenu = () => {
      ctx.emit('clickOnMenu');
    };

    return {
      toggleDarkMode,
      clickOnMenu,
    };
  },
});
</script>

<style scoped>
.header{
  display: flex;
  justify-content: space-between;
  padding: 25px;
}
.header__buttons{
  display: flex;
  gap: 15px;
}

</style>