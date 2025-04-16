
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
      <RouterLink :to="{ name: RoutesNames.Profile }">
        <FAButton
          icon="pi-user"
        />
      </RouterLink>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FAButton from '@/components/shared/FAButton.vue';
import FABurgerButton from '@/components/shared/FABurgerButton.vue';
import { DARK_THEME_CLASS } from '@/constants';
import { RoutesNames } from '@/router/types';

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
      RoutesNames,
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