<script setup>
const props = defineProps({
  selectedLotId: { type: [Number, String, null], default: null },
  selectedLot: { type: Object, default: null },
  selectedLotSlots: { type: Array, default: () => [] },
  slotNumberInput: { type: [String, Number], default: "" },
  slotSensorInput: { type: String, default: "" },
  editSlotId: { type: [Number, String, null], default: null },
  isSlotOccupied: { type: Function, required: true },
});

const emit = defineEmits([
  "update:slot-number-input",
  "update:slot-sensor-input",
  "submit-slot",
  "reset-slot-form",
  "start-edit-slot",
  "delete-slot",
  "toggle-slot-occupancy",
]);
</script>

<template>
  <section class="panel slots-panel">
    <div class="panel-head">
      <h2>Slots</h2>
      <span class="count">{{ selectedLotSlots.length }}</span>
    </div>

    <div v-if="!selectedLotId" class="empty">
      Select a parking lot to see its slots.
    </div>

    <div v-else class="slot-body">
      <div class="slot-meta">
        <div class="item-title">{{ selectedLot?.name }}</div>
        <div class="item-sub">
          {{
            selectedLot?.address ? selectedLot.address : "No address provided"
          }}
        </div>
      </div>

      <form class="form" @submit.prevent="$emit('submit-slot')">
        <input
          :value="slotNumberInput"
          type="number"
          min="1"
          placeholder="Slot number"
          @input="emit('update:slot-number-input', $event.target.value)"
        />
        <input
          :value="slotSensorInput"
          type="text"
          placeholder="Sensor ID (optional)"
          @input="emit('update:slot-sensor-input', $event.target.value)"
        />

        <div class="form-actions">
          <button class="btn btn-primary" type="submit">
            {{ editSlotId ? "Save Slot" : "Add Slot" }}
          </button>
          <button
            v-if="editSlotId"
            class="btn btn-ghost"
            type="button"
            @click="$emit('reset-slot-form')"
          >
            Cancel
          </button>
        </div>
      </form>

      <ul class="list">
        <li
          v-for="slot in selectedLotSlots"
          :key="slot.id"
          class="item-card slot-card"
        >
          <div class="item-main">
            <div class="item-title">Slot {{ slot.slotNumber ?? slot.id }}</div>
            <div class="item-sub">Sensor: {{ slot.sensorId ?? "N/A" }}</div>
          </div>

          <div class="slot-actions">
            <span
              :class="[
                'pill',
                isSlotOccupied(slot) ? 'pill-error' : 'pill-success',
              ]"
            >
              {{ isSlotOccupied(slot) ? "Occupied" : "Available" }}
            </span>
            <div class="item-actions">
              <button
                class="btn btn-small btn-ghost"
                @click.stop="$emit('start-edit-slot', slot)"
              >
                Edit
              </button>
              <button
                class="btn btn-small btn-danger"
                @click.stop="$emit('delete-slot', slot.id)"
              >
                Delete
              </button>
              <button
                v-if="!slot.sensorId"
                class="btn btn-small btn-primary"
                @click.stop="$emit('toggle-slot-occupancy', slot)"
              >
                {{ isSlotOccupied(slot) ? "Mark Available" : "Mark Occupied" }}
              </button>
            </div>
          </div>
        </li>

        <li v-if="!selectedLotSlots.length" class="empty">
          No slots assigned to this lot yet.
        </li>
      </ul>
    </div>
  </section>
</template>
