import { expect } from "chai";
import sinon from "sinon";
import Piece from "../src/Piece";

import PieceController from "../src/PieceController";

describe("PieceController", () => {
  let piece = null;
  let pieceController = null;

  beforeEach(() => {
    piece = sinon.createStubInstance(Piece);
    piece.shift.returns(true);
    piece.rotateLeft.returns(true);
    piece.rotateRight.returns(true);

    pieceController = new PieceController();
  });

  describe("with an active piece", () => {
    beforeEach(() => {
      pieceController.setPiece(piece);
    });

    it("has a piece", () => {
      expect(pieceController.hasPiece()).to.be.true;
    });

    it("waits to make the piece fall automatically", () => {
      pieceController.setAutoFallThreshold(1);
      pieceController.update({});
      expect(piece.shift.called).to.be.false;
    });

    it("eventually makes the piece fall automatically", () => {
      pieceController.setAutoFallThreshold(0);
      pieceController.update({});
      expect(piece.shift.called).to.be.true;
    });

    it("shifts the piece left", () => {
      pieceController.update({left: true});
      expect(piece.shift.calledWith(-1, 0)).to.be.true;
    });

    it("shifts the piece right", () => {
      pieceController.update({right: true});
      expect(piece.shift.calledWith(1, 0)).to.be.true;
    });

    it("soft drops the piece by shifting it down one row", () => {
      pieceController.update({down: true});
      expect(piece.shift.calledWith(0, 1)).to.be.true;
    });

    it("hard drops the piece so it falls until it can't anymore", () => {
      piece.shift.onCall(4).returns(false);

      pieceController.update({up: true});

      expect(piece.shift.calledWith(0, 1)).to.be.true;
      expect(piece.shift.callCount).to.equal(5);
    });

    it("rotates the piece counter-clockwise", () => {
      pieceController.update({b: true});
    });

    it("rotates the piece clockwise", () => {
      pieceController.update({a: true});
    });

    it("keeps calm and carries on when given a strange input object", () => {
      pieceController.update({nyeh: true});
    });
  });

  describe("without an active piece", () => {
    it("does not have a piece", () => {
      expect(pieceController.hasPiece()).to.be.false;
    });

    it("does not react to any input", () => {
      pieceController.update({
        left: true,
        right: true,
        up: true,
        down: true,
        a: true,
        b: true
      });

      expect(piece.shift.called).to.be.false;
      expect(piece.rotateLeft.called).to.be.false;
      expect(piece.rotateRight.called).to.be.false;
    });
  });
});
