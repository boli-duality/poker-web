<script setup lang="ts">
useHead({
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: '/vite.svg',
    },
  ],
  title: 'BoLi',
})

const isDark = useDark()
isDark.value = true
</script>

<template>
  <RouterView />
</template>

<style scoped>
</style>
