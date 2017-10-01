class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(x, y) {
    return new Point(this.x + x, this.y + y);
  }
}

export default Point;
