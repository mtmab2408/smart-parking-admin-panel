<script setup>
const props = defineProps({
  lots: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
  lotName: { type: String, default: "" },
  lotAddress: { type: String, default: "" },
  lotLatitude: { type: [String, Number], default: "" },
  lotLongitude: { type: [String, Number], default: "" },
  selectedLotId: { type: [Number, String, null], default: null },
});

const emit = defineEmits([
  "update:lot-name",
  "update:lot-address",
  "update:lot-latitude",
  "update:lot-longitude",
  "add-lot",
  "delete-lot",
  "select-lot",
]);
</script>

<template>
  <section class="panel">
    <div class="panel-head">
      <h2>Parking Lots</h2>
      <span class="count">{{ lots.length }}</span>
    </div>

    <form class="form" @submit.prevent="$emit('add-lot')">
      <input
        :value="lotName"
        type="text"
        placeholder="Name"
        @input="emit('update:lot-name', $event.target.value)"
      />
      <input
        :value="lotAddress"
        type="text"
        placeholder="Address (optional)"
        @input="emit('update:lot-address', $event.target.value)"
      />
      <input
        :value="lotLatitude"
        type="number"
        step="any"
        placeholder="Latitude"
        @input="emit('update:lot-latitude', $event.target.value)"
      />
      <input
        :value="lotLongitude"
        type="number"
        step="any"
        placeholder="Longitude"
        @input="emit('update:lot-longitude', $event.target.value)"
      />

      <div class="form-actions">
        <button class="btn btn-primary" type="submit">Add Lot</button>
      </div>
    </form>

    <ul class="list">
      <li
        v-for="lot in lots"
        :key="lot.id"
        class="item-card"
        :class="{ 'is-selected': selectedLotId === lot.id }"
        @click="$emit('select-lot', lot)"
      >
        <div class="item-main">
          <div class="item-title">{{ lot.name }}</div>
          <div class="item-sub">
            {{ lot.address ? lot.address : "No address provided" }}
          </div>
          <div class="item-sub">
            Lat: {{ lot.latitude ?? "N/A" }}, Long: {{ lot.longitude ?? "N/A" }}
          </div>
        </div>

        <div class="item-actions">
          <button
            class="btn btn-small btn-danger"
            @click.stop="$emit('delete-lot', lot.id)"
          >
            Delete
          </button>
        </div>
      </li>

      <li v-if="!lots.length && !loading" class="empty">
        No parking lots yet.
      </li>
    </ul>
  </section>
</template>
