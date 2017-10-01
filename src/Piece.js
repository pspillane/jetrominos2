class Piece {
  constructor(shape) {
    this._shape = shape;
  }

  activate(board, pieceController) {
    this._currentPivot = this._shape.spawnPoint;
    this._currentPoints = this._getPoints(this._currentPivot, 0);
    
    this._board = board;
    this._board.add(this._shape.colorValue, this._currentPoints);

    pieceController.setPiece(this);

    this._rotation = 0;
  }

  shift(x, y) {
    const newPivot = this._currentPivot.add(x, y);
    return this._move(newPivot, this._rotation);
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
