import { expect } from "chai";
import Board from "../src/Board";
import PieceBag from "../src/PieceBag";

describe("PieceBag", () => {
  let pieceBag = null;

  beforeEach(() => {
    pieceBag = new PieceBag(new Board());
  });

  it("pulls the next piece out of the bag", () => {
    const piece = pieceBag.next();
    expect(piece).to.be.an("Object");
  });

  it("previews the upcoming piece", () => {
    const shape = pieceBag.peek();
    expect(shape).to.be.an("Object");
  });

  it("maintains the piece preview until the next piece is pulled", () => {
    const firstPeek = pieceBag.peek();
    const secondPeek = pieceBag.peek();
    expect(firstPeek).to.equal(secondPeek);
  });

  it("decides on a new shape after a piece is pulled from the bag", () => {
    const firstPeek = pieceBag.peek();
    pieceBag.next();
    const secondPeek = pieceBag.peek();
    expect(firstPeek).not.to.equal(secondPeek);
  });
});
