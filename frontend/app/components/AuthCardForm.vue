<template>
  <div class="mx-auto max-w-md space-y-6 px-4 py-12">
    <h1 class="text-2xl font-semibold">{{ title }}</h1>

    <UCard>
      <form class="space-y-4" @submit.prevent="onSubmit">
        <UFormField v-if="mode === 'signup'" label="Name" required>
          <UInput
            v-model="name"
            type="text"
            placeholder="Enter your name"
            class="w-full"
          />
        </UFormField>

        <UFormField label="Email" required>
          <UInput
            v-model="email"
            type="email"
            placeholder="Enter your email"
            class="w-full"
          />
        </UFormField>

        <UFormField label="Password" required>
          <UInput
            v-model="password"
            type="password"
            placeholder="Enter your password"
            class="w-full"
          />
        </UFormField>

        <UButton type="submit" block color="primary" class="text-white">
          {{ submitLabel }}
        </UButton>
      </form>

      <template #footer>
        <p class="text-center text-sm text-muted">
          <template v-if="mode === 'login'">
            Don't have an account?
            <ULink to="/signup" color="primary">Sign up</ULink>
          </template>
          <template v-else>
            Already have an account?
            <ULink to="/login" color="primary">Login</ULink>
          </template>
        </p>
      </template>
    </UCard>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  mode: 'login' | 'signup'
}>()

const name = ref('')
const email = ref('')
const password = ref('')

const title = computed(() => (props.mode === 'login' ? 'Login' : 'Sign up'))
const submitLabel = computed(() => (props.mode === 'login' ? 'Login' : 'Sign up'))

function onSubmit() {}

</script>
