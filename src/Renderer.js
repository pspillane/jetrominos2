class Renderer {
  constructor(canvas) {
    this._width = canvas.width;
    this._height = canvas.height;
    this._ctx = canvas.getContext("2d");
  }

  clearScreen() {
    this._ctx.clearRect(0, 0, this._width, this._height);
  }

  drawRectangle(color, x, y, width, height) {
    this._ctx.fillStyle = color;
    this._ctx.fillRect(x, y, width, height);
  }

  drawText(str, x, y) {
    this._ctx.fillStyle = "black";
    this._ctx.font = "12px sans";
    this._ctx.fillText(str, x, y);
  }
}

export default Renderer;
