<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Weather App</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="pwa-content">
      <ExploreContainer name="Home" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
</script>
