<template>
  <UApp>
    <div class="flex min-h-screen flex-col">
      <NuxtRouteAnnouncer />
      <AppNavbar />
      <main class="flex flex-1">
        <div class="flex flex-1 flex-col">
          <NuxtPage />
        </div>
      </main>
      <AppFooter />
    </div>

    <ULink
      :href="swaggerUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="fixed right-0 top-1/5 z-50 -translate-y-1/2 rounded-l-lg bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-orange-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
    >
      API Docs
    </ULink>
  </UApp>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()

const swaggerUrl = computed(() => {
  const apiBase = String(config.public.apiBase || '').trim().replace(/\/+$/, '')
  return `${apiBase}/swagger`
})
</script>
