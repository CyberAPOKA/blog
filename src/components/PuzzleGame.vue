<script setup lang="ts">
import { ref, computed } from 'vue';

const SIZE = 3;
const SHUFFLE_MOVES = 30;

const imageMapping: { [key: number]: string } = {
    1: 'https://cyberapoka.github.io/blog/assets/1-ef1aeb4e.jpg',
    2: 'https://cyberapoka.github.io/blog/assets/2-2d79bddc.jpg',
    3: 'https://cyberapoka.github.io/blog/assets/3-b98386dd.jpg',
    4: 'https://cyberapoka.github.io/blog/assets/4-74fcf040.jpg',
    5: 'https://cyberapoka.github.io/blog/assets/5-4cd8bc24.jpg',
    6: 'https://cyberapoka.github.io/blog/assets/6-6893df16.jpg',
    7: 'https://cyberapoka.github.io/blog/assets/7-7506bfc9.jpg',
    8: 'https://cyberapoka.github.io/blog/assets/8-7c0df654.jpg',
    9: 'https://cyberapoka.github.io/blog/assets/9-06a3a4f9.jpg',
};


let emptyCell = { row: SIZE - 1, col: SIZE - 1 };
const board = ref(generateBoard());

function generateBoard() {
    let num = 1;
    const fullBoard: (number | null)[][] = Array.from({ length: SIZE }, (_, i) =>
        Array.from({ length: SIZE }, (_, j) => num++)
    );

    const randomRow = Math.floor(Math.random() * SIZE);
    const randomCol = Math.floor(Math.random() * SIZE);
    fullBoard[randomRow][randomCol] = null;
    emptyCell = { row: randomRow, col: randomCol };

    return fullBoard;
}

function shuffleBoard() {
    for (let i = 0; i < SHUFFLE_MOVES; i++) {
        const possibleMoves = getPossibleMoves();
        const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        move(randomMove.row, randomMove.col, true, true);
    }
}

function getPossibleMoves() {
    const moves = [];
    if (emptyCell.row > 0) moves.push({ row: emptyCell.row - 1, col: emptyCell.col });
    if (emptyCell.row < SIZE - 1) moves.push({ row: emptyCell.row + 1, col: emptyCell.col });
    if (emptyCell.col > 0) moves.push({ row: emptyCell.row, col: emptyCell.col - 1 });
    if (emptyCell.col < SIZE - 1) moves.push({ row: emptyCell.row, col: emptyCell.col + 1 });
    return moves;
}

const movesCount = ref(0);

function move(row: number, col: number, isShuffling = false, forceMove = false) {
    if (gameOver.value && !forceMove) return;

    if (Math.abs(emptyCell.row - row) + Math.abs(emptyCell.col - col) !== 1) return;

    board.value[emptyCell.row][emptyCell.col] = board.value[row][col];
    board.value[row][col] = null;

    emptyCell = { row, col };
    if (!isShuffling) {
        movesCount.value++;
    }
}

function getMissingNumber(): number {
    const allNumbers = Array.from({ length: SIZE * SIZE }, (_, index) => index + 1);
    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
            const cellValue = board.value[i][j];
            if (cellValue !== null) {
                const idx = allNumbers.indexOf(cellValue);
                if (idx !== -1) {
                    allNumbers.splice(idx, 1);
                }
            }
        }
    }
    return allNumbers[0];
}

const gameOver = ref(false);

const isSolved = computed(() => {
    let num = 1;
    const missingNumber = getMissingNumber();

    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
            if (i === emptyCell.row && j === emptyCell.col) {
                if (missingNumber !== num) return false;
                num++;
                continue;
            }
            if (board.value[i][j] !== num++) return false;
        }
    }

    board.value[emptyCell.row][emptyCell.col] = missingNumber;
    gameOver.value = true;

    return true;
});

function restartGame() {
    board.value = generateBoard();
    shuffleBoard();
    movesCount.value = 0;
    gameOver.value = false;
}


function winGame() {
    let num = 1;
    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
            board.value[i][j] = num++;
        }
    }
    board.value[emptyCell.row][emptyCell.col] = null;
}

shuffleBoard();

async function downloadImage() {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Failed to get canvas 2D context.");
    //tamanho da imagem
    canvas.width = SIZE * 350;
    canvas.height = SIZE * 350;

    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
            const cellValue = board.value[i][j];
            if (cellValue !== null) {
                const img = new Image();
                img.crossOrigin = "anonymous";
                img.src = imageMapping[cellValue];


                await new Promise<void>((resolve) => {
                    img.onload = () => {
                        ctx.drawImage(img, j * 350, i * 350);
                        resolve();
                    };
                });
            }
        }
    }


    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/jpeg");
    link.download = "puzzle.jpg";
    link.click();
}

</script>
<template>
    <div class="my-4">
        <div class="relative">
            <div v-for="row in board" class="flex items-center justify-center">
                <div v-for="cell in row" class="flex items-center justify-center cursor-pointer"
                    :class="{ 'gap-1 flex-1': !isSolved, empty: !cell }"
                    @click="move(board.indexOf(row), row.indexOf(cell))">
                    <img v-if="cell" :src="imageMapping[cell]" alt=""
                        :class="{ 'fade-in-after-solved': isSolved && emptyCell.row === board.indexOf(row) && emptyCell.col === row.indexOf(cell) }"
                        class="h-full w-full md:w-40 md:h-40 lg:w-52 lg:h-52 xl:w-60 xl:h-60 2xl:w-64 2xl:h-64">
                </div>
            </div>
            <video v-if="isSolved" src="../assets/movies/the_rock.mp4" autoplay loop
                class="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 sm:w-60 md:w-48 lg:w-60 fade-in-after-solved"></video>
        </div>

        <div class="flex items-center justify-center">
            <button v-if="isSolved" @click="downloadImage" :class="{ 'fade-in-after-solved': isSolved }"
                class="bg-base-300 rounded-2xl mx-8 p-4 md:p-6 flex items-center justify-center gap-2 md:gap-4 -mt-40 z-50">
                <p class="text-xl md:text-lg lg:text-2xl font-black text-accent">Download da Imagem </p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                    class="w-12 h-12 fill-accent">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l3 3m0 0l3-3m-3 3V2.25" />
                </svg>
            </button>
        </div>
        <div class="flex items-center justify-center mt-2 gap-4">
            <!-- <button @click="winGame">Ganhar</button> -->
            <div class="bg-base-300 p-4 rounded-xl flex gap-2 items-center justify-center" v-if="!isSolved">
                <p class="text-2xl font-bold">Movimentos:
                    <span class="text-secondary text-4xl font-black">
                        {{ movesCount }}
                    </span>
                </p>
                <img src="../assets/images/sr-1.png" alt="" v-show="movesCount < 5" class="w-20">
                <img src="../assets/images/sr-2.png" alt="" v-show="movesCount >= 5 && movesCount < 10" class="w-20">
                <img src="../assets/images/sr-3.png" alt="" v-show="movesCount >= 10 && movesCount < 15" class="w-20">
                <img src="../assets/images/sr-4.png" alt="" v-show="movesCount >= 15 && movesCount < 20" class="w-20">
                <img src="../assets/images/sr-5.png" alt="" v-show="movesCount >= 20 && movesCount < 25" class="w-20">
                <img src="../assets/images/sr-6.png" alt="" v-show="movesCount >= 25" class="w-20">
            </div>
            <div v-if="isSolved" class="bg-base-300 p-4 rounded-xl flex flex-col gap-2 w-full"
                :class="{ 'fade-in-after-solved': isSolved }">

                <audio id="heat_waves" autoplay>
                    <source src="../assets/sound/heat_waves.mp3" type="audio/mp3">
                </audio>
                <p class="text-lg text-secondary font-semibold">Uauu! Você conseguiu resolver este Puzzle em apenas
                    <span class="font-bold text-2xl text-accent">{{ movesCount }}</span> movimentos, Parabéns!
                </p>
                <p class="text-lg text-secondary font-semibold">Mas que tal tentar de novo em menos movimentos?</p>
                <p class="text-lg text-neutral font-semibold">A imagem sempre muda a cada partida.</p>
                <div class="flex flex-col lg:flex-row items-center justify-center gap-4 text-center">
                    <button v-if="isSolved" @click="restartGame"
                        class="text-2xl text-base-300 font-bold p-6 bg-gradient-to-r from-primary via-secondary to-accent rounded-2xl">
                        Jogar Novamente
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div class="hidden">
        <img src="../assets/images/1.jpg" alt="">
        <img src="../assets/images/2.jpg" alt="">
        <img src="../assets/images/3.jpg" alt="">
        <img src="../assets/images/4.jpg" alt="">
        <img src="../assets/images/5.jpg" alt="">
        <img src="../assets/images/6.jpg" alt="">
        <img src="../assets/images/7.jpg" alt="">
        <img src="../assets/images/8.jpg" alt="">
        <img src="../assets/images/9.jpg" alt="">
    </div>
</template>
  
<style>
@keyframes fadeInAnimation {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

.fade-in-after-solved {
    animation-name: fadeInAnimation;
    animation-timing-function: ease-in;
    animation-duration: 2s;
    animation-fill-mode: forwards;
}

.slide-fwd-center {
    -webkit-animation: slide-fwd-center 0.45s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    animation: slide-fwd-center 0.45s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

@-webkit-keyframes slide-fwd-center {
    0% {
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
    }

    100% {
        -webkit-transform: translateZ(160px);
        transform: translateZ(160px);
    }
}

@keyframes slide-fwd-center {
    0% {
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
    }

    100% {
        -webkit-transform: translateZ(160px);
        transform: translateZ(160px);
    }
}
</style>