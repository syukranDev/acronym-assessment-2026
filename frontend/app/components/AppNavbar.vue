<template>
  <UHeader :toggle="false">
    <template #left>
      <ULink to="/home" class="text-lg font-semibold">
        Acronym
      </ULink>
    </template>
    <template #right>
      <UButton
        to="/login"
        icon="i-lucide-log-in"
        color="primary"
        variant="ghost"
        aria-label="Login"
      />
    </template>
  </UHeader>
</template>
