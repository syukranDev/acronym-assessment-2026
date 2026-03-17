<template>
  <div class="mx-auto max-w-md space-y-6 px-4 py-12">
    <h1 class="text-2xl font-semibold">{{ title }}</h1>

    <UCard>
      <form class="space-y-4" @submit.prevent="onSubmit">
        <UAlert
          v-if="errorMessage"
          color="error"
          variant="subtle"
          :title="errorMessage"
        />

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

        <UButton
          type="submit"
          block
          color="primary"
          class="text-white"
          :loading="pending"
        >
          {{ submitLabel }}
        </UButton>
      </form>

      <template #footer>
        <p class="text-center text-sm text-muted">
          <template v-if="mode === 'login'">
            Don't have an account?
            <ULink to="/signup" color="primary" class="text-primary">Sign up</ULink>
          </template>
          <template v-else>
            Already have an account?
            <ULink to="/login" color="primary" class="text-primary">Login</ULink>
          </template>
        </p>
      </template>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import type { AxiosError } from 'axios'
import { useAuthStore } from '../stores/auth'
import { signupApi } from '../services/api/auth'

const props = defineProps<{
  mode: 'login' | 'signup'
}>()

const name = ref('')
const email = ref('')
const password = ref('')

const title = computed(() => (props.mode === 'login' ? 'Login' : 'Sign up'))
const submitLabel = computed(() => (props.mode === 'login' ? 'Login' : 'Sign up'))

const auth = useAuthStore()
const errorMessage = ref<string | null>(null)
const pending = ref(false)

async function onSubmit() {
  errorMessage.value = null
  pending.value = true

  try {
    if (props.mode === 'login') {
      await auth.login({ email: email.value, password: password.value })
      await navigateTo('/home')
      return
    }

    const response = await signupApi({
      name: name.value,
      email: email.value,
      password: password.value
    })
    if (response.status !== 'success') {
      throw new Error(response.message || 'Signup failed')
    }
    await navigateTo('/login')
  } catch (err: any) {
    const axiosErr = err as AxiosError<any>
    errorMessage.value =
      axiosErr?.response?.data?.message ||
      axiosErr?.message ||
      (props.mode === 'login' ? 'Login failed' : 'Signup failed')
  } finally {
    pending.value = false
  }
}

</script>
