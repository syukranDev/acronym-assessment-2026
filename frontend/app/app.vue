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
  </UApp>
</template>
