<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "../services/api";
import ErrorBanner from "../components/ErrorBanner.vue";
import logoUrl from "../assets/smart-parking-logo.svg";

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
      <div class="brand-logo">
        <img :src="logoUrl" alt="Smart Parking logo" />
      </div>
      <h1>Smart Parking System</h1>
      <p class="login-subtitle">Sign in to manage lots, slots, and admins.</p>

      <ErrorBanner :message="error" @clear="error = ''" />

      <form @submit.prevent="handleLogin" class="login-form">
        <input v-model="username" type="text" placeholder="Username" />
        <input v-model="password" type="password" placeholder="Password" />
        <button class="login-button" type="submit">Log In</button>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "../assets/theme" as *;

.login-container {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 24px;
  background: radial-gradient(circle at top, rgba(70, 214, 255, 0.16), transparent 60%),
    linear-gradient(160deg, $bg-base, $bg-deep 55%, $bg-soft 100%);
  position: relative;
  overflow: hidden;
}

.login-container::before {
  content: "";
  position: absolute;
  width: 360px;
  height: 360px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(57, 229, 143, 0.2), transparent 70%);
  top: -140px;
  right: -120px;
  opacity: 0.6;
  pointer-events: none;
}

.login-box {
  @include glass-panel;
  color: $ink;
  width: min(420px, 92vw);
  padding: 32px 30px;
  text-align: left;
}

.brand-logo {
  margin: 0 0 18px;
}

h1 {
  margin: 0 0 6px;
  font-size: 26px;
  font-family: $font-display;
}

.login-subtitle {
  margin: 0 0 20px;
  color: $ink-muted;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

input {
  border-radius: 12px;
  padding: 12px 14px;
  font-size: 14px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.08);
  color: $ink;
  outline: none;
  transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;

  &:focus-visible {
    border-color: rgba($accent, 0.5);
    background: rgba(255, 255, 255, 0.12);
    box-shadow: 0 0 0 3px rgba($accent, 0.15);
  }
}

.login-button {
  margin-top: 6px;
  padding: 12px 16px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  color: #05121a;
  background: linear-gradient(135deg, $accent-strong, $accent);
  box-shadow: 0 10px 20px rgba($accent, 0.25);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 12px 24px rgba($accent, 0.3);
  }

  &:focus-visible {
    @include focus-ring();
  }
}
</style>
