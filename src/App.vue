<script setup lang="ts"></script>

<template>
  <HospitalTop />
  <div class="container">
    <routerView />
  </div>
  <HospitalBottom />
</template>

<style scoped lang="scss">
.container {
  min-height: 500px;
  margin: 70px 0 60px;
}
</style>
