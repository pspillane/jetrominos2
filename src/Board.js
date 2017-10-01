const TOP_X = 20;
const TOP_Y = 20;

const COLUMNS = 10;
const ROWS = 20;

const BLOCK_SIZE = 10;

const WIDTH = COLUMNS*BLOCK_SIZE;
const HEIGHT = ROWS*BLOCK_SIZE;

const COLORS = {
  1: "cyan",
  2: "yellow",
  3: "purple",
  4: "green",
  5: "red",
  6: "blue",
  7: "orange"
};

class Board {
  constructor() {
    this._cells = Array(ROWS);
    for (let i = 0; i < ROWS; i++) {
      this._cells[i] = this._createEmptyRow();
    }
  }

  _createEmptyRow() {
    const row = Array(COLUMNS);
    for (let i = 0; i < COLUMNS; i++) {
      row[i] = 0;
    }
    return row;
  }

  add(v, points) {
    points.forEach(p => {
      this._cells[p.y][p.x] = v;
    });
  }

  remove(points) {
    points.forEach(p => {
      this._cells[p.y][p.x] = 0;
    });
  }

  isOpen(points) {
    return points.reduce((acc, p) => acc ? this._isOpen(p.x, p.y) : false, true);
  }

  _isOpen(x, y) {
    const isInside = x >= 0 && y >= 0 && x < COLUMNS && y < ROWS;
    return isInside && this._cells[y][x] === 0;
  }

  clearWholeLines() {
    const remainingRows = this._cells.filter(r => r.indexOf(0) !== -1);
    const numEmptyRows = ROWS - remainingRows.length;
    const emptyRows = [];
    for (let i = 0; i < numEmptyRows; i++) {
      emptyRows.push(this._createEmptyRow());
    }
    this._cells = emptyRows.concat(remainingRows);
  }

  draw(renderer) {
    renderer.drawRectangle("black", TOP_X, TOP_Y, WIDTH, HEIGHT);

    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLUMNS; j++) {
        if (this._cells[i][j] !== 0) {
          const cellValue = this._cells[i][j];
          const color = COLORS[cellValue] || "white";
          const x = (j*BLOCK_SIZE) + TOP_X;
          const y = (i*BLOCK_SIZE) + TOP_Y;

          renderer.drawRectangle(color, x, y, BLOCK_SIZE, BLOCK_SIZE);
        }
      }
    }
  }
}

export default Board;
