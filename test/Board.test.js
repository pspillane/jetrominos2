import { expect } from "chai";
import sinon from "sinon";

import Point from "../src/Point";
import Renderer from "../src/Renderer";
import Board from "../src/Board";

describe("Board", () => {
  let board = null;

  beforeEach(() => {
    board = new Board();
  });

  it("starts with all empty cells", () => {
    const allPoints = [];
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 10; j++) {
        allPoints.push(new Point(j, i));
      }
    }
    const isOpen = board.isOpen(allPoints);

    expect(isOpen).to.equal(true);
  });

  it("places colored blocks such that each block occupies a cell", () => {
    const pointsToAdd = [new Point(0, 0), new Point(0, 1), new Point(1, 0)];

    board.add(1, pointsToAdd);
    
    const isOpen = board.isOpen(pointsToAdd);
    expect(isOpen).to.equal(false);
  });

  it("removes blocks to free up the cells they once occupied", () => {
    const pointsToAdd = [new Point(0, 0), new Point(0, 1), new Point(1, 0)];
    board.add(1, pointsToAdd);
    
    board.remove(pointsToAdd);

    const isOpen = board.isOpen(pointsToAdd);
    expect(isOpen).to.equal(true);
  });

  it("considers all points not to be open if one is not open", () => {
    const pointsToAdd = [new Point(0, 0), new Point(0, 1)];
    board.add(1, pointsToAdd);

    const pointsWithOneOpen = [new Point(0, 0), new Point(1, 1)];
    const isOpen = board.isOpen(pointsWithOneOpen);

    expect(isOpen).to.equal(false);
  });

  it("removes completed lines and shifts all others down", () => {
    const pointsToAdd = [];
    for (let i = 0; i < 10; i++) {
      pointsToAdd.push(new Point(i, 19));
    }
    pointsToAdd.push(new Point(0, 18));
    board.add(1, pointsToAdd);

    board.clearWholeLines();

    expect(board.isOpen([new Point(0, 19)])).to.be.false;
    expect(board.isOpen([new Point(1, 19)])).to.be.true;
  });

  it("draws itself using a given Renderer", () => {
    board.add(1, [new Point(0, 0)]);
    const renderer = sinon.createStubInstance(Renderer);

    board.draw(renderer);

    expect(renderer.drawRectangle.called).to.be.true;
  });
});
