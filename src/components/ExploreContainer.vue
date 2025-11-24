<template>
  <div class="home-container">
    <div class="home-content">
      <div class="welcome-section">
        <h1>Welcome to Weather</h1>
        <p>Get real-time weather information for your location</p>
      </div>

      <ion-button 
        @click="navigateToWeather"
        color="warning"
        expand="block"
        size="large"
        class="cta-button"
      >
        Get Weather Data
      </ion-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { IonButton } from '@ionic/vue';

defineProps({
  name: String,
});

const router = useRouter();

const navigateToWeather = () => {
  router.push('/tabs/weather');
};
</script>

<style scoped>
.home-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  background: linear-gradient(135deg, #2D1B5E 0%, #4A3A7E 100%);
  padding: 24px;
}

.home-content {
  width: 100%;
  max-width: 800px;
  text-align: center;
  margin: 0 auto;
}

.welcome-section {
  margin-bottom: 48px;
  color: #FFFFFF;
}

.welcome-section h1 {
  font-size: 36px;
  font-weight: 700;
  margin: 0 0 16px 0;
  color: #FFE500;
}

.welcome-section p {
  font-size: 16px;
  line-height: 24px;
  margin: 0;
  color: #F5F5F7;
  opacity: 0.9;
}

.cta-button {
  margin-top: 24px;
  max-width: 800px;
}
</style>
