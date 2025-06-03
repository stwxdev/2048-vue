<script setup>
import { defineEmits } from 'vue';

const emit = defineEmits(['newGame']);
</script>

<template>
  <div class="controls">
    <button @click="emit('newGame')" class="new-game-btn">Нова гра</button>
    <p class="instructions">
      <strong>ЯК ГРАТИ:</strong> Використовуйте клавіші зі стрілками, щоб переміщувати плитки. Коли дві плитки з однаковим числом стикаються, вони об'єднуються в одну!
    </p>
  </div>
</template> 