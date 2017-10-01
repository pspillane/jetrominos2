import { expect } from "chai";
import sinon from "sinon";

import Board from "../src/Board";
import shapes from "../src/shapes";

import Piece from "../src/Piece";

describe("Piece", () => {
  let board = null;
  let shape = null;
  let piece = null;

  beforeEach(() => {
    board = sinon.createStubInstance(Board);
    board.isOpen.returns(true);
    board.isOpen.onCall(30).returns(false);
    board.add.returns(true);
    board.remove.returns(true);
    
    shape = shapes.find(s => s.name === "T");

    piece = new Piece(shape);
    piece.activate(board);
  });

  it("adds itself to the board", () => {
    expect(board.add.called).to.be.true;
  });

  it("soft drops automatically every 30th frame", () => {
    const inputData = {};

    for (let i = 0; i < 31; i++) {
      piece.update(inputData);
    }
    pieceDidMove();
  });

  it("shifts all of its blocks to the left", () => {
    piece.shiftLeft();
    pieceDidMove();
  });

  it("shifts all of its blocks to the right", () => {
    piece.shiftRight();
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

  it("soft drops its blocks", () => {
    piece.fall();
    pieceDidMove();
  });

  it("hard drops its blocks until reaching an obstacle", () => {
    piece.hardDrop();
    pieceDidMove();
  });

  it("stops accepting input when deactivated", () => {
    const inputData = {};
    piece.deactivate();
    
    piece.update(inputData);

    pieceDidNotMove();
  });

  function pieceDidMove() {
    expect(board.remove.called).to.be.true;
  }

  function pieceDidNotMove() {
    expect(board.remove.called).to.be.false;
  }
});
