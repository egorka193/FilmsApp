<template>
  <div class="profile__page">
    <div class="profile__page__header">
      <div>
        <img
          class="profile__page__img" 
          src="/src/assets/img/Avatar.png"
        >
        <h2>
          Contact Details:
        </h2>
      </div>
    </div>
    <div 
    class="profile__page__editor"
    >
      <ProfileInput
        name-of-graph="First Name"
        :text="profile.firstName"
        @handleInput="fieldChange('firstName', $event)"
      />
      <ProfileInput
        name-of-graph="Last Name"
        :text="profile.lastName"
        @handleInput="fieldChange('lastName', $event)"
      />
      <ProfileInput
        name-of-graph="Email"
        :text="profile.email"
        @handleInput="fieldChange('email', $event)"
      />
      <ProfileInput
        name-of-graph="Phone Number"
        :text="profile.phone"
        @handleInput="fieldChange('phone', $event)"
      />
      <ProfileInput
        name-of-graph="Nick Name"
        :text="profile.nickName"
        @handleInput="fieldChange('nickName', $event)"
      />
    </div>
    <PrimeButton
      :loading="isEditing"
      :disabled="isEditing === false"
      @click="handleSave"
    >
      Save Changes
    </PrimeButton>
  </div>
</template>

<script lang="ts">
import { Button as PrimeButton } from 'primevue';
import ProfileInput from './components/ProfileInput.vue';
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import type { Profile } from '@/services/api/types';

export default defineComponent({
  components: {
    ProfileInput,
    PrimeButton,
  }, 
  setup() {
    const store = useStore();

    const profile = computed(() => store.state.profile.profile);
    const isEditing = computed(() => store.state.profile.isEditing);
    
    const handleSave = () => {
      store.dispatch('profile/saveChanges');
    };

    const fieldChange = (key: keyof Profile, value: string) => {
      console.log(key, value);
      
      store.dispatch('profile/updateField', { key, value });
    };
    onMounted(async () => {
      store.dispatch('profile/initProfile');
    });

    return {
      isEditing,
      handleSave,
      fieldChange,
      profile,
    };
  },
});
</script>

<style scoped>
.profile__page {
  max-width: 1400px;
  margin: 40px auto;
  background-color: #fff;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  font-family: 'Segoe UI', sans-serif;
}
.profile__page__img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid #4f46e5; /* синий акцент */
}
.profile__page__editor{
  max-width: 1500px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  margin-bottom: 20px;
}
.profile__page__input{
  width: 400px;
  height: 50px;
}
.profile__page__header{
  display: flex;
  justify-content: space-between;
}
</style>