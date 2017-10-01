import Renderer from "./Renderer";
import Board from "./Board";
import Piece from "./Piece";
import PieceBag from "./PieceBag";
import InputState from "./InputState";

let inputState, canvas, renderer, board, pieceBag, piece;

if (typeof window !== "undefined" && typeof document !== "undefined") {
  init();
}

function init() {
  inputState = new InputState();
  window.addEventListener("keyup", evt => inputState.keyUp(evt));
  window.addEventListener("keydown", evt => inputState.keyDown(evt));

  canvas = document.getElementById("canvas");
  renderer = new Renderer(canvas);
  board = new Board(renderer);
  pieceBag = new PieceBag(board);

  // parameterless constructor creates a null piece whose sole purpose
  // is to signal the actual first piece to be pulled from the bag
  piece = new Piece();

  const FPS = 30;
  setInterval(main, 1000 / FPS);
}

function main() {
  update();
  draw();
}

function update() {
  if (!piece.isActive()) {
    board.clearWholeLines();
    piece = pieceBag.next();
    piece.activate(board);
  }

  piece.update(inputState.data);
}

function draw() {
  renderer.clearScreen();
  renderer.drawText("Next: " + pieceBag.peek()._shape.name, 200, 50);
  board.draw(renderer);
}

