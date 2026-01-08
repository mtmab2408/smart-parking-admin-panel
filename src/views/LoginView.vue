<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "../services/api";
import ErrorBanner from "../components/ErrorBanner.vue";

const username = ref("");
const password = ref("");
const error = ref("");
const router = useRouter();

const handleLogin = async () => {
  error.value = ""; // Clear previous errors

  if (!username.value.trim()) {
    error.value = "Username is required.";
    return;
  }

  if (!password.value) {
    error.value = "Password is required.";
    return;
  }

  try {
    // Call Backend
    await api.login({ username: username.value, password: password.value });
    router.push({ name: "dashboard" });
  } catch (err) {
    // whatever the error, we will show this not to complicete it for the user.
    error.value = "Invalid username or password";
  }
};
</script>

<template>
  <div class="login-container">
    <div class="login-box">
      <h1>Smart Parking System</h1>

      <ErrorBanner :message="error" @clear="error = ''" />

      <form @submit.prevent="handleLogin" class="login-form">
        <input v-model="username" type="text" placeholder="Username" />
        <input v-model="password" type="password" placeholder="Password" />
        <button type="submit">Log In</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  background: linear-gradient(180deg, #0f0f0f, #3a3a3a);
  font-family: Arial, sans-serif;
}

.login-box {
  color: white;
  width: 300px;
  padding: 30px;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 25px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.login-form {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

input {
  border-radius: 10px;
  padding: 10px 12px;
  font-size: 14px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.08);
  color: white;
  outline: none;
  transition: border-color 0.2s ease, background 0.2s ease;
}

input:focus {
  border-color: rgba(255, 255, 255, 0.35);
  background: rgba(255, 255, 255, 0.12);
}

button {
  padding: 10px;
  background-color: #2f2f2f;
  color: white;
  border-radius: 25px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s ease, opacity 0.2s ease;
}

button:hover {
  background-color: #4b4b4b;
}
</style>
