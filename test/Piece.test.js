import { expect } from "chai";
import sinon from "sinon";

import Board from "../src/Board";
import PieceController from "../src/PieceController";
import Point from "../src/Point";
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
    board.add.returns(true);
    board.remove.returns(true);

    pieceController = sinon.createStubInstance(PieceController);
    
    shape = shapes.find(s => s.name === "I");

    piece = new Piece(shape);
    piece.activate(board, pieceController);
  });

  it("adds itself to the board", () => {
    expect(board.add.called).to.be.true;
  });

  it("tells a piece controller to start controlling it", () => {
    expect(pieceController.setPiece.calledWith(piece)).to.be.true;
  });

  it("shifts its blocks given a vector", () => {
    piece.shift(1, 1);
    pieceDidMove([[5, 2], [4, 2], [6, 2], [7, 2]]);
  });

  it("rotates its blocks clockwise and shifts if needed by the rotation", () => {
    piece.rotateRight();
    pieceDidMove([[5, 1], [5, 0], [5, 2], [5, 3]]);
  });

  it("rotates its blocks counter-clockwise and shifts if needed by the rotation", () => {
    piece.rotateLeft();
    pieceDidMove([[4, 2], [4, 0], [4, 1], [4, 3]]);
  });

  function pieceDidMove(coords) {
    const newPoints = coords.map(c => new Point(c[0], c[1]));
    expect(board.add.lastCall.args).to.deep.equal([1, newPoints]);
  }

  function p(x, y) {
    return new Point(x, y);
  }
});
