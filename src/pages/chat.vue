<script setup lang="ts">

</script>

<template>
  <div class="flex">
    暂未开放
  </div>
</template>

<style scoped>
.item {
  transition: all 0.5s;
  &:not(:last-child) {
    margin-right: 20px;
  }
}
.item:hover {
  transform: scale(1.1);
  box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.6);
}
</style>

<route lang="yaml">
meta:
  layout: center
</route>
