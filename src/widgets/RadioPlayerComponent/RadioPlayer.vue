<script setup lang="ts">
import TrackItem from "./components/TrackItem.vue";
import { ref, onMounted, onUnmounted } from 'vue'
import {ITrack} from "./types/track.ts";
import {TrackService} from "./services/track.service.ts";

const playingTrack = ref<ITrack | null>(null)
const historyTracks = ref<ITrack[]>([])
const errorMessage = ref<String | null>('')

const trackService = new TrackService()

const updateTracks = async () => {
  const {playingTrackResponse, historyTracksResponse, errorMessageResponse} = await trackService.getTracks()
  if(errorMessageResponse){
    errorMessage.value = errorMessageResponse
  }
  playingTrack.value = playingTrackResponse
  historyTracks.value = historyTracksResponse
}

const intervalId = setInterval(updateTracks, 2000);
onMounted(updateTracks);

onUnmounted(() => clearInterval(intervalId));
</script>

<template>
<main>
  <div class="container">
    <track-item v-for="track in historyTracks" :key="track.title" :trackData="track" :isPlaying="false"/>
    <track-item :trackData="playingTrack" :isPlaying="true" v-if="playingTrack"/>
    <div v-if="errorMessage" class="error-block">
      {{ errorMessage }}
    </div>
  </div>
</main>
</template>

<style lang="scss" scoped>
@import "../../assets/styles/variables";
@import "../../assets/styles/mixins";

main {
  background-color: #141a36;
  min-height: 400px;

  .container{
    display: flex;
    flex-direction: column;
  }
}

.error-block{
  color: red;
  border: 1px solid red;
  padding: 10px;
  width: auto;
  margin: 20px 0;
}
</style>