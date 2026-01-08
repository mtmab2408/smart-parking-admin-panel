import axios from "axios";

//if change the default pid for backend change the baseURL accordingly
const apiClient = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default {
  // PARKING REQUESTS
  getSlots() {
    return apiClient.get("/parking/slots");
  },
  getLots() {
    return apiClient.get("/parking/lots");
  },
  createSlot(lotId, payload) {
    return apiClient.post(`/parking/lots/${lotId}/slots`, payload);
  },
  updateSlot(slotId, payload) {
    return apiClient.put(`/parking/slots/${slotId}`, payload);
  },
  deleteSlot(slotId) {
    return apiClient.delete(`/parking/slots/${slotId}`);
  },
  toggleSlotStatus(slotId, isOccupied) {
    return apiClient.put(`/parking/slots/${slotId}/status`, null, {
      params: { occupied: isOccupied },
    });
  },

  // ADMIN REQUESTS
  login(credentials) {
    return apiClient.post("/admin/login", credentials);
  },

  // ADMIN MANAGEMENT
  listAdmins() {
    return apiClient.get("/admin/all");
  },
  createAdmin(payload) {
    return apiClient.post("/admin/register", payload);
  },
  updateAdmin(adminId, payload) {
    return apiClient.put(`/admin/${adminId}`, payload);
  },
  deleteAdmin(adminId) {
    return apiClient.delete(`/admin/${adminId}`);
  },

  // PARKING LOTS
  createLot(payload) {
    return apiClient.post("/parking/lots", payload);
  },
  deleteLot(lotId) {
    return apiClient.delete(`/parking/lots/${lotId}`);
  },
};
