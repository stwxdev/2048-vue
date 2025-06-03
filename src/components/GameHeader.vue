<script setup>
import { defineProps, onMounted } from 'vue';
import { useLangStore } from '../stores/langStore.js';
import LangSelector from './LangSelector.vue';

defineProps({
  score: {
    type: Number,
    required: true
  },
  bestScore: {
    type: Number,
    required: true
  }
});

const langStore = useLangStore();

onMounted(() => {
  langStore.initLang();
});
</script>

<template>
  <div class="header">
    <div class="title-section">
      <h1 class="title">{{ langStore.t('title') }}</h1>
      <LangSelector />
    </div>
    <div class="scores">
      <div class="score-box">
        <div class="score-label">{{ langStore.t('score') }}</div>
        <div class="score-value">{{ score }}</div>
      </div>
      <div class="score-box">
        <div class="score-label">{{ langStore.t('best') }}</div>
        <div class="score-value">{{ bestScore }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.title-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}

@media (max-width: 500px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  .scores {
    width: 100%;
    justify-content: space-between;
  }
}
</style> 