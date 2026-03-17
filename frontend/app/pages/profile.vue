<template>
  <div class="mx-auto max-w-2xl space-y-6 px-4 py-12">
    <h1 class="text-2xl font-semibold">Profile</h1>
    <UCard>
      <dl class="space-y-4">
        <div>
          <dt class="text-sm font-medium text-muted">Name</dt>
          <dd class="mt-1">{{ name || '–' }}</dd>
        </div>
        <div>
          <dt class="text-sm font-medium text-muted">Email</dt>
          <dd class="mt-1">{{ email || '–' }}</dd>
        </div>
      </dl>
      <template #footer>
        <UButton color="primary">
          Edit profile
        </UButton>
      </template>
    </UCard>
  </div>
</template>

<script setup lang="ts">
const name = ref('')
const email = ref('')
</script>
