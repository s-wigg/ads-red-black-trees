# Red-Black Trees

Ada Developers Academy / Lovelace Learning Labs

Advanced Data Structures 1 - Trees

Week 3

## Instructions

Since red-black trees are a special type of binary search tree, we'll reuse the binary search tree tests from last week's lab. That means that this week's lab has a bit of a weird setup process.

### Option 1: start over with a new repo

This option is simpler, but involves juggling multiple repos with similar file structures. Recommended if you're less comfortable with git.

Download

```sh
$ git clone <paste-url>
$ cd <created-directory>
```

Install

```sh
$ npm install
```

Run tests in watch mode

```sh
$ npm test
```

### Option 2: merge stubs into your existing binary search tree repo

The advantage here is that it's easier to build on your existing binary search tree code, and you don't need to juggle multiple directories. The disadvantage is that the git setup is a fair bit more complex.

```sh
# cd into your lab repo from last week
$ cd <path>/ads-binary-search-trees

# Check out a new branch for this week's work
$ git checkout -b red-black-trees

# Add this week's lab as a second remote
$ git remote add rbt https://github.com/Lovelace-Learning-Labs/ads-red-black-trees.git

# Merge this week's lab's code into your branch
$ git fetch rbt
$ git merge rbt/master

# Install additional packages (should be a no-op)
$ npm install

# Run tests as usual
$ npm test
```

## Assignment - Week 2

### Core

1. Read through the existing code in `src/data_structures/binary_search_tree.js` and ensure you understand how it works
1. Implement `BinarySearchTree.insert()` so that it passes the tests
1. Fill out test stubs for `BinarySearchTree.delete()`
1. Implement `BinarySearchTree.delete()` to pass the tests

### Optional

1. Implement a visualization of a user list that relies on a binary search tree