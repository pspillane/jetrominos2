import Point from "./Point";

class Piece {
  constructor(shape) {
    this._shape = shape;
  }

  activate(board, pieceController) {
    this._rotationIndex = 0;
    this._currentPivot = this._shape.spawnPoint;
    this._currentPoints = this._getPoints(this._currentPivot, 0);
    
    this._board = board;
    this._board.add(this._shape.colorValue, this._currentPoints);

    pieceController.setPiece(this);
  }

  _getPoints(pivot, toRotationIndex) {
    const newPivot = pivot;
    const rot = this._shape.rotations[toRotationIndex];
    const aux = rot.auxPoints.map(a => pivot.add(a));
    return [newPivot].concat(aux);
  }

  shift(x, y) {
    const newPivot = this._currentPivot.add(new Point(x, y));
    return this._move(newPivot, this._rotationIndex);
  }

  rotateLeft() {
    return this._rotate(-1);
  }

  rotateRight() {
    return this._rotate(1);
  }

  _rotate(indexDiff) {
    const afterDiff = this._rotationIndex + indexDiff;
    const toRotIdx = this._loop(afterDiff);
    const newPivot = this._getPivotOffset(this._currentPivot, toRotIdx);
    return this._move(newPivot, toRotIdx);
  }

  _loop(afterDiff) {
    const maxIdx = this._shape.rotations.length - 1;
    if (afterDiff > maxIdx) {
      return 0;
    }
    if (afterDiff < 0) {
      return maxIdx;
    }
    return afterDiff;
  }

  _getPivotOffset(pivot, toRotationIndex) {
    const toRot = this._shape.rotations[toRotationIndex].offset;
    const fromRot = this._shape.rotations[this._rotationIndex].offset;
    return toRot.subtract(fromRot).add(pivot);
  }

  _move(pivot, toRotationIndex) {
    this._board.remove(this._currentPoints);

    const next = this._getPoints(pivot, toRotationIndex);
    const isOpen = this._board.isOpen(next);

    if (isOpen) {
      this._board.add(this._shape.colorValue, next);
      this._currentPoints = next;
      this._currentPivot = pivot;
      this._rotationIndex = toRotationIndex;
    } else {
      this._board.add(this._shape.colorValue, this._currentPoints);
    }

    return isOpen;
  }
}

export default Piece;
