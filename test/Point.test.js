import { expect } from "chai";
import Point from "../src/Point";

describe("Point", () => {
  it("has x and y coordinates", () => {
    const point = new Point(1, 2);
    expect(point.x).to.equal(1);
    expect(point.y).to.equal(2);
  });

  it("can create a new point with an offset", () => {
    const point = new Point(1, 2);
    const offsetPoint = point.add(1, -2);
    expect(offsetPoint).to.not.equal(point);
    expect(offsetPoint.x).to.equal(2);
    expect(offsetPoint.y).to.equal(0);
  });
});
