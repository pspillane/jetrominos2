class PieceController {
  constructor() {
    this._piece = null;
    this._autoFallThreshold = 30;
    this._autoFallCount = 0;

    const command = (fn, cond) => ({ framesOn: 0, fn: fn, cond: cond });
    const once = (cmd) => cmd.framesOn === 0;
    const das = (cmd) => cmd.framesOn === 0 || cmd.framesOn > 10;
    const auto = () => true;

    this._commands = {
      left: command(this._shiftLeft.bind(this), das),
      right: command(this._shiftRight.bind(this), das),
      down: command(this._fall.bind(this), auto),
      up: command(this._hardDrop.bind(this), once),
      a: command(this._rotateRight.bind(this), once),
      b: command(this._rotateLeft.bind(this), once)
    };
  }

  setPiece(piece) {
    this._piece = piece;
  }

  setAutoFallThreshold(n) {
    this._autoFallThreshold = n;
  }

  hasPiece() {
    return this._piece !== null;
  }

  update(input) {
    if (!this.hasPiece()) {
      return;
    }

    this._processCommands(input);

    if (this._autoFallCount === this._autoFallThreshold) {
      this._fall();
    } else {
      this._autoFallCount++;
    }
  }

  _processCommands(input) {
    for (var prop in this._commands) {
      if (this._commands.hasOwnProperty(prop)) {
        const cmd = this._commands[prop];
        if (input[prop]) {
          if (cmd.cond(cmd)) {
            cmd.fn();
          }
          cmd.framesOn++;
        } else {
          cmd.framesOn = 0;
        }
      }
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