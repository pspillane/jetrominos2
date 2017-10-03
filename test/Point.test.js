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
    const offset = new Point(1, -2);
    const result = point.add(offset);
    expect(result).to.not.equal(point);
    expect(result.x).to.equal(2);
    expect(result.y).to.equal(0);
  });

  it("can create a new point with a negative offset", () => {
    const point = new Point(1, 2);
    const offset = new Point(-1, 2);
    const result = point.subtract(offset);
    expect(result).to.not.equal(point);
    expect(result.x).to.equal(2);
    expect(result.y).to.equal(0);
  });
});
