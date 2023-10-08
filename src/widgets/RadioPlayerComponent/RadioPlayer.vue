<script setup lang="ts">
import {ref, onUnmounted, onBeforeMount} from 'vue'
import {TrackService} from "./services/track.service.ts";
import TrackItem from "./components/TrackItem.vue";
import {ITrack} from "./types/track.ts";

const playingTrack = ref<ITrack | null>(null)
const historyTracks = ref<ITrack[]>([])
const errorMessage = ref<String | null>(null)

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
onBeforeMount(async () => {
  await updateTracks()
});

onUnmounted(() => clearInterval(intervalId));
</script>

<template>
<main>
  <div class="container">
    <template v-if="!errorMessage">
      <div class="history-items">
        <track-item v-for="track in historyTracks" :key="track.title" :trackData="track" :isPlaying="false"/>
      </div>
      <div class="playing-item">
        <track-item :trackData="playingTrack" :isPlaying="true" v-if="playingTrack"/>
      </div>
    </template>
    <div v-else class="error-block">
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