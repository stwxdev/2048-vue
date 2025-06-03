<script setup>
import { defineEmits } from 'vue';
import { useLangStore } from '../stores/langStore.js';

const emit = defineEmits(['newGame']);
const langStore = useLangStore();
</script>

<template>
  <div class="controls">
    <button @click="emit('newGame')" class="new-game-btn">{{ langStore.t('newGame') }}</button>
    <p class="instructions">
      {{ langStore.t('instructions') }}
    </p>
  </div>
</template> 