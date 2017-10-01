const keyMapping = {
  37: "left",
  39: "right",
  38: "up",
  40: "down",
  88: "a",
  90: "b"
};

class InputState {
  constructor() {
    this.data = {
      left: false,
      right: false,
      up: false,
      down: false,
      a: false,
      b: false
    };
  }

  keyUp(evt) {
    const cmd = keyMapping[evt.keyCode];
    this.data[cmd] = false;
  }

  keyDown(evt) {
    const cmd = keyMapping[evt.keyCode];
    this.data[cmd] = true;
  }
}

export default InputState;
