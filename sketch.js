const BLOCK_SIZE = 30;
const GRID_WIDTH = 10;
const GRID_HEIGHT = 20;

let currentFrameRate = 30;

let blocks = [];
let currentPiece;
let nextPiece;
let nextX = 0;
let nextY = 0;
let score = 0;

function setup() {
  createCanvas(GRID_WIDTH * BLOCK_SIZE, GRID_HEIGHT * BLOCK_SIZE);
  frameRate(currentFrameRate);
  resetGame();
}

function resetGame() {
  blocks = [];
  currentPiece = getRandomPiece();
  nextPiece = getRandomPiece();
  nextX = 0;
  nextY = 0;
  score = 0;
  scoreHTML.innerHTML = "0";
  loop();
}

function pauseGame() {
  if (isLooping()) {
    document.getElementById("pause").innerHTML = "RESUME";
    noLoop();
  } else {
    document.getElementById("pause").innerHTML = "PAUSE";
    loop();
  }
}

let scoreHTML = document.getElementById("score");
let nextPieceHTML = document.getElementById("nextPiece");

function getRandomPiece() {
  const pieces = [SQUARE, LINE, L, J, T, Z, S];

  const randomIndex = Math.floor(Math.random() * pieces.length);
  // copy the array instead of referencing it
  return new Piece(
    pieces[randomIndex].blocks.map(
      (block) => new Block(block.x, block.y, block.color)
    ),
    pieces[randomIndex].name,
    pieces[randomIndex].pivotIndex
  );
}

function draw() {
  background(0);
  stroke(50);
  for (var i = 0; i <= GRID_HEIGHT; i++) {
    line(0, i * BLOCK_SIZE, width, i * BLOCK_SIZE);
  }
  for (var i = 0; i <= GRID_WIDTH; i++) {
    line(i * BLOCK_SIZE, 0, i * BLOCK_SIZE, height);
  }
  strokeWeight(1);
  let hasHit = false;
  let canMove = true;
  let currentRows = [];
  for (var block of blocks) {
    if (!currentRows[block.y]) {
      currentRows[block.y] = 1;
    } else {
      currentRows[block.y]++;
    }
    fill(block.color);
    rect(block.x * BLOCK_SIZE, block.y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    for (var currentBlock of currentPiece.blocks) {
      if (currentBlock.y + nextY >= block.y) {
        if (currentBlock.x === block.x) {
          hasHit = true;
          break;
        } else if (block.x === currentBlock.x + nextX) {
          canMove = false;
          break;
        }
      }
    }
  }
  if (!hasHit && canMove) {
    currentPiece.blocks.map((block) => (block.x += nextX));
  }
  let minY = GRID_HEIGHT;
  let maxY = 0;
  let currenPieceRows = [];
  currentPiece.blocks.map((block) => {
    fill(block.color);
    rect(block.x * BLOCK_SIZE, block.y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    minY = Math.min(minY, block.y);
    maxY = Math.max(maxY, block.y);
    if (!currenPieceRows[block.y]) {
      currenPieceRows[block.y] = 1;
    } else {
      currenPieceRows[block.y]++;
    }
  });
  if (hasHit && minY <= 0) {
    console.log("Game Over");
    noLoop();
  } else if (hasHit || maxY + 1 >= GRID_HEIGHT) {
    for (var i = minY; i <= maxY; i++) {
      if (
        currenPieceRows[i] &&
        currentRows[i] &&
        currenPieceRows[i] + currentRows[i] === GRID_WIDTH
      ) {
        scoreHTML.innerHTML = ++score;
        blocks = blocks.filter((block) => block.y !== i);
        blocks.map((block) => {
          if (block.y < i) {
            block.y += 1;
          }
        });
      } else {
        blocks = blocks.concat(
          currentPiece.blocks.filter((block) => block.y === i)
        );
      }
    }
    currentPiece = nextPiece;
    nextPiece = getRandomPiece();
  } else {
    currentPiece.blocks.map((block) => (block.y += nextY));
  }
  nextX = 0;
  if (frameCount % 10 === 0) {
    nextY = 1;
  } else {
    nextY = 0;
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW && currentPiece.getMinX() > 0) {
    nextX = -1;
  } else if (
    keyCode === RIGHT_ARROW &&
    currentPiece.getMaxX() < GRID_WIDTH - 1
  ) {
    nextX = 1;
  } else if (keyCode === UP_ARROW) {
    currentPiece.rotate(blocks);
  } else if (keyCode === DOWN_ARROW) {
    nextY = 1;
  }
}

let nextPieceSketch = function (p) {
  p.setup = function () {
    let nextPieceCanvas = p.createCanvas(BLOCK_SIZE * 4, BLOCK_SIZE * 4);
    nextPieceCanvas.parent("nextPiece");
  };

  p.draw = function () {
    p.background(0);
    p.stroke(50);
    p.strokeWeight(1);
    p.fill(nextPiece.blocks[0].color);
    nextPiece.blocks.map((block) => {
      p.rect(
        block.x * BLOCK_SIZE - 3 * BLOCK_SIZE,
        block.y * BLOCK_SIZE + 2 * BLOCK_SIZE,
        BLOCK_SIZE,
        BLOCK_SIZE
      );
    });
  };
};

new p5(nextPieceSketch);
