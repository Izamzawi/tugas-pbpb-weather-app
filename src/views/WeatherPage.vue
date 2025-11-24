<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Weather</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="pwa-content">
      <WeatherList />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import WeatherList from '@/components/WeatherList.vue';
</script>
