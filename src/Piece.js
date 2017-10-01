const AUTO_FALL = 30;

class Piece {
  constructor(shape) {
    this._active = false;
    this._shape = shape;
  }

  activate(board) {
    this._currentPivot = this._shape.spawnPoint;
    this._currentPoints = this._getPoints(this._currentPivot, 0);
    
    this._board = board;
    this._board.add(this._shape.colorValue, this._currentPoints);

    this._rotation = 0;
    this._autoFallCount = 0;
    this._active = true;
  }

  isActive() {
    return this._active;
  }

  update(input) {
    if (!this._active) {
      return;
    }

    if (input.left) {
      this.shiftLeft();
      input.left = false;
    }
    if (input.right) {
      this.shiftRight();
      input.right = false;
    }
    if (input.down) {
      this.fall();
    }
    if (input.up) {
      this.hardDrop();
      input.up = false;
    }
    if (input.a) {
      this.rotateRight();
      input.a = false;
    }
    if (input.b) {
      this.rotateLeft();
      input.b = false;
    }

    if (this._autoFallCount === AUTO_FALL) {
      this.fall();
    } else {
      this._autoFallCount++;
    }
  }

  shiftLeft() {
    return this._shift(-1, 0);
  }

  shiftRight() {
    return this._shift(1, 0);
  }

  rotateLeft() {
    const prev = this._rotation > 0
      ? this._rotation - 1
      : this._shape.rotations.length-1;
    return this._move(this._currentPivot, prev);
  }

  rotateRight() {
    const next = this._rotation < this._shape.rotations.length-1
      ? this._rotation + 1
      : 0;
    return this._move(this._currentPivot, next);
  }

  fall() {
    this._autoFallCount = 0;
    const success = this._shift(0, 1);
    if (!success) {
      this.deactivate();
    }
    return success;
  }

  hardDrop() {
    while (this._active) {
      this.fall();
    }
  }

  deactivate() {
    this._board = null;
    this._active = false;
  }

  _shift(x, y) {
    const newPivot = this._currentPivot.add(x, y);
    return this._move(newPivot, this._rotation);
  }

  _move(pivot, toRot) {
    this._board.remove(this._currentPoints);
    
    const next = this._getPoints(pivot, toRot);
    const isOpen = this._board.isOpen(next);

    if (isOpen) {
      this._board.add(this._shape.colorValue, next);
      this._currentPoints = next;
      this._currentPivot = pivot;
      this._rotation = toRot;
    } else {
      this._board.add(this._shape.colorValue, this._currentPoints);
    }

    return isOpen;
  }
  
  _getPoints(pivot, toRotation) {
    const newPivot = pivot;
    const rot = this._shape.rotations[toRotation];
    const aux = rot.auxPoints.map(a => pivot.add(a.x, a.y));
    return [newPivot].concat(aux);
  }
}

export default Piece;
