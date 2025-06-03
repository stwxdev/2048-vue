import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'

export const useLangStore = defineStore('lang', () => {
    const currentLang = ref('uk')

    const translations = reactive({
        en: {
            title: '2048',
            score: 'SCORE',
            best: 'BEST',
            newGame: 'New Game',
            instructions: 'HOW TO PLAY: Use arrow keys to move the tiles. When two tiles with the same number touch, they merge into one!',
            gameOver: 'Game Over!',
            youWon: 'You Won!',
            tryAgain: 'Try Again',
            playAgain: 'Play Again',
            projectDescription: 'A Vue.js implementation of the popular 2048 game for my university practice project',
            viewOnGithub: 'View on GitHub'
        },
        uk: {
            title: '2048',
            score: 'РАХУНОК',
            best: 'РЕКОРД',
            newGame: 'Нова гра',
            instructions: 'ЯК ГРАТИ: Використовуйте клавіші зі стрілками, щоб переміщувати плитки. Коли дві плитки з однаковим числом стикаються, вони об\'єднуються в одну!',
            gameOver: 'Гра закінчена!',
            youWon: 'Ви перемогли!',
            tryAgain: 'Спробувати ще',
            playAgain: 'Грати знову',
            projectDescription: 'Реалізація популярної гри 2048 на Vue.js для мого проекту університетської практики',
            viewOnGithub: 'Переглянути на GitHub'
        }
    })

    function setLang(lang) {
        currentLang.value = lang
        localStorage.setItem('2048-lang', lang)
    }

    function t(key) {
        return translations[currentLang.value][key] || key
    }

    function initLang() {
        const savedLang = localStorage.getItem('2048-lang')
        if (savedLang && ['en', 'uk'].includes(savedLang)) {
            currentLang.value = savedLang
        }
    }

    return {
        currentLang,
        setLang,
        t,
        initLang
    }
}) 