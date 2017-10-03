import Point from "./Point";

const [l, ul, u, ur, r, dr, d, dl] = [
  new Point(-1, 0),
  new Point(-1, -1),
  new Point(0, -1),
  new Point(1, -1),
  new Point(1, 0),
  new Point(1, 1),
  new Point(0, 1),
  new Point(-1, 1)
];

const I = {
  name: "I",
  rotations: [
    {
      auxPoints: [l, r, new Point(2, 0)],
      offset: new Point(0, 0)
    },
    {
      auxPoints: [u, d, new Point(0, 2)],
      offset: new Point(1, 0)
    },
    {
      auxPoints: [new Point(-2, 0), l, r],
      offset: new Point(1, 1)
    },
    {
      auxPoints: [new Point(0, -2), u, d],
      offset: new Point(0, 1)
    }
  ],
  spawnPoint: new Point(4, 1),
  colorValue: 1
};

const O = {
  name: "O",
  rotations: [
    {
      auxPoints: [d, dr, r],
      offset: new Point(0, 0)
    }
  ],
  spawnPoint: new Point(4, 0),
  colorValue: 2
};

const T = {
  name: "T",
  rotations: [
    {
      auxPoints: [l, u, r],
      offset: new Point(0, 0)
    },
    {
      auxPoints: [u, r, d],
      offset: new Point(0, 0)
    },
    {
      auxPoints: [r, d, l],
      offset: new Point(0, 0)
    },
    {
      auxPoints: [d, l, u],
      offset: new Point(0, 0)
    }
  ],
  spawnPoint: new Point(4, 1),
  colorValue: 3
};

const S = {
  name: "S",
  rotations: [
    {
      auxPoints: [l, u, ur],
      offset: new Point(0, 0)
    },
    {
      auxPoints: [u, r, dr],
      offset: new Point(0, 0)
    },
    {
      auxPoints: [r, d, dl],
      offset: new Point(0, 0)
    },
    {
      auxPoints: [d, l, ul],
      offset: new Point(0, 0)
    }
  ],
  spawnPoint: new Point(4, 1),
  colorValue: 4
};

const Z = {
  name: "Z",
  rotations: [
    {
      auxPoints: [ul, u, r],
      offset: new Point(0, 0)
    },
    {
      auxPoints: [ur, r, d],
      offset: new Point(0, 0)
    },
    {
      auxPoints: [dr, d, l],
      offset: new Point(0, 0)
    },
    {
      auxPoints: [dl, l, u],
      offset: new Point(0, 0)
    }
  ],
  spawnPoint: new Point(4, 1),
  colorValue: 5
};

const J = {
  name: "J",
  rotations: [
    {
      auxPoints: [l, ul, r],
      offset: new Point(0, 0)
    },
    {
      auxPoints: [u, ur, d],
      offset: new Point(0, 0)
    },
    {
      auxPoints: [r, dr, l],
      offset: new Point(0, 0)
    },
    {
      auxPoints: [d, dl, u],
      offset: new Point(0, 0)
    }
  ],
  spawnPoint: new Point(4, 1),
  colorValue: 6
};

const L = {
  name: "L",
  rotations: [
    {
      auxPoints: [ur, r, l],
      offset: new Point(0, 0)
    },
    {
      auxPoints: [u, dr, d],
      offset: new Point(0, 0)
    },
    {
      auxPoints: [r, dl, l],
      offset: new Point(0, 0)
    },
    {
      auxPoints: [ul, u, d],
      offset: new Point(0, 0)
    }
  ],
  spawnPoint: new Point(4, 1),
  colorValue: 7
};

export default [I, O, T, S, Z, J, L];
