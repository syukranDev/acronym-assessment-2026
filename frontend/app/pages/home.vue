<template>
  <div class="flex flex-1 items-center justify-center px-4">
    <div class="mx-auto max-w-2xl text-center">
      <h1 class="text-2xl font-semibold mb-2">
        Welcome <span v-if="displayName"> {{ displayName }}</span>
      </h1>
      <p v-if="auth.isAuthed" class="text-muted">
        You have logged in, click my profile to see your details
      </p>
      <p v-else class="text-muted">Please log in</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const auth = useAuthStore()

const decodedTokenName = computed(() => {
  if (!auth.token) return ''

  try {
    const payload = auth.token.split('.')[1]
    if (!payload) return ''
    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/')
    const decoded = JSON.parse(atob(normalized))
    return decoded?.name || ''
  } catch {
    return ''
  }
})

const displayName = computed(() => auth.user?.name || decodedTokenName.value)
</script>
