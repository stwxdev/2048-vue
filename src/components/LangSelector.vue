<script setup>
import { useLangStore } from '../stores/langStore.js';

const langStore = useLangStore();
</script>

<template>
  <div class="lang-selector">
    <button 
      class="lang-btn" 
      :class="{ active: langStore.currentLang === 'en' }"
      @click="langStore.setLang('en')"
    >
      EN
    </button>
    <button 
      class="lang-btn" 
      :class="{ active: langStore.currentLang === 'uk' }"
      @click="langStore.setLang('uk')"
    >
      UA
    </button>
  </div>
</template>

<style scoped>
.lang-selector {
  display: flex;
  gap: 5px;
}

.lang-btn {
  background-color: #bbada0;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
}

.lang-btn:hover {
  background-color: #9f8b76;
}

.lang-btn.active {
  background-color: #8f7a66;
}
</style> 