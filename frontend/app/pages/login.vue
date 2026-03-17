<template>
  <AuthCardForm mode="login" />
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['guest']
})
</script>
