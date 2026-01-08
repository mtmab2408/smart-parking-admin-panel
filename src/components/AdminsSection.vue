<script setup>
const props = defineProps({
  admins: { type: Array, default: () => [] },
  adminUsername: { type: String, default: "" },
  adminPassword: { type: String, default: "" },
  editAdminId: { type: [Number, String, null], default: null },
  loading: { type: Boolean, default: false },
});

const emit = defineEmits([
  "update:admin-username",
  "update:admin-password",
  "submit-admin",
  "reset-admin-form",
  "start-edit-admin",
  "delete-admin",
]);
</script>

<template>
  <section class="panel">
    <div class="panel-head">
      <h2>Admins</h2>
      <span class="count">{{ admins.length }}</span>
    </div>

    <form class="form" @submit.prevent="$emit('submit-admin')">
      <input
        :value="adminUsername"
        type="text"
        placeholder="Username"
        @input="emit('update:admin-username', $event.target.value)"
      />
      <input
        :value="adminPassword"
        type="password"
        placeholder="Password"
        @input="emit('update:admin-password', $event.target.value)"
      />

      <div class="form-actions">
        <button class="btn btn-primary" type="submit">
          {{ editAdminId ? "Save Admin" : "Add Admin" }}
        </button>
        <button
          v-if="editAdminId"
          class="btn btn-ghost"
          type="button"
          @click="$emit('reset-admin-form')"
        >
          Cancel
        </button>
      </div>
    </form>

    <ul class="list">
      <li v-for="admin in admins" :key="admin.id" class="item-card">
        <div class="item-main">
          <div class="item-title">{{ admin.username }}</div>
          <div class="item-sub">Admin account</div>
        </div>

        <div class="item-actions">
          <button
            class="btn btn-small btn-ghost"
            @click="$emit('start-edit-admin', admin)"
          >
            Edit
          </button>
          <button
            class="btn btn-small btn-danger"
            @click="$emit('delete-admin', admin.id)"
          >
            Delete
          </button>
        </div>
      </li>

      <li v-if="!admins.length && !loading" class="empty">No admins yet.</li>
    </ul>
  </section>
</template>
