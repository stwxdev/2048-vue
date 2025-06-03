<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  grid: {
    type: Array,
    required: true
  },
  gameOver: Boolean,
  gameWon: Boolean
});

const emit = defineEmits(['restart']);

const getTileColor = (value) => {
  const colors = {
    2: '#eee4da',
    4: '#ede0c8',
    8: '#f2b179',
    16: '#f59563',
    32: '#f67c5f',
    64: '#f65e3b',
    128: '#edcf72',
    256: '#edcc61',
    512: '#edc850',
    1024: '#edc53f',
    2048: '#edc22e'
  };
  return colors[value] || '#3c3a32';
};

const getTileTextColor = (value) => {
  return value <= 4 ? '#776e65' : '#f9f6f2';
};

const getTileFontSize = (value) => {
  if (value < 100) return '35px';
  if (value < 1000) return '30px';
  return '25px';
};
</script>

<template>
  <div class="grid-container">
    <div v-if="gameOver" class="game-message game-over">
      <div>Гра закінчена!</div>
      <button @click="emit('restart')" class="restart-btn">Спробувати ще</button>
    </div>
    <div v-if="gameWon" class="game-message game-won">
      <div>Ви перемогли!</div>
      <button @click="emit('restart')" class="restart-btn">Грати знову</button>
    </div>
    
    <div class="grid">
      <div v-for="(row, i) in grid" :key="`row-${i}`" class="grid-row">
        <div 
          v-for="(cell, j) in row" 
          :key="`cell-${i}-${j}`" 
          class="grid-cell"
          :class="{ 
            'empty': cell === 0,
            'tile-2': cell === 2,
            'tile-4': cell === 4,
            'tile-8': cell === 8,
            'tile-16': cell === 16,
            'tile-32': cell === 32,
            'tile-64': cell === 64,
            'tile-128': cell === 128,
            'tile-256': cell === 256,
            'tile-512': cell === 512,
            'tile-1024': cell === 1024,
            'tile-2048': cell === 2048
          }"
          :style="{ 
            backgroundColor: cell !== 0 ? getTileColor(cell) : '#cdc1b4',
            color: getTileTextColor(cell),
            fontSize: getTileFontSize(cell)
          }"
        >
          {{ cell !== 0 ? cell : '' }}
        </div>
      </div>
    </div>
  </div>
</template> 