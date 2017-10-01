import { expect } from "chai";
import sinon from "sinon";
import Renderer from "../src/Renderer";

describe("Renderer", () => {
  const context = {
    clearRect: sinon.spy(),
    fillRect: sinon.spy(),
    fillText: sinon.spy()
  };

  const width = 100;
  const height = 200;

  const renderer = new Renderer(100, 200, context);

  it("clears the entire screen", () => {
    renderer.clearScreen();
    expect(context.clearRect.calledWith(0, 0, width, height)).to.be.true;
  });

  it("draws a rectangle given a location and size", () => {
    renderer.drawRectangle("red", 10, 15, 20, 25);
    expect(context.fillStyle).to.equal("red");
    expect(context.fillRect.calledWith(10, 15, 20, 25)).to.be.true;
  });

  it("draws text given a string and a location", () => {
    renderer.drawText("hello world", 10, 15);
    expect(context.fillText.calledWith("hello world", 10, 15)).to.be.true;
  });
});
