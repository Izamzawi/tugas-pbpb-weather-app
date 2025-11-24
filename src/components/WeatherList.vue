<template>
  <div class="weather-list-container">
    <div v-if="loading" class="loading">
      <ion-spinner></ion-spinner>
      <p>Loading weather data...</p>
    </div>

    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
      <ion-button @click="loadWeather" color="warning">Retry</ion-button>
    </div>

    <div v-else>
      <ion-list class="weather-list">
        <ion-item v-for="(temp, index) in temperatureData" :key="index" lines="none" class="weather-item">
          <ion-label class="weather-item-time">
            {{ formatTime(weatherData!.hourly.time[index]) }}
          </ion-label>
          <div slot="end" class="weather-item-temp">
            {{ temp }}°C
          </div>
        </ion-item>
      </ion-list>

      <ion-infinite-scroll @ionInfinite="loadMore" threshold="30px">
        <ion-infinite-scroll-content
          loadingSpinner="bubbles"
          loadingText="Loading more...">
        </ion-infinite-scroll-content>
      </ion-infinite-scroll>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { IonSpinner, IonButton, IonInfiniteScroll, IonInfiniteScrollContent, IonList, IonItem, IonLabel } from '@ionic/vue';
import { fetchWeatherData, ForecastResponse } from '@/services/weatherService';

const weatherData = ref<ForecastResponse | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);
const temperatureData = ref<number[]>([]);
let displayCount = 20;
const BATCH_SIZE = 20;

const loadWeather = async () => {
  loading.value = true;
  error.value = null;
  try {
    const data = await fetchWeatherData(-6.2, 106.8);
    weatherData.value = data;
    displayCount = BATCH_SIZE;
    temperatureData.value = data.hourly.temperature_2m.slice(0, displayCount);
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load weather data';
  } finally {
    loading.value = false;
  }
};

const loadMore = async (ev: any) => {
  try {
    if (!weatherData.value) return;
    
    // Calculate next batch end index
    const nextDisplayCount = displayCount + BATCH_SIZE;
    const totalItems = weatherData.value.hourly.temperature_2m.length;
    
    // Only load if there are more items available
    if (displayCount < totalItems) {
      displayCount = Math.min(nextDisplayCount, totalItems);
      temperatureData.value = weatherData.value.hourly.temperature_2m.slice(0, displayCount);
    }
  } finally {
    // Complete the infinite scroll event
    await ev.target.complete();
  }
};

const formatTime = (timeString: string): string => {
  const date = new Date(timeString);
  return date.toLocaleTimeString('id-ID', {
    weekday: "long",
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
};

onMounted(() => {
  loadWeather();
});
</script>

<style scoped>
.weather-list-container {
  padding: 16px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  box-sizing: border-box;
}

.loading,
.error {
  text-align: center;
  padding: 32px 16px;
}

.loading p,
.error p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 16px 0;
}

.weather-list {
  display: block;
    --background: #F5F5F7;
  background-color: #F5F5F7;
}

ion-item.weather-item {
  --background: #F5F5F7;
  background-color: #F5F5F7;
  --border-radius: 8px;
  margin: 0;
  padding: 12px 16px;
  border-left: 4px solid #FFE500;
  transition: all 0.2s ease;
}

ion-item.weather-item:hover {
  --background: #ffffff;
  box-shadow: 0 2px 8px rgba(45, 27, 94, 0.08);
}

.weather-item-time {
  font-size: 14px;
  color: #2C2C2C;
  font-weight: 500;
}

.weather-item-temp {
  font-size: 20px;
  font-weight: bold;
  color: #2D1B5E;
}
</style>
