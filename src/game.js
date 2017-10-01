import Renderer from "./Renderer";
import Board from "./Board";
import Piece from "./Piece";
import PieceBag from "./PieceBag";
import PieceController from "./PieceController";
import InputState from "./InputState";

const pieceController = new PieceController();

let inputState, renderer, board, pieceBag, piece;

if (typeof window !== "undefined" && typeof document !== "undefined") {
  init();
}

function init() {
  inputState = new InputState();
  window.addEventListener("keyup", evt => inputState.keyUp(evt));
  window.addEventListener("keydown", evt => inputState.keyDown(evt));

  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");
  renderer = new Renderer(context, canvas.width, canvas.height);
  board = new Board(renderer);
  pieceBag = new PieceBag(board);

  // Parameterless constructor creates a null piece whose sole purpose
  // is to signal the actual first piece to be pulled from the PieceBag
  piece = new Piece();

  const FPS = 30;
  setInterval(main, 1000 / FPS);
}

function main() {
  update();
  draw();
}

function update() {
  if (!pieceController.hasPiece()) {
    board.clearWholeLines();
    piece = pieceBag.next();
    piece.activate(board, pieceController);
  }

  pieceController.update(inputState.data);
}

function draw() {
  renderer.clearScreen();
  renderer.drawText("Next: " + pieceBag.peek()._shape.name, 200, 50);
  board.draw(renderer);
}

