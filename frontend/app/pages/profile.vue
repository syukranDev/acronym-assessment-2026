<template>
  <div class="mx-auto w-[50%] space-y-6 px-4 py-12">
    <h1 class="text-2xl font-semibold">Profile</h1>
    <UAlert
      v-if="errorMessage"
      color="error"
      variant="subtle"
      :title="errorMessage"
    />
    <UCard>
      <dl class="space-y-4">
        <div>
          <dt class="text-sm font-medium text-muted">Name</dt>
          <dd class="mt-1">{{ auth.user?.name || '–' }}</dd>
        </div>
        <div>
          <dt class="text-sm font-medium text-muted">Email</dt>
          <dd class="mt-1">{{ auth.user?.email || '–' }}</dd>
        </div>
        <div>
          <dt class="text-sm font-medium text-muted">Created At</dt>
          <dd class="mt-1">{{ formattedCreatedAt }}</dd>
        </div>
        <div>
          <dt class="text-sm font-medium text-muted">Updated At</dt>
          <dd class="mt-1">{{ formattedUpdatedAt }}</dd>
        </div>
      </dl>
      <template #footer>
        <UButton color="primary" class="w-full justify-center py-3 text-base font-medium text-white" @click="handleLogout">
          Logout
        </UButton>
      </template>
    </UCard>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})

const auth = useAuthStore()
const errorMessage = ref<string | null>(null)
const formattedCreatedAt = computed(() => formatDate(auth.user?.created_at))
const formattedUpdatedAt = computed(() => formatDate(auth.user?.updated_at))

function formatDate(value?: string | null) {
  if (!value) return '–'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleString()
}

async function handleLogout() {
  auth.logout()
  await navigateTo('/login')
}

onMounted(async () => {
  if (auth.user?.created_at && auth.user?.updated_at) return
  try {
    await auth.fetchProfile()
  } catch (err: any) {
    errorMessage.value = err?.message || 'Failed to load profile'
  }
})
</script>
