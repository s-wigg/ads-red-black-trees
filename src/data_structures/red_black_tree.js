import BinarySearchTree from "./binary_search_tree";

// Exported for the tests :(
export class RBTNode {
  static BLACK = "black";
  static RED = "red";
  static sentinel = Object.freeze({ color: RBTNode.BLACK });

  constructor({
    key,
    value,
    color = RBTNode.RED,
    parent = RBTNode.sentinel,
    left = RBTNode.sentinel,
    right = RBTNode.sentinel,
  }) {
    this.key = key;
    this.value = value;
    this.color = color;
    this.parent = parent;
    this.left = left;
    this.right = right;
  }
}

class RedBlackTree extends BinarySearchTree {
  constructor(Node = RBTNode) {
    super(RBTNode);
  }

  /**
   * The two rotation functions are symmetric, and could presumably
   * be collapsed into one that takes a direction 'left' or 'right',
   * calculates the opposite, and uses [] instead of . to access.
   *
   * Felt too confusing to be worth it. Plus I bet* the JIT optimizes two
   * functions with static lookups better than one with dynamic lookups.
   *
   * (*without any evidence whatsoever, 10 points to anyone who tries it out)
   */
  _rotateLeft(node) {
    const child = node.right;

    if (node === RBTNode.sentinel) {
      throw new Error("Cannot rotate a sentinel node LEFT");
    } else if (child === RBTNode.sentinel) {
      throw new Error("Cannot rotate away from a sentinel node LEFT");
    }

    // turn child's left subtree into node's right subtree
    node.right = child.left;
    if (child.left !== RBTNode.sentinel) {
      child.left.parent = node;
    }

    // link node's parent to child
    child.parent = node.parent;
    if (node === this._root) {
      this._root = child;
    } else if (node === node.parent.left) {
      node.parent.left = child;
    } else {
      node.parent.right = child;
    }

    // put node on child's left
    child.left = node;
    node.parent = child;

    // LOOK AT ME
    // I'M THE PARENT NOW
  }

  _rotateRight(node) {
    const child = node.left;

    if (node === RBTNode.sentinel) {
      throw new Error("Cannot rotate a sentinel node RIGHT");
    } else if (child === RBTNode.sentinel) {
      throw new Error("Cannot rotate away from a sentinel node RIGHT");
    }

    // turn child's right subtree into node's left subtree
    node.left = child.right;
    if (child.right !== RBTNode.sentinel) {
      child.right.parent = node;
    }

    // link node's parent to child
    child.parent = node.parent;
    if (node === this._root) {
      this._root = child;
    } else if (node === node.parent.right) {
      node.parent.right = child;
    } else {
      node.parent.left = child;
    }

    // put node on child's right
    child.right = node;
    node.parent = child;
  }

  _insertRebalance(node) {

    while (node.color === RBTNode.RED && node.parent.color === RBTNode.RED) {
      let grandparent = node.parent?.parent;

      // parent is left child of grandparent
      if (node.parent === grandparent.left) {
        const uncle = grandparent?.right;

        if (uncle.color === RBTNode.RED) {
          uncle.color = RBTNode.BLACK;
          node.parent.color = RBTNode.BLACK;
          grandparent.color = RBTNode.RED;
          node = grandparent;
        } else {
          // uncle is black
          if (node === node.parent.right) {
            // node is the right child of the parent
            node = node.parent;
            this._rotateLeft(node);
          } else {
            // node is the left child of the parent
            node.parent.color = RBTNode.BLACK;
            grandparent.color = RBTNode.RED;
            this._rotateRight(grandparent);
          }
        }
      } else {
        // parent is right child of grandparent
        const uncle = grandparent?.left;

        if (uncle.color === RBTNode.RED) {
          uncle.color = RBTNode.BLACK;
          node.parent.color = RBTNode.BLACK;
          grandparent.color = RBTNode.RED;
          node = grandparent;
        } else {
          // uncle is black
          if (node === node.parent.left) {
            node = node.parent;
            this._rotateRight(node);
          } else {
            // node is the right child of the parent
            node.parent.color = RBTNode.BLACK;
            grandparent.color = RBTNode.RED;
            this._rotateLeft(grandparent);
          }
        }
      }
    }
    return (this._root.color = RBTNode.BLACK);
  }

  insert(key, value) {
    const node = this._insertInternal(key, value);
    this._insertRebalance(node);
  }

  delete(key) {
    // TODO
  }
}

export default RedBlackTree;
