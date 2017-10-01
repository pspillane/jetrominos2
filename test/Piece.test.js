import { expect } from "chai";
import sinon from "sinon";

import Board from "../src/Board";
import PieceController from "../src/PieceController";
import shapes from "../src/shapes";

import Piece from "../src/Piece";

describe("Piece", () => {
  let board = null;
  let pieceController = null;
  let shape = null;

  let piece = null;

  beforeEach(() => {
    board = sinon.createStubInstance(Board);
    board.isOpen.returns(true);
    board.isOpen.onCall(30).returns(false);
    board.add.returns(true);
    board.remove.returns(true);

    pieceController = sinon.createStubInstance(PieceController);
    
    shape = shapes.find(s => s.name === "T");

    piece = new Piece(shape);
    piece.activate(board, pieceController);
  });

  it("adds itself to the board", () => {
    expect(board.add.called).to.be.true;
  });

  it("tells a piece controller to start controlling it", () => {
    expect(pieceController.setPiece.calledWith(piece)).to.be.true;
  })

  it("shifts its blocks given a vector", () => {
    piece.shift(1, 1);
    pieceDidMove();
  });

  it("rotates its blocks clockwise", () => {
    piece.rotateRight();
    pieceDidMove();
  });

  it("rotates its blocks counter-clockwise", () => {
    piece.rotateLeft();
    pieceDidMove();
  });

  function pieceDidMove() {
    expect(board.remove.called).to.be.true;
  }

  function pieceDidNotMove() {
    expect(board.remove.called).to.be.false;
  }
});
