class BSTNode {
  constructor({ key, value, parent, left, right }) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = left;
    this.right = right;
  }
}

export class BinarySearchTree {
  constructor(Node = BSTNode) {
    this.Node = Node;
    this._count = 0;
    this._root = undefined;
  }

  _insertInternal(key, value = true) {
    const results = this._findNode(key);
    let { node } = results;
    const { parent } = results;

    if (node?.key) {
      // key already in the tree, replace the value
      node.value = value;
    } else {
      // new node
      node = new this.Node({ key, value, parent });
      this._count += 1;

      if (parent?.key) {
        if (key < parent.key) {
          parent.left = node;
        } else {
          parent.right = node;
        }
      } else {
        this._root = node;
      }
    }
    return node;
  }

  insert(key, value) {
    // same as insertInternal, but doesn't return the node to preserve encapsulation
    this._insertInternal(key, value);
  }

  _findNode(key) {
    // Returns {node, parent}, either of which may be undefined
    // Node undefined means the key isn't in the tree
    // Parent undefined means node is the root
    let node = this._root;
    let parent = node?.parent;

    // nodes without keys are sentinels
    while (node && node.key !== undefined) {
      if (key < node.key) {
        parent = node;
        node = node.left;
      } else if (key > node.key) {
        parent = node;
        node = node.right;
      } else {
        // found the node we are looking for
        break;
      }
    }
    return { node, parent };
  }

  lookup(key) {
    return this._findNode(key).node?.value;
  }

  delete(key) {
    // TODO
  }

  count() {
    return this._count;
  }

  forEach(callback) {
    const visit = (node, callback, i = 0) => {
      if (node?.key) {
        i = visit(node.left, callback, i);
        callback({ key: node.key, value: node.value }, i, this);
        i = visit(node.right, callback, i + 1);
      }
      return i;
    };
    visit(this._root, callback);
  }
}

export default BinarySearchTree;
