<script setup lang="ts">
const router = useRouter()
const { t } = useI18n()
</script>

<template>
  <main class="pt100 dfc jcc aic">
    <div class="i-carbon-warning fz200 c-#e5a146" />
    <RouterView />
    <button class="w200 h50 rad50 fz18 c-#fff bgc-#09f" @click="router.back()">
      {{ t('button.back') }}
    </button>
  </main>
</template>

<style>
button {
  border: none;
}
</style>
