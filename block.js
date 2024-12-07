class Block {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
  }
}

const BLUE = "blue";
const RED = "red";
const GREEN = "green";
const YELLOW = "yellow";
const ORANGE = "orange";
const PURPLE = "purple";
const CYAN = "cyan";

class Piece {
  constructor(blocks, name, pivotIndex) {
    this.blocks = blocks;
    this.name = name;
    this.pivotIndex = pivotIndex;
  }

  getMinX() {
    let minX = GRID_WIDTH;
    for (var block of this.blocks) {
      if (block.x < minX) {
        minX = block.x;
      }
    }
    return minX;
  }

  getMaxX() {
    let maxX = 0;
    for (var block of this.blocks) {
      if (block.x > maxX) {
        maxX = block.x;
      }
    }
    return maxX;
  }

  getMinY() {
    let minY = GRID_HEIGHT;
    for (var block of this.blocks) {
      if (block.y < minY) {
        minY = block.y;
      }
    }
    return minY;
  }

  getMaxY() {
    let maxY = 0;
    for (var block of this.blocks) {
      if (block.y > maxY) {
        maxY = block.y;
      }
    }
    return maxY;
  }

  rotate(oldBlocks) {
    if (this.name === "SQUARE") {
      return;
    }
    let pivot = this.blocks[this.pivotIndex];
    let newBlocks = [];
    for (var block of this.blocks) {
      let x = pivot.x + pivot.y - block.y;
      let y = pivot.y - pivot.x + block.x;
      // if any of the new blocks are out of bounds, revert the rotation
      if (x < 0 || x >= GRID_WIDTH || y >= GRID_HEIGHT) {
        return;
      }
      for (var oldBlock of oldBlocks) {
        if (oldBlock.x === x && oldBlock.y === y) {
          return;
        }
      }
      newBlocks.push(new Block(x, y, block.color));
    }
    this.blocks = newBlocks;
    if (this.name === "LINE") {
      if (this.pivotIndex === 1) {
        this.pivotIndex = 2;
      } else {
        this.pivotIndex = 1;
      }
    }
  }
}

const SQUARE = new Piece(
  [
    new Block(GRID_WIDTH / 2 - 1, -1, YELLOW),
    new Block(GRID_WIDTH / 2, -1, YELLOW),
    new Block(GRID_WIDTH / 2, 0, YELLOW),
    new Block(GRID_WIDTH / 2 - 1, 0, YELLOW),
  ],
  "SQUARE",
  1
);

const LINE = new Piece(
  [
    new Block(GRID_WIDTH / 2 - 2, 0, CYAN),
    new Block(GRID_WIDTH / 2 - 1, 0, CYAN),
    new Block(GRID_WIDTH / 2, 0, CYAN),
    new Block(GRID_WIDTH / 2 + 1, 0, CYAN),
  ],
  "LINE",
  1
);

const S = new Piece(
  [
    new Block(GRID_WIDTH / 2 - 2, 0, RED),
    new Block(GRID_WIDTH / 2 - 1, 0, RED),
    new Block(GRID_WIDTH / 2 - 1, -1, RED),
    new Block(GRID_WIDTH / 2, -1, RED),
  ],
  "S",
  1
);

const Z = new Piece(
  [
    new Block(GRID_WIDTH / 2 - 2, -1, GREEN),
    new Block(GRID_WIDTH / 2 - 1, -1, GREEN),
    new Block(GRID_WIDTH / 2 - 1, 0, GREEN),
    new Block(GRID_WIDTH / 2, 0, GREEN),
  ],
  "Z",
  2
);

const L = new Piece(
  [
    new Block(GRID_WIDTH / 2 - 2, 0, ORANGE),
    new Block(GRID_WIDTH / 2 - 1, 0, ORANGE),
    new Block(GRID_WIDTH / 2, 0, ORANGE),
    new Block(GRID_WIDTH / 2, -1, ORANGE),
  ],
  "L",
  1
);

const J = new Piece(
  [
    new Block(GRID_WIDTH / 2 - 2, -1, PURPLE),
    new Block(GRID_WIDTH / 2 - 2, 0, PURPLE),
    new Block(GRID_WIDTH / 2 - 1, 0, PURPLE),
    new Block(GRID_WIDTH / 2, 0, PURPLE),
  ],
  "J",
  2
);

const T = new Piece(
  [
    new Block(GRID_WIDTH / 2 - 2, 0, BLUE),
    new Block(GRID_WIDTH / 2 - 1, 0, BLUE),
    new Block(GRID_WIDTH / 2, 0, BLUE),
    new Block(GRID_WIDTH / 2 - 1, -1, BLUE),
  ],
  "T",
  1
);
