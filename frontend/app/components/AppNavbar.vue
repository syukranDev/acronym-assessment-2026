<template>
  <UHeader :toggle="false">
    <template #left>
      <ULink to="/home" class="text-lg font-semibold">
        Acronym
      </ULink>
    </template>
    <template #right>
      <UButton
        v-if="auth.isAuthed"
        to="/profile"
        label="My Profile"
        color="primary"
        variant="ghost"
        class="text-orange-500 hover:text-orange-600"
        aria-label="My Profile"
      />
      <UButton
        v-else
        to="/login"
        icon="i-lucide-log-in"
        label="Login"
        color="primary"
        variant="ghost"
        class="text-orange-500 hover:text-orange-600"
        aria-label="Login"
      />
    </template>
  </UHeader>
</template>

<script setup lang="ts">
const auth = useAuthStore()
</script>
