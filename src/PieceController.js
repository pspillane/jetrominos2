const AUTO_FALL = 30;

class PieceController {
  constructor() {
    this._piece = null;
    this._autoFallCount = 0;
  }

  setPiece(piece) {
    this._piece = piece;
  }

  hasPiece() {
    return this._piece !== null;
  }

  update(input) {
    if (!this.hasPiece()) {
      return;
    }

    if (input.left) {
      this._shiftLeft();
    }
    if (input.right) {
      this._shiftRight();
    }
    if (input.down) {
      this._fall();
    }
    if (input.up) {
      this._hardDrop();
    }
    if (input.a) {
      this._rotateRight();
    }
    if (input.b) {
      this._rotateLeft();
    }

    if (this._autoFallCount === AUTO_FALL) {
      this._fall();
    } else {
      this._autoFallCount++;
    }
  }

  _shiftLeft() {
    return this._piece.shift(-1, 0);
  }

  _shiftRight() {
    return this._piece.shift(1, 0);
  }

  _rotateLeft() {
    return this._piece.rotateLeft();
  }

  _rotateRight() {
    return this._piece.rotateRight();
  }

  _fall() {
    this._autoFallCount = 0;
    const success = this._piece.shift(0, 1);
    if (!success) {
      this._releasePiece();
    }
    return success;
  }

  _releasePiece() {
    this._piece = null;
  }

  _hardDrop() {
    while (this.hasPiece()) {
      this._fall();
    }
  }
}

export default PieceController;