import { expect } from "chai";
import sinon from "sinon";
import InputState from "../src/InputState";
import Renderer from "../src/Renderer";
import Board from "../src/Board";
import PieceBag from "../src/PieceBag";
import PieceController from "../src/PieceController";
import Piece from "../src/Piece";
import shapes from "../src/shapes";

import Jetrominos2 from "../src/Jetrominos2";

describe("Jetrominos2", () => {
  let inputState, renderer, board, pieceBag, pieceController, game;

  beforeEach(() => {
    inputState = sinon.createStubInstance(InputState);
    renderer = sinon.createStubInstance(Renderer);
    board = sinon.createStubInstance(Board);
    pieceController = sinon.createStubInstance(PieceController);
    pieceBag = sinon.createStubInstance(PieceBag);

    game = new Jetrominos2(inputState, renderer, board, pieceBag, pieceController);
  });
  
  it("updates to the next frame based on input and current game state", () => {
    pieceController.hasPiece.returns(true);
    
    game.update();
    
    expect(pieceBag.next.called).to.be.false;
  });

  it("grabs a new piece from the bag during the update phase", () => {
    pieceController.hasPiece.returns(false);
    pieceBag.next.returns({
      activate: sinon.stub()
    });
    
    game.update();

    expect(pieceBag.next.called).to.be.true;
  });
  
  it("draws", () => {
    pieceBag.peek.returns({
      _shape: {
        name: "test"
      }
    });

    game.draw();

    expect(renderer.clearScreen.called).to.be.true;
    expect(renderer.drawText.called).to.be.true;
    expect(board.draw.called).to.be.true;
  });
});
