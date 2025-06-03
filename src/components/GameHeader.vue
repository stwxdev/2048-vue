<script setup>
import { defineProps } from 'vue';

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
</script>

<template>
  <div class="header">
    <h1 class="title">2048</h1>
    <div class="scores">
      <div class="score-box">
        <div class="score-label">РАХУНОК</div>
        <div class="score-value">{{ score }}</div>
      </div>
      <div class="score-box">
        <div class="score-label">РЕКОРД</div>
        <div class="score-value">{{ bestScore }}</div>
      </div>
    </div>
  </div>
</template> 