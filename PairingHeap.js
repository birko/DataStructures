var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var DataStructures;
(function (DataStructures) {
    /// <reference path="Tree.ts" />
    /// <reference path="BinaryTree.ts" />
    (function (Tree) {
        "use strict";

        // abstract binary pairing heap node
        var AbstractPairingHeapNode = (function (_super) {
            __extends(AbstractPairingHeapNode, _super);
            function AbstractPairingHeapNode() {
                _super.apply(this, arguments);
            }
            AbstractPairingHeapNode.prototype.children = function () {
                return Array(this.left, this.right);
            };

            AbstractPairingHeapNode.prototype.priority = function () {
                throw new Error("This method is abstract");
            };

            AbstractPairingHeapNode.prototype.compare = function (node) {
                var thispriority = this.priority();
                var nodepriority = node.priority();
                if (thispriority === nodepriority) {
                    return 0;
                } else if (thispriority < nodepriority) {
                    return -1;
                } else {
                    return 1;
                }
            };

            AbstractPairingHeapNode.prototype.searchChild = function (node) {
                return _super.prototype.searchChild.call(this, node);
            };

            // return the minimal node of tree
            // swap children of nodes to  preserve the tree
            // right subtree of rootnode is always empty in binary paring heap
            AbstractPairingHeapNode.prototype.addChild = function (node) {
                var minNode = undefined;
                var min_left = undefined;
                if (this.compare(node) > 0) {
                    min_left = node.left; // store node.left subtree
                    node.left = this; // this is node.left subtree
                    this.right = min_left; // this.right subtree is node.left previous subtree
                    this.parent = node; // set this.parent to  node
                    if (min_left !== undefined) {
                        min_left.parent = this;
                    }
                    minNode = node;
                } else {
                    min_left = this.left; // store this.left subtree
                    var max_right = node.right;
                    node.right = min_left; // node.right set to  this.left subtree
                    this.left = node; // this.left subtree set to node
                    this.right = max_right; // rhis.right subtree set to node.right previous subtree
                    node.parent = this; // set node parent to this
                    if (min_left !== undefined) {
                        min_left.parent = node;
                    }
                    if (max_right !== undefined) {
                        max_right.parent = this;
                    }
                    minNode = this;
                }
                return minNode;
            };
            return AbstractPairingHeapNode;
        })(Tree.AbstractBinaryNode);
        Tree.AbstractPairingHeapNode = AbstractPairingHeapNode;

        // binary pairing heap implementation
        var PairingHeap = (function () {
            function PairingHeap() {
                this.root = undefined;
            }
            PairingHeap.prototype.addNode = function (node) {
                if (this.root !== undefined) {
                    this.root = this.root.addChild(node);
                } else {
                    this.root = node;
                }
                return this;
            };

            PairingHeap.prototype.removeNode = function (node) {
                var removeNode = this.searchNode(node);
                var children = removeNode.children();
                var nodeLeft = children[0];
                var nodeRight = children[1];
                nodeLeft.parent = removeNode.parent;
                nodeLeft.addChild(nodeRight);
                return removeNode;
            };

            PairingHeap.prototype.searchNode = function (node) {
                if (this.root !== undefined) {
                    return this.root.searchChild(node);
                }
                return undefined;
            };

            PairingHeap.prototype.removeMinPriority = function () {
                var result = this.root;
                if (this.root !== undefined) {
                    this.root = result.left;
                    if (this.root !== undefined) {
                        while (this.root.right !== undefined) {
                            this.root = this.root.addChild(this.root.right);
                        }
                        this.root.parent = undefined;
                    }
                }
                return result;
            };

            PairingHeap.prototype.inOrder = function () {
                var result = new Array();
                if (this.root !== undefined) {
                    result = this.root.inOrder(result);
                }
                return result;
            };

            PairingHeap.prototype.preOrder = function () {
                var result = new Array();
                if (this.root !== undefined) {
                    result = this.root.preOrder(result);
                }
                return result;
            };

            PairingHeap.prototype.postOrder = function () {
                var result = new Array();
                if (this.root !== undefined) {
                    result = this.root.postOrder(result);
                }
                return result;
            };
            return PairingHeap;
        })();
        Tree.PairingHeap = PairingHeap;
    })(DataStructures.Tree || (DataStructures.Tree = {}));
    var Tree = DataStructures.Tree;
})(DataStructures || (DataStructures = {}));
//# sourceMappingURL=PairingHeap.js.map
