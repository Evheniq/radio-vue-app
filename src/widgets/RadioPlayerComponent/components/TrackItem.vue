<script setup lang="ts">
import {computed, onMounted, onUnmounted, PropType, ref} from 'vue'
import {ITrack} from '../types/track.ts'
import placeholderImage from '../assets/placeholder.png'

const props = defineProps({
  trackData: {
    type: Object as PropType<ITrack>,
    required: true
  },
  isPlaying: {
    type: Boolean,
    default: false
  }
})

const startTime = computed(() => {
  return new Date(props.trackData.time).toLocaleTimeString()
})

const trackDuration = computed(() => {
  const [hours, minutes, seconds] = props.trackData.duration.split(':').map(Number);
  return (hours * 3600 + minutes * 60 + seconds) * 1000; // convert to milliseconds
});

const progress = ref(0);

const updateProgress = () => {
  const now = new Date();
  const startTime = new Date(props.trackData.time);
  const elapsedTime = now.getTime() - startTime.getTime(); // milliseconds

  const percentageCalculated = (elapsedTime / trackDuration.value) * 100;
  progress.value = percentageCalculated >= 100 ? 100 : percentageCalculated;
};

const onImgError = (event: Event) => {
  const imgElement = event.target as HTMLImageElement;
  imgElement.src = placeholderImage;
}

const intervalId = setInterval(updateProgress, 1000);

onMounted(() => {
  updateProgress()
});
onUnmounted(() => clearInterval(intervalId));

</script>

<template>
  <div class="track-item" :class="{ playing: isPlaying }">
    <div class="track-image">
      <img v-if="trackData.imageUrl" @error="onImgError" :src="trackData.imageUrl" alt="Album Art">
      <img v-else :src="placeholderImage" alt="Album Art">
    </div>
    <div class="track-content">
      <h2>{{ trackData.title }}</h2>
      <h3>{{ trackData.artist }}</h3>
      <h4>{{ trackData.album }}</h4>
      <p>Duration: {{ trackData.duration }}</p>
      <p>Start Time: {{ startTime }}</p>
      <div v-if="trackData.status === 'playing'" class="progress-bar">
        <div :style="{ width: progress + '%' }" class="progress"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../../../assets/styles/variables";

.track{
  &-item{
    display: flex;
    height: 150px;
    color: $primary-color;

    margin: 5px 0;
  }

  &-image{
    width: 130px;

    img{
      width: 100%;
      height: 100%;
    }
  }

  &-content{
    padding: 5px 10px;

    img{
      width: 100px;
    }
  }
}

.progress-bar {
  width: 100%;
  height: 10px;
  background-color: #ddd;
}

.progress {
  height: 100%;
  background-color: #4caf50;
}
</style>