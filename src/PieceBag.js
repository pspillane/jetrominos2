import Piece from "./Piece";
import shapes from "./shapes";

class PieceBag {
  constructor() {
    this._nextPiece = randomPiece.call(this);
  }

  next() {
    const piece = this._nextPiece;
    this._nextPiece = randomPiece.call(this);
    return piece;
  }

  peek() {
    return this._nextPiece;
  }
}

function randomPiece() {
  const randomIndex = Math.floor(Math.random() * shapes.length);
  const randomShape = shapes[randomIndex];
  return new Piece(randomShape);
}

export default PieceBag;
