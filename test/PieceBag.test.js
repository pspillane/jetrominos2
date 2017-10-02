import { expect } from "chai";
import PieceBag from "../src/PieceBag";

describe("PieceBag", () => {
  let pieceBag = null;

  beforeEach(() => {
    pieceBag = new PieceBag();
  });

  it("pulls the next piece out of the bag", () => {
    const piece = pieceBag.next();

    // "cheating" a bit here; _shape is meant to be a private member
    expect(piece).to.haveOwnProperty("_shape");
  });

  it("previews the upcoming piece", () => {
    const piece = pieceBag.peek();

    // see the test right above this one
    expect(piece).to.haveOwnProperty("_shape");
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
