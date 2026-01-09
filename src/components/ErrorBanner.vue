<template>
  <div v-if="message" class="error-banner">
    <span>{{ message }}</span>
    <button class="clear-error" type="button" @click="$emit('clear')">×</button>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    default: "",
  },
});

defineEmits(["clear"]);
</script>

<style scoped lang="scss">
@use "../assets/theme" as *;

.error-banner {
  background: rgba($danger, 0.16);
  border: 1px solid rgba($danger, 0.4);
  color: $ink;
  padding: 12px 14px;
  border-radius: 14px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  box-shadow: $shadow-sm;
}

.clear-error {
  background: transparent;
  border: none;
  color: $ink;
  font-size: 18px;
  cursor: pointer;
  line-height: 1;
  padding: 0 6px;

  &:focus-visible {
    @include focus-ring($danger);
  }
}
</style>
