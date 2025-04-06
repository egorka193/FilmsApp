
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
        icon="pi-palette"
        @click="toggleDarkMode()"
      />
      <RouterLink :to="{ name: 'Profile' }">
        <FAButton
          icon="pi-user"
        />
      </RouterLink>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FAButton from '../shared/FAButton.vue';
import FABurgerButton from '../shared/FABurgerButton.vue';
import { DARK_THEME_CLASS } from '@/constants';

export default defineComponent({
  components: {
    FAButton,
    FABurgerButton,
  },
  emits: ['clickOnMenu'],
  setup(props, ctx) {
    const toggleDarkMode = () => {
      document.documentElement.classList.toggle(DARK_THEME_CLASS);
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