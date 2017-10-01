import { expect } from "chai";
import InputState from "../src/InputState";

describe("InputState", () => {
  let inputState = null;

  beforeEach(() => {
    inputState = new InputState();
  });

  it("initializes to having no keys being on", () => {
    expect(inputState.data).to.deep.equal({
      up: false,
      down: false,
      left: false,
      right: false,
      a: false,
      b: false
    });
  });

  it("reacts to key presses", () => {
    inputState.keyDown({ keyCode: 37 });
    expect(inputState.data.left).to.be.true;
  });

  it("reacts to key releases", () => {
    inputState.data.left = true;
    inputState.keyUp({ keyCode: 37 });
    expect(inputState.data.left).to.be.false;
  });

  it("does not care about keys it doesn't know about", () => {
    inputState.keyUp({ keyCode: 9999 });
    // expect no error to be thrown
  });
});
