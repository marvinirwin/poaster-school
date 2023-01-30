class DrawTree {
  constructor(tree, parent = null, depth = 0, number = 1) {
    this.x = -1;
    this.y = depth;
    this.tree = tree;
    this.children = tree.children.map((c, i) => new DrawTree(c, this, depth + 1, i + 1));
    this.parent = parent;
    this.thread = null;
    this.offset = 0;
    this.ancestor = this;
    this.change = this.shift = 0;
    this._lmost_sibling = null;
    this.number = number;
  }

  left_brother() {
    let n = null;
    if (this.parent) {
      for (const node of this.parent.children) {
        if (node === this) return n;
        else n = node;
      }
    }
    return n;
  }

  get get_lmost_sibling() {
    if (!this._lmost_sibling && this.parent && this !== this.parent.children[0]) {
      this._lmost_sibling = this.parent.children[0];
    }
    return this._lmost_sibling;
  }
}

function buchheim(tree) {
  const dt = firstwalk(tree);
  const min = second_walk(dt);
  if (min < 0) {
    third_walk(dt, -min);
  }
  return dt;
}

function firstwalk(v, distance = 1) {
  if (v.children.length === 0) {
    if (v.leftmost_sibling) {
      v.x = v.left_brother().x + distance;
    } else {
      v.x = 0;
    }
  } else {
    let default_ancestor = v.children[0];
    for (const w of v.children) {
      firstwalk(w);
      default_ancestor = apportion(w, default_ancestor, distance);
    }
    execute_shifts(v);

    const midpoint = (v.children[0].x + v.children[v.children.length - 1].x) / 2;

    const ell = v.children[0];
    const arr = v.children[v.children.length - 1];
    const w = v.left_brother();
    if (w) {
      v.x = w.x + distance;
      v.mod = v.x - midpoint;
    } else {
      v.x = midpoint;
    }
  }
  return v;
}

function thirdWalk(tree, n) {
  tree.x += n;
  for (let c of tree.children) {
    thirdWalk(c, n);
  }
}
