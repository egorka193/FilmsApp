<template>
  <div class="profile-page">
    <div class="profile-page__header">
      <div>
        <img
          class="profile-page__img" 
          src="/src/assets/img/Avatar.png"
        >
        <h2>
          Your profile:
        </h2>
      </div>
    </div>
    <div class="profile-page__editor">
      <ProfileInput
        label="First Name"
        :value="profile.firstName"
        @handleInput="fieldChange('firstName', $event)"
      />
      <ProfileInput
        label="Last Name"
        :value="profile.lastName"
        @handleInput="fieldChange('lastName', $event)"
      />
      <ProfileInput
        label="Email"
        :value="profile.email"
        @handleInput="fieldChange('email', $event)"
      />
      <ProfileInput
        label="Phone Number"
        :value="profile.phone"
        @handleInput="fieldChange('phone', $event)"
      />
      <ProfileInput
        label="Nick Name"
        :value="profile.nickName"
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

    const profile = computed< Profile >(() => store.state.profile.profile);
    const isEditing = computed(() => store.state.profile.isEditing);
    const formDraft = ref<Profile | null>(null);
    
    const handleSave = async () => {
      await store.dispatch('profile/saveChanges', formDraft.value);
    };

    const fieldChange = async (key: keyof Profile, value: string) => {
      await store.dispatch('profile/changeGraph');
      if (formDraft.value) {
        formDraft.value[key] = value;
      }
    };
    onMounted(async () => {
      await store.dispatch('profile/initProfile');
      formDraft.value = { ...profile.value };
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
.profile-page {
  max-width: 1400px;
  margin: 40px auto;
  background-color: #fff;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  font-family: 'Segoe UI', sans-serif;
}
.profile-page__img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid #4f46e5;
}
.profile-page__editor{
  max-width: 1500px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  margin-bottom: 20px;
}
.profile-page__input{
  width: 400px;
  height: 50px;
}
.profile-page__header{
  display: flex;
  justify-content: space-between;
}
</style>