var DataStructures;
(function (DataStructures) {
    /// <reference path="Tree.ts" />
    (function (Tree) {
        "use strict";

        var AbstractBinaryNode = (function () {
            function AbstractBinaryNode() {
            }
            AbstractBinaryNode.prototype.children = function () {
                return Array(this.left, this.right);
            };

            AbstractBinaryNode.prototype.compare = function (node) {
                throw new Error("This method is abstract");
            };

            AbstractBinaryNode.prototype.addChild = function (node) {
                if (this.compare(node) > 0) {
                    if (this.left === undefined) {
                        node.parent = this;
                        this.left = node;
                        return node;
                    } else {
                        return this.left.addChild(node);
                    }
                } else {
                    if (this.right === undefined) {
                        node.parent = this;
                        this.right = node;
                        return node;
                    } else {
                        return this.right.addChild(node);
                    }
                }
            };

            AbstractBinaryNode.prototype.searchChild = function (node) {
                var test = this.compare(node);
                if (test === 0) {
                    return this;
                } else if (test < 0) {
                    return this.left.searchChild(node);
                } else {
                    return this.right.searchChild(node);
                }
            };

            AbstractBinaryNode.prototype.inOrder = function (items) {
                if (this.left !== undefined) {
                    items = this.left.inOrder(items);
                }
                items.push(this);
                if (this.right !== undefined) {
                    items = this.right.inOrder(items);
                }
                return items;
            };

            AbstractBinaryNode.prototype.preOrder = function (items) {
                items.push(this);
                if (this.left !== undefined) {
                    items = this.left.inOrder(items);
                }
                if (this.right !== undefined) {
                    items = this.right.inOrder(items);
                }
                return items;
            };

            AbstractBinaryNode.prototype.postOrder = function (items) {
                if (this.left !== undefined) {
                    items = this.left.inOrder(items);
                }
                if (this.right !== undefined) {
                    items = this.right.inOrder(items);
                }
                items.push(this);
                return items;
            };
            return AbstractBinaryNode;
        })();
        Tree.AbstractBinaryNode = AbstractBinaryNode;

        var BinaryTree = (function () {
            function BinaryTree() {
                this.root = undefined;
            }
            BinaryTree.prototype.addNode = function (node) {
                if (this.root === undefined) {
                    this.root = node;
                } else {
                    this.root.addChild(node);
                }
                return this;
            };

            BinaryTree.prototype.removeNode = function (node) {
                var removeNode = this.searchNode(node);
                var children = removeNode.children();
                var nodeLeft = children[0];
                var nodeRight = children[1];
                nodeLeft.parent = removeNode.parent;
                nodeLeft.addChild(nodeRight);
                return removeNode;
            };

            BinaryTree.prototype.searchNode = function (node) {
                if (this.root !== undefined) {
                    return this.root.searchChild(node);
                }
                return undefined;
            };

            BinaryTree.prototype.inOrder = function () {
                var result = new Array();
                if (this.root !== undefined) {
                    result = this.root.inOrder(result);
                }
                return result;
            };

            BinaryTree.prototype.preOrder = function () {
                var result = new Array();
                if (this.root !== undefined) {
                    result = this.root.preOrder(result);
                }
                return result;
            };

            BinaryTree.prototype.postOrder = function () {
                var result = new Array();
                if (this.root !== undefined) {
                    result = this.root.postOrder(result);
                }
                return result;
            };
            return BinaryTree;
        })();
        Tree.BinaryTree = BinaryTree;
    })(DataStructures.Tree || (DataStructures.Tree = {}));
    var Tree = DataStructures.Tree;
})(DataStructures || (DataStructures = {}));
//# sourceMappingURL=BinaryTree.js.map
