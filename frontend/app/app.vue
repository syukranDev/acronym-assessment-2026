<template>
  <UApp>
    <div class="flex min-h-screen flex-col">
      <NuxtRouteAnnouncer />
      <AppNavbar />
      <main class="flex-1">
        <NuxtPage />
      </main>
      <AppFooter />
    </div>
  </UApp>
</template>
