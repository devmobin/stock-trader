<template>
  <div class="alert alert-success" role="alert">
    <h4 class="alert-heading">{{ title }}</h4>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ["title"]
};
</script>

<style scoped>
.alert {
  position: fixed;
  top: 20px;
  right: 15px;
  z-index: 1000;
}
</style>
