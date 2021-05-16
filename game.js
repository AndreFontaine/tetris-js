"use strict";

const start = () => {
  console.log(`Game start`);
};

const blockI = {
  cells: [3, 4, 5, 6],
  color: "#01F0EF",
  next: [13, 14, 15, 16],
  index: 1,
};

const blockJ = {
  cells: [4, 14, 15, 16],
  color: "#0101F0",
  next: [8, 14, 15, 16],
  index: 2,
};

const blockL = {
  cells: [6, 14, 15, 16],
  color: "#EFA000",
  next: [10, 14, 15, 16],
  index: 3,
};

const blockO = {
  cells: [4, 5, 14, 15],
  color: "#EFF200",
  next: [8, 9, 14, 15],
  index: 4,
};

const blockS = {
  cells: [4, 5, 13, 14],
  color: "#00EF02",
  next: [9, 10, 14, 15],
  index: 5,
};

const blockT = {
  cells: [4, 13, 14, 15],
  color: "#A000F1",
  next: [9, 14, 15, 16],
  index: 6,
};

const blockZ = {
  cells: [4, 5, 15, 16],
  color: "#F00100",
  next: [8, 9, 15, 16],
  index: 7,
};

let currentBlock = blockL;
let nextBlock = blockS;

const nextGridelements = [];
const boardGridelements = [];

const generateBoard = () => {
  const board = document.getElementById("board");
  let index = 0;

  for (let i = 0; i < 20; i++) {
    const row = document.createElement("div");
    row.className = "table-row";
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement("div");
      cell.className = "table-cell board-cell";
      cell.id = `${index}`;
      boardGridelements.push(cell);
      row.appendChild(cell);
      index++;
    }
    board.appendChild(row);
  }
};

const generateNextBlock = () => {
  const board = document.getElementById("next-block");
  let index = 0;

  for (let i = 0; i < 4; i++) {
    const row = document.createElement("div");
    row.className = "table-row";
    for (let j = 0; j < 6; j++) {
      const cell = document.createElement("div");
      cell.className = "table-cell next-cell";
      cell.id = `n-${index}`;
      nextGridelements.push(cell);
      row.appendChild(cell);
      index++;
    }
    board.appendChild(row);
  }
};

let blockIndex = 0;
let nextIndex = 3;

let keyPress;

const drawBlockOnBoard = () => {
  const block = drawBlock(nextIndex);

  // TODO: detect collition bottom

  // TODO: detect collition right
  if (block.cells.some((item) => (item + blockIndex) % 10 === 9)) {
    console.log("collition with rigth");
  } else {
    if (keyPress === "ArrowRight") {
      blockIndex += 1;
      keyPress = null;
    }
  }

  // TODO: detect collition left
  if (block.cells.some((item) => (item + blockIndex) % 10 === 0)) {
    console.log("collition with left");
  } else {
    if (keyPress === "ArrowLeft") {
      blockIndex -= 1;
      keyPress = null;
    }
  }

  if (keyPress === "ArrowDown") {
    blockIndex += 10;
    keyPress = null;
  }

  if (keyPress === "ArrowUp") {
    // TODO: implement block flip
    keyPress = null;
  }

  // reset cells
  document.querySelectorAll(".board-cell").forEach(function (el) {
    el.style.backgroundColor = el.getAttribute("color");
  });

  for (let i = 0; i < block.cells.length; i++) {
    let j = boardGridelements[blockIndex + block.cells[i]];

    if (j) {
      boardGridelements[blockIndex + block.cells[i]].style.backgroundColor =
        block.color;
    }
  }

  blockIndex += 10;

  if (blockIndex > 199) {
    blockIndex = 0;
    nextIndex = generateNext();
  }
};

const drawBlock = (blockId) => {
  switch (blockId) {
    case 1:
      // i light blue
      currentBlock = blockI;
      break;
    case 2:
      // j blue
      currentBlock = blockJ;
      break;
    case 3:
      // l orange
      currentBlock = blockL;
      break;
    case 4:
      // o yellow
      currentBlock = blockO;
      break;
    case 5:
      // s green
      currentBlock = blockS;
      break;
    case 6:
      // t violet
      currentBlock = blockT;
      break;
    case 7:
      // z red
      currentBlock = blockZ;
      break;
    default:
      console.log(`${currentBlock} - Sorry, we are out of ${currentBlock}.`);
  }

  return currentBlock;
};

const intervalID = window.setInterval(drawBlockOnBoard, 500);

const figures = [1, 2, 3, 4, 5, 6, 7];

const generateNext = () => {
  const block = figures[Math.floor(Math.random() * figures.length)];
  let blockIndex = 0;

  document.querySelectorAll(".next-cell").forEach(function (el) {
    el.style.backgroundColor = el.getAttribute("color");
  });

  switch (block) {
    case 1:
      // i light blue
      drawNext(blockI);
      blockIndex = 1;
      break;
    case 2:
      // j blue
      drawNext(blockJ);
      blockIndex = 2;
      break;
    case 3:
      // l orange
      drawNext(blockL);
      blockIndex = 3;
      break;
    case 4:
      // o yellow
      drawNext(blockO);
      blockIndex = 4;
      break;
    case 5:
      // s green
      drawNext(blockS);
      blockIndex = 5;
      break;
    case 6:
      // t violet
      drawNext(blockT);
      blockIndex = 6;
      break;
    case 7:
      // z red
      drawNext(blockZ);
      blockIndex = 7;
      break;
    default:
      console.log(`${block} - Sorry, we are out of ${block}.`);
  }

  return blockIndex;
};

const drawNext = (block) => {
  for (let i = 0; i < block.next.length; i++) {
    let j = block.next[i];
    nextGridelements[j].style.backgroundColor = block.color;
  }
};

document.addEventListener("keydown", (e) => {
  if (
    e.key === "ArrowUp" ||
    e.key === "ArrowDown" ||
    e.key === "ArrowRight" ||
    e.key === "ArrowLeft"
  ) {
    keyPress = e.key;
  }
});

generateBoard();
generateNextBlock();
generateNext();
start();
