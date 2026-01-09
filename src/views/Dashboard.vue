<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
import api from "../services/api";
import ErrorBanner from "../components/ErrorBanner.vue";
import AdminsSection from "../components/AdminsSection.vue";
import LotsSection from "../components/LotsSection.vue";
import SlotsSection from "../components/SlotsSection.vue";

const admins = ref([]);
const lots = ref([]);
const slots = ref([]);
const loading = ref(false);
const error = ref("");
const router = useRouter();
const showError = (message) => {
  error.value = message || "";
};

const newAdmin = ref({ username: "", password: "" });
const editAdminId = ref(null);
const editAdmin = ref({ username: "", password: "" });

const newLot = ref({ name: "", address: "", latitude: "", longitude: "" });
const selectedLotId = ref(null);
const newSlot = ref({ slotNumber: "", sensorId: "" });
const editSlotId = ref(null);
const editSlot = ref({ slotNumber: "", sensorId: "" });
const slotPoller = ref(null);

const adminUsername = computed({
  get: () =>
    editAdminId.value ? editAdmin.value.username : newAdmin.value.username,
  set: (val) => {
    if (editAdminId.value) editAdmin.value.username = val;
    else newAdmin.value.username = val;
  },
});

const adminPassword = computed({
  get: () =>
    editAdminId.value ? editAdmin.value.password : newAdmin.value.password,
  set: (val) => {
    if (editAdminId.value) editAdmin.value.password = val;
    else newAdmin.value.password = val;
  },
});

const resetAdminForm = () => {
  newAdmin.value = { username: "", password: "" };
  editAdminId.value = null;
  editAdmin.value = { username: "", password: "" };
};

const slotNumberInput = computed({
  get: () =>
    editSlotId.value ? editSlot.value.slotNumber : newSlot.value.slotNumber,
  set: (val) => {
    if (editSlotId.value) editSlot.value.slotNumber = val;
    else newSlot.value.slotNumber = val;
  },
});

const slotSensorInput = computed({
  get: () =>
    editSlotId.value ? editSlot.value.sensorId : newSlot.value.sensorId,
  set: (val) => {
    if (editSlotId.value) editSlot.value.sensorId = val;
    else newSlot.value.sensorId = val;
  },
});

const resetSlotForm = () => {
  newSlot.value = { slotNumber: "", sensorId: "" };
  editSlotId.value = null;
  editSlot.value = { slotNumber: "", sensorId: "" };
};

const lotNameInput = computed({
  get: () => newLot.value.name,
  set: (val) => {
    newLot.value.name = val;
  },
});

const lotAddressInput = computed({
  get: () => newLot.value.address,
  set: (val) => {
    newLot.value.address = val;
  },
});

const lotLatitudeInput = computed({
  get: () => newLot.value.latitude,
  set: (val) => {
    newLot.value.latitude = val;
  },
});

const lotLongitudeInput = computed({
  get: () => newLot.value.longitude,
  set: (val) => {
    newLot.value.longitude = val;
  },
});

const selectedLot = computed(
  () => lots.value.find((lot) => lot.id === selectedLotId.value) || null
);

const slotBelongsToLot = (slot, lotId) => {
  const slotLotId =
    slot?.parkingLot?.id ?? slot?.parkingLotId ?? slot?.lotId ?? null;
  if (slotLotId === null || lotId === null) return false;
  return Number(slotLotId) === Number(lotId);
};

const ensureSlotHasLot = (slot, lotId) => {
  if (!slot.parkingLot) slot.parkingLot = { id: lotId };
  else if (!slot.parkingLot.id) slot.parkingLot.id = lotId;
  return slot;
};

const selectedLotSlots = computed(() => {
  if (!selectedLotId.value) return [];
  return slots.value.filter((slot) =>
    slotBelongsToLot(slot, selectedLotId.value)
  );
});

const isSlotOccupied = (slot) =>
  Boolean(slot?.occupied ?? slot?.isOccupied ?? slot?.is_occupied ?? false);

const selectLot = (lot) => {
  selectedLotId.value = lot?.id ?? null;
};

const stopSlotPolling = () => {
  if (slotPoller.value) {
    clearInterval(slotPoller.value);
    slotPoller.value = null;
  }
};

const loadSlots = async () => {
  try {
    const slotsRes = await api.getSlots();
    slots.value = slotsRes?.data ?? [];
  } catch (err) {
    console.error(err);
    error.value = "Could not refresh slots.";
  }
};

const startSlotPolling = () => {
  stopSlotPolling();
  slotPoller.value = setInterval(loadSlots, 1000);
};

const loadData = async () => {
  loading.value = true;
  error.value = "";
  try {
    const [adminsRes, lotsRes, slotsRes] = await Promise.all([
      api.listAdmins(),
      api.getLots(),
      api.getSlots(),
    ]);
    admins.value = adminsRes?.data ?? [];
    lots.value = lotsRes?.data ?? [];
    slots.value = slotsRes?.data ?? [];

    if (selectedLotId.value) {
      const stillExists = lots.value.some(
        (lot) => lot.id === selectedLotId.value
      );
      if (!stillExists) selectedLotId.value = null;
    }
    startSlotPolling();
  } catch (err) {
    console.error(err);
    error.value = "Could not load dashboard data.";
  } finally {
    loading.value = false;
  }
};

onMounted(loadData);
onUnmounted(stopSlotPolling);

const submitAdmin = async () => {
  showError("");
  const username = adminUsername.value?.trim();
  const password = adminPassword.value;

  if (!username) {
    showError("Username is required.");
    return;
  }

  if (!editAdminId.value && !password) {
    showError("Password is required to add an admin.");
    return;
  }

  try {
    if (editAdminId.value) {
      await api.updateAdmin(editAdminId.value, editAdmin.value);
      admins.value = admins.value.map((admin) =>
        admin.id === editAdminId.value
          ? { ...admin, username: editAdmin.value.username }
          : admin
      );
    } else {
      const res = await api.createAdmin(newAdmin.value);
      admins.value.push(res.data);
    }
    resetAdminForm();
  } catch (err) {
    console.error(err);
    error.value = "Could not save admin.";
  }
};

const startEditAdmin = (admin) => {
  editAdminId.value = admin.id;
  editAdmin.value = { username: admin.username || "", password: "" };
};

const deleteAdmin = async (id) => {
  error.value = "";
  if (admins.value.length <= 1) {
    showError("atleast one admin must be present in the system at all times");
    return;
  }
  try {
    await api.deleteAdmin(id);
    admins.value = admins.value.filter((admin) => admin.id !== id);
    if (editAdminId.value === id) resetAdminForm();
  } catch (err) {
    console.error(err);
    error.value = "Could not delete admin.";
  }
};

const addLot = async () => {
  showError("");
  const name = newLot.value.name?.trim();
  const latitude = parseFloat(newLot.value.latitude);
  const longitude = parseFloat(newLot.value.longitude);

  if (!name) {
    showError("Lot name is required.");
    return;
  }
  if (!Number.isFinite(latitude)) {
    showError("Latitude is required.");
    return;
  }
  if (!Number.isFinite(longitude)) {
    showError("Longitude is required.");
    return;
  }

  const payload = {
    name,
    address: newLot.value.address?.trim() || null,
    latitude,
    longitude,
  };

  try {
    const res = await api.createLot(payload);
    lots.value.push(res.data);
    newLot.value = { name: "", address: "", latitude: "", longitude: "" };
    selectedLotId.value = res?.data?.id ?? selectedLotId.value;
  } catch (err) {
    console.error(err);
    error.value = "Could not add parking lot.";
  }
};

const deleteLot = async (id) => {
  showError("");
  try {
    await api.deleteLot(id);
    lots.value = lots.value.filter((lot) => lot.id !== id);
    if (selectedLotId.value === id) selectedLotId.value = null;
  } catch (err) {
    console.error(err);
    error.value = "Could not delete parking lot.";
  }
};

const submitSlot = async () => {
  if (!selectedLotId.value) {
    error.value = "Select a parking lot first.";
    return;
  }

  if (!slotNumberInput.value) {
    showError("Slot number is required.");
    return;
  }

  showError("");
  const payload = {
    slotNumber: Number(slotNumberInput.value),
    sensorId: slotSensorInput.value?.trim() || null,
    occupied: false,
  };

  try {
    if (editSlotId.value) {
      const res = await api.updateSlot(editSlotId.value, payload);
      const updated = ensureSlotHasLot(res.data, selectedLotId.value);
      slots.value = slots.value.map((slot) =>
        slot.id === editSlotId.value ? { ...slot, ...updated } : slot
      );
    } else {
      const res = await api.createSlot(selectedLotId.value, payload);
      const created = ensureSlotHasLot(res.data, selectedLotId.value);
      slots.value.push(created);
    }
    resetSlotForm();
  } catch (err) {
    console.error(err);
    error.value = "Could not save slot.";
  }
};

const startEditSlot = (slot) => {
  editSlotId.value = slot.id;
  editSlot.value = {
    slotNumber: slot.slotNumber ?? "",
    sensorId: slot.sensorId ?? "",
  };
};

const deleteSlot = async (id) => {
  showError("");
  try {
    await api.deleteSlot(id);
    slots.value = slots.value.filter((slot) => slot.id !== id);
    if (editSlotId.value === id) resetSlotForm();
  } catch (err) {
    console.error(err);
    error.value = "Could not delete slot.";
  }
};

const toggleSlotOccupancy = async (slot) => {
  showError("");
  try {
    const targetStatus = !isSlotOccupied(slot);
    const res = await api.toggleSlotStatus(slot.id, targetStatus);
    const updated = ensureSlotHasLot(res.data, selectedLotId.value);
    slots.value = slots.value.map((item) =>
      item.id === slot.id ? { ...item, ...updated } : item
    );
  } catch (err) {
    console.error(err);
    error.value = "Could not update slot status.";
  }
};

//works for now
const handleSignOut = () => {
  router.push({ name: "login" });
};
</script>

<template>
  <div class="page">
    <main class="dashboard">
      <header class="header">
        <div>
          <h1>Dashboard</h1>
          <p class="subtitle">Manage admins and parking lots</p>
        </div>

        <div class="status">
          <span v-if="loading" class="pill pill-info">Loading…</span>
          <button class="btn btn-danger btn-small" @click="handleSignOut">
            Sign out
          </button>
        </div>
      </header>

      <ErrorBanner :message="error" @clear="error = ''" />

      <div class="grid">
        <AdminsSection
          :admins="admins"
          :admin-username="adminUsername"
          :admin-password="adminPassword"
          :edit-admin-id="editAdminId"
          :loading="loading"
          @update:admin-username="adminUsername = $event"
          @update:admin-password="adminPassword = $event"
          @submit-admin="submitAdmin"
          @reset-admin-form="resetAdminForm"
          @start-edit-admin="startEditAdmin"
          @delete-admin="deleteAdmin"
        />

        <LotsSection
          :lots="lots"
          :loading="loading"
          :lot-name="lotNameInput"
          :lot-address="lotAddressInput"
          :lot-latitude="lotLatitudeInput"
          :lot-longitude="lotLongitudeInput"
          :selected-lot-id="selectedLotId"
          @update:lot-name="lotNameInput = $event"
          @update:lot-address="lotAddressInput = $event"
          @update:lot-latitude="lotLatitudeInput = $event"
          @update:lot-longitude="lotLongitudeInput = $event"
          @add-lot="addLot"
          @delete-lot="deleteLot"
          @select-lot="selectLot"
        />
      </div>

      <SlotsSection
        :selected-lot-id="selectedLotId"
        :selected-lot="selectedLot"
        :selected-lot-slots="selectedLotSlots"
        :slot-number-input="slotNumberInput"
        :slot-sensor-input="slotSensorInput"
        :edit-slot-id="editSlotId"
        :is-slot-occupied="isSlotOccupied"
        @update:slot-number-input="slotNumberInput = $event"
        @update:slot-sensor-input="slotSensorInput = $event"
        @submit-slot="submitSlot"
        @reset-slot-form="resetSlotForm"
        @start-edit-slot="startEditSlot"
        @delete-slot="deleteSlot"
        @toggle-slot-occupancy="toggleSlotOccupancy"
      />
    </main>
  </div>
</template>

<style src="../assets/dashboard.css"></style>
