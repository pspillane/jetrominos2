import { expect } from "chai";
import sinon from "sinon";
import InputState from "../src/InputState";
import Renderer from "../src/Renderer";
import GameLoop from "../src/GameLoop";

describe("GameLoop", () => {

  it("starts listening for input and sets an update interval", () => {
    const inputState = sinon.createStubInstance(InputState);
    const renderer = sinon.createStubInstance(Renderer);
    const win = {
      addEventListener: sinon.stub(),
      setInterval: sinon.stub()
    };
    const gameLoop = new GameLoop(inputState, renderer);

    gameLoop.start(win, 30);

    expect(win.addEventListener.called).to.be.true;
    expect(win.setInterval.called).to.be.true;
  });
});
