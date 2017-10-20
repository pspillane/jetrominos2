import GameLoop from "./GameLoop";

class Jetrominos2 extends GameLoop {
  constructor(inputState, renderer, board, pieceBag, pieceController) {
    super(inputState, renderer);

    this.board = board;
    this.pieceBag = pieceBag;
    this.pieceController = pieceController;
  }
  
  update() {
    if (!this.pieceController.hasPiece()) {
      this.board.clearWholeLines();
      this.pieceBag.next().activate(this.board, this.pieceController);
    }
  
    this.pieceController.update(this.inputState.data);
  }

  draw() {
    this.renderer.clearScreen();
    this.renderer.drawText("Next: " + this.pieceBag.peek()._shape.name, 200, 50);
    this.board.draw(this.renderer);
  }
}

export default Jetrominos2;