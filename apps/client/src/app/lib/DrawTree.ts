//@ts-nocheck
export class DrawTree<T extends { children: T[] }> {
  x: number;
  y: number;
  tree: T;
  children: DrawTree<T>[]
  parent: DrawTree<T> | null
  thread = null;
  offset = 0;
  ancestor = this;
  change: number
  _lmost_sibling = null;
  number: number;

  constructor(tree: T, parent = null, depth = 0, number = 1) {
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
export function buchheim(node) {
  let left = [];
  let right = [];
  if (node.children) {
    node.children.forEach(c => {
      buchheim(c);
      if (c.x < node.x) {
        left.push(c);
      } else {
        right.push(c);
      }
    });
  }
  let mid = (left.length + right.length + 1) / 2;
  node.children = [];
  left.forEach((c, i) => {
    c.y = node.y + 1;
    c.x = node.x - mid + i;
    node.children.push(c);
  });
  node.children.push({ x: node.x, y: node.y + 1 });
  right.forEach((c, i) => {
    c.y = node.y + 1;
    c.x = node.x + mid + i;
    node.children.push(c);
  });
  return node;
}


export function buchheim_old(tree) {
  const dt = firstwalk(tree);
  const min = second_walk(dt);
  if (min < 0) {
    thirdWalk(dt, -min);
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
    let w = v.left_brother();
    if (w) {
      v.x = w.x + distance;
      v.mod = v.x - midpoint;
    } else {
      v.x = midpoint;
    }
  }
  return v;
}

function apportion(v, default_ancestor, distance) {
  var w = v.left_brother();
  if (w !== null) {
    let sor;
    let vor;
    let vir = vor = v;
    let vil = w;
    let vol = v.get_lmost_sibling;
    let sir = sor = v.mod;
    let sil = vil.mod;
    let sol = vol.mod;
    while (vil.right() && vir.left()) {
      vil = vil.right();
      vir = vir.left();
      vol = vol.left();
      vor = vor.right();
      vor.ancestor = v;
      var shift = (vil.x + sil) - (vir.x + sir) + distance;
      if (shift > 0) {
        var a = ancestor(vil, v, default_ancestor);
        move_subtree(a, v, shift);
        sir = sir + shift;
        sor = sor + shift;
      }
      sil += vil.mod;
      sir += vir.mod;
      sol += vol.mod;
      sor += vor.mod;
    }
    if (vil.right() && !vor.right()) {
      vor.thread = vil.right();
      vor.mod += sil - sor;
    } else {
      if (vir.left() && !vol.left()) {
        vol.thread = vir.left();
        vol.mod += sir - sol;
      }
      default_ancestor = v;
    }
  }
  return default_ancestor;
}

function move_subtree(wl, wr, shift) {
  var subtrees = wr.number - wl.number;
  wr.change -= shift / subtrees;
  wr.shift += shift;
  wl.change += shift / subtrees;
  wr.x += shift;
  wr.mod += shift;
}

function execute_shifts(v) {
  var shift = change = 0;
  for (var i = v.children.length - 1; i >= 0; i--) {
    var w = v.children[i];
    w.x += shift;
    w.mod += shift;
    change += w.change;
    shift += w.shift + change;
  }
}

function ancestor(vil, v, default_ancestor) {
  if (vil.ancestor.parent === v.parent) {
    return vil.ancestor;
  } else {
    return default_ancestor;
  }
}

function second_walk(v, m = 0, depth = 0, min = null) {
  v.x += m;
  v.y = depth;
  if (min === null || v.x < min) {
    min = v.x;
  }
  for (var i = 0; i < v.children.length; i++) {
    var w = v.children[i];
    min = second_walk(w, m + v.mod, depth + 1, min);
  }
  return min;
}

function thirdWalk(tree, n) {
  tree.x += n;
  for (let c of tree.children) {
    thirdWalk(c, n);
  }
}


