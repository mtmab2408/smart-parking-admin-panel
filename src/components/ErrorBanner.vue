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

<style scoped>
.error-banner {
  background: rgba(255, 0, 0, 0.15);
  border: 1px solid rgba(255, 0, 0, 0.35);
  color: white;
  padding: 10px 14px;
  border-radius: 12px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.clear-error {
  background: transparent;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
  line-height: 1;
  padding: 0 6px;
}
</style>
