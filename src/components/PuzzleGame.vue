<script setup lang="ts">
import { ref, computed } from 'vue';

const SIZE = 3;
const SHUFFLE_MOVES = 30;

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


// function winGame() {
//     let num = 1;
//     for (let i = 0; i < SIZE; i++) {
//         for (let j = 0; j < SIZE; j++) {
//             board.value[i][j] = num++;
//         }
//     }
//     board.value[emptyCell.row][emptyCell.col] = null;
// }

shuffleBoard();

async function downloadImage() {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    //tamanho da imagem
    canvas.width = SIZE * 350;
    canvas.height = SIZE * 350;


    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
            const img = new Image();
            const cellValue = board.value[i][j];
            img.src = `/blog/src/components/images/${cellValue}.jpg`;

            const ctx = canvas.getContext("2d");
            if (!ctx) throw new Error("Failed to get canvas 2D context.");

            await new Promise<void>((resolve) => {
                img.onload = () => {
                    ctx.drawImage(img, j * 350, i * 350);
                    resolve();
                };
            });
        }
    }

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/jpeg");
    link.download = "puzzle.jpg";
    link.click();
}

</script>
<template>
    <div
        class="w-full h-full md:max-w-[25rem] md:max-h-[25rem] xl:max-w-[30rem] xl:max-h-[30rem] 2xl:max-w-[50rem] 2xl:max-h-[50rem] mb-60">
        <div v-for="row in board" class="flex">
            <div v-for="cell in row" class="flex flex-1 items-center justify-center cursor-pointer"
                :class="{ 'border-primary border': !isSolved, empty: !cell }"
                @click="move(board.indexOf(row), row.indexOf(cell))">

                <!-- <img v-if="cell" :src="`/blog/src/components/images/${cell}.jpg`" alt=""
                    :class="{ 'fade-in-after-solved': isSolved && emptyCell.row === board.indexOf(row) && emptyCell.col === row.indexOf(cell) }"> -->
                <img v-if="cell" :src="`../CyberAPOKA/blog/blob/main/src/components/images/${cell}.jpg`" alt=""
                    :class="{ 'fade-in-after-solved': isSolved && emptyCell.row === board.indexOf(row) && emptyCell.col === row.indexOf(cell) }">

                <!-- <span class="absolute text-red-600 text-5xl">{{ cell }}</span> -->
            </div>
        </div>
        <div class="flex items-center justify-center">
            <button v-if="isSolved" @click="downloadImage" :class="{ 'fade-in-after-solved': isSolved }"
                class="bg-base-300 rounded-2xl mx-8 p-4 md:p-6 flex items-center justify-center gap-2 md:gap-4 -mt-40 z-50">
                <p class="text-xl md:text-3xl font-black text-accent">Download da Imagem </p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                    class="w-12 h-12 fill-accent">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l3 3m0 0l3-3m-3 3V2.25" />
                </svg>
            </button>
        </div>
        <div class="flex items-center justify-center px-4 mt-2 gap-4">
            <!-- <button @click="winGame">Ganhar</button> -->
            <div class="bg-base-300 p-4 rounded-xl" v-if="!isSolved">
                <p class="text-2xl font-bold">Movimentos:
                    <span class="text-secondary text-4xl font-black">
                        {{ movesCount }}
                    </span>
                </p>
            </div>
            <div v-if="isSolved" class="bg-base-300 p-4 rounded-xl flex flex-col gap-2 w-full"
                :class="{ 'fade-in-after-solved': isSolved }">
                <p class="text-lg text-secondary font-semibold">Uauu! Você conseguiu resolver este Puzzle em apenas <span
                        class="font-bold text-2xl text-accent">{{ movesCount }}</span> movimentos, Parabéns!</p>
                <p class="text-lg text-secondary font-semibold">Mas que tal tentar de novo em menos movimentos?</p>
                <p class="text-lg text-neutral font-semibold">A imagem sempre muda a cada partida.</p>
                <div class="text-center">
                    <button v-if="isSolved" @click="restartGame"
                        class="text-2xl text-base-300 font-bold p-6 bg-gradient-to-r from-primary via-secondary to-accent rounded-2xl">
                        Jogar Novamente
                    </button>
                </div>
            </div>
        </div>
    </div>
    <img src="../components/images/1.jpg" alt="">
    <img src="../components/images/2.jpg" alt="">
    <img src="../components/images/3.jpg" alt="">
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