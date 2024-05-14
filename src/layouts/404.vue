<script setup lang="ts">
const router = useRouter()
const { t } = useI18n()
</script>

<template>
  <main class="flex flex-col items-center justify-center pt-100px">
    <div class="i-carbon-warning text-200px c-#e5a146" />
    <RouterView />
    <button class="h-50px w-200px rd-50px bg-#09f text-18px c-#fff" @click="router.back()">
      {{ t('button.back') }}
    </button>
  </main>
</template>

<style>
button {
  border: none;
}
</style>
