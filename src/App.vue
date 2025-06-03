<script setup>
import { ref, onMounted } from 'vue';
import GameHeader from './components/GameHeader.vue';
import GameControls from './components/GameControls.vue';
import GameBoard from './components/GameBoard.vue';
import ProjectInfo from './components/ProjectInfo.vue';

const grid = ref([]);
const score = ref(0);
const bestScore = ref(0);
const gameOver = ref(false);
const gameWon = ref(false);
const gridSize = 4;
const animating = ref(false);

const initGame = () => {
  grid.value = Array(gridSize).fill().map(() => Array(gridSize).fill(0));
  score.value = 0;
  gameOver.value = false;
  gameWon.value = false;
  addRandomTile();
  addRandomTile();
};

const addRandomTile = () => {
  const emptyCells = [];
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (grid.value[i][j] === 0) {
        emptyCells.push({ row: i, col: j });
      }
    }
  }

  if (emptyCells.length > 0) {
    const { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    grid.value[row][col] = Math.random() < 0.9 ? 2 : 4;
  }
};

const checkGameOver = () => {
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (grid.value[i][j] === 0) return false;
    }
  }

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize - 1; j++) {
      if (grid.value[i][j] === grid.value[i][j + 1]) return false;
    }
  }

  for (let i = 0; i < gridSize - 1; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (grid.value[i][j] === grid.value[i + 1][j]) return false;
    }
  }

  return true;
};

const moveTiles = (direction) => {
  if (gameOver.value || gameWon.value || animating.value) return;

  animating.value = true;
  const originalGrid = JSON.parse(JSON.stringify(grid.value));
  let moved = false;

  const rotateGrid = (grid, times) => {
    let newGrid = JSON.parse(JSON.stringify(grid));
    for (let t = 0; t < times; t++) {
      const rotated = Array(gridSize).fill().map(() => Array(gridSize).fill(0));
      for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
          rotated[j][gridSize - 1 - i] = newGrid[i][j];
        }
      }
      newGrid = rotated;
    }
    return newGrid;
  };

  let rotations = 0;
  if (direction === 'right') rotations = 2;
  else if (direction === 'down') rotations = 1;
  else if (direction === 'up') rotations = 3;

  let currentGrid = rotateGrid(grid.value, rotations);

  for (let i = 0; i < gridSize; i++) {
    const row = currentGrid[i].filter(val => val !== 0);
    const newRow = [];

    for (let j = 0; j < row.length; j++) {
      if (j + 1 < row.length && row[j] === row[j + 1]) {
        const merged = row[j] * 2;
        newRow.push(merged);
        score.value += merged;
        if (merged === 2048) gameWon.value = true;
        j++;
      } else {
        newRow.push(row[j]);
      }
    }

    while (newRow.length < gridSize) {
      newRow.push(0);
    }

    currentGrid[i] = newRow;
  }

  grid.value = rotateGrid(currentGrid, (4 - rotations) % 4);

  moved = JSON.stringify(grid.value) !== JSON.stringify(originalGrid);

  if (moved) {
    setTimeout(() => {
      addRandomTile();
      if (score.value > bestScore.value) {
        bestScore.value = score.value;
        localStorage.setItem('bestScore', bestScore.value);
      }

      if (checkGameOver()) {
        gameOver.value = true;
      }

      animating.value = false;
    }, 150);
  } else {
    animating.value = false;
  }
};

const handleKeyDown = (event) => {
  switch (event.key) {
    case 'ArrowUp':
      moveTiles('up');
      break;
    case 'ArrowDown':
      moveTiles('down');
      break;
    case 'ArrowLeft':
      moveTiles('left');
      break;
    case 'ArrowRight':
      moveTiles('right');
      break;
  }
};

let touchStartX = 0;
let touchStartY = 0;

const handleTouchStart = (event) => {
  touchStartX = event.touches[0].clientX;
  touchStartY = event.touches[0].clientY;
};

const handleTouchEnd = (event) => {
  const touchEndX = event.changedTouches[0].clientX;
  const touchEndY = event.changedTouches[0].clientY;

  const dx = touchEndX - touchStartX;
  const dy = touchEndY - touchStartY;

  if (Math.abs(dx) > Math.abs(dy)) {
    if (dx > 0) {
      moveTiles('right');
    } else {
      moveTiles('left');
    }
  } else {
    if (dy > 0) {
      moveTiles('down');
    } else {
      moveTiles('up');
    }
  }
};

onMounted(() => {
  const savedBestScore = localStorage.getItem('bestScore');
  if (savedBestScore) {
    bestScore.value = parseInt(savedBestScore);
  }

  initGame();
  window.addEventListener('keydown', handleKeyDown);
});
</script>

<template>
  <div class="game-container" @touchstart="handleTouchStart" @touchend="handleTouchEnd">
    <GameHeader :score="score" :bestScore="bestScore" />
    <GameControls @newGame="initGame" />
    <GameBoard :grid="grid" :gameOver="gameOver" :gameWon="gameWon" @restart="initGame" />
    <ProjectInfo />
  </div>
</template>

<style>
#app {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

@media (max-width: 500px) {
  #app {
    padding: 10px;
  }
}
</style>