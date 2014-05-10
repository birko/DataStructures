/// <reference path="Tree.ts" />
/// <reference path="BinaryTree.ts" />
module DataStructures.Tree {
    "use strict";
    export interface IPairingHeapNodeInterface extends IHeapNodeInterface, IBinaryNodeInterface {
        parent: IPairingHeapNodeInterface;
        left: IPairingHeapNodeInterface;
        right: IPairingHeapNodeInterface;


        addChild(node: IPairingHeapNodeInterface): IPairingHeapNodeInterface;
        children(): Array<IPairingHeapNodeInterface>;
        searchChild(node: IPairingHeapNodeInterface): IPairingHeapNodeInterface;
        priority(): number;
    }

    // abstract binary pairing heap node 
    export class AbstractPairingHeapNode extends AbstractBinaryNode
        implements IPairingHeapNodeInterface, IBinaryNodeInterface, IHeapNodeInterface {
        parent: IPairingHeapNodeInterface;
        left: IPairingHeapNodeInterface;
        right: IPairingHeapNodeInterface;

        children(): Array<IPairingHeapNodeInterface> {
            return Array(this.left, this.right);
        }

        priority(): number {
            throw new Error("This method is abstract");
        }

        compare(node: IPairingHeapNodeInterface): number {
            var thispriority:number = this.priority();
            var nodepriority:number = node.priority();
            if (thispriority === nodepriority) {
                return 0;
            } else if (thispriority < nodepriority) {
                return -1;
            } else {
                return 1;
            }
        }

        searchChild(node: IPairingHeapNodeInterface): IPairingHeapNodeInterface {
            return <IPairingHeapNodeInterface>super.searchChild(<IBinaryNodeInterface>node);
        }

        // return the minimal node of tree
        // swap children of nodes to  preserve the tree
        // right subtree of rootnode is always empty in binary paring heap
        addChild(node: IPairingHeapNodeInterface): IPairingHeapNodeInterface {
            var minNode: IPairingHeapNodeInterface = undefined;
            var min_left: IPairingHeapNodeInterface = undefined;
            if (this.compare(node) > 0) {  // node < this (node is less than this)
                min_left = node.left; // store node.left subtree
                node.left = this; // this is node.left subtree
                this.right = min_left; // this.right subtree is node.left previous subtree
                this.parent = node; // set this.parent to  node
                if (min_left !== undefined) { // if node.left previous subtree is not empty set its parent to this
                    min_left.parent = this;
                }
                minNode = node;
            } else { // if this is less or equal than  node
                min_left = this.left; // store this.left subtree
                var max_right:IPairingHeapNodeInterface = node.right; // store node.right subtree
                node.right = min_left; // node.right set to  this.left subtree
                this.left = node; // this.left subtree set to node
                this.right = max_right; // rhis.right subtree set to node.right previous subtree
                node.parent = this; // set node parent to this
                if (min_left !== undefined) { // if this.left previous subtree is not empty set its parent to node
                    min_left.parent = node;
                }
                if (max_right !== undefined) { // if node.right previous subtree is not empty set ist parent to this
                    max_right.parent = this;
                }
                minNode = this;
            }
            return minNode; // return minimal node
        }
    }

    // binary pairing heap implementation
    export class PairingHeap implements ITreeInterface {
        root: IPairingHeapNodeInterface;

        constructor() {
            this.root = undefined;
        }

        addNode(node: IPairingHeapNodeInterface): ITreeInterface {
            if (this.root !== undefined) {
                this.root = this.root.addChild(node);
            } else {
                this.root = node;
            }
            return this;
        }

        removeNode(node: IPairingHeapNodeInterface): IPairingHeapNodeInterface {
            var removeNode: IPairingHeapNodeInterface = this.searchNode(node);
            var children: Array<IPairingHeapNodeInterface> = removeNode.children();
            var nodeLeft: IPairingHeapNodeInterface = children[0];
            var nodeRight: IPairingHeapNodeInterface = children[1];
            nodeLeft.parent = removeNode.parent;
            nodeLeft.addChild(nodeRight);
            return removeNode;
        }

        searchNode(node: IPairingHeapNodeInterface): IPairingHeapNodeInterface {
            if (this.root !== undefined) {
                return this.root.searchChild(node);
            }
            return undefined;
        }

        removeMinPriority(): IPairingHeapNodeInterface {
            var result: IPairingHeapNodeInterface = this.root; // persist old root
            if (this.root !== undefined) {
                this.root = result.left;
                if (this.root !== undefined) {
                    while (this.root.right !== undefined) {
                        this.root = this.root.addChild(this.root.right);
                    }
                    this.root.parent = undefined;
                }
            }
            return result; // return old root with lowest priority
        }

        inOrder(): Array<INodeInterface> {
            var result: Array<INodeInterface> = new Array();
            if (this.root !== undefined) {
                result = this.root.inOrder(result);
            }
            return result;
        }

        preOrder(): Array<INodeInterface> {
            var result: Array<INodeInterface> = new Array();
            if (this.root !== undefined) {
                result = this.root.preOrder(result);
            }
            return result;
        }

        postOrder(): Array<INodeInterface> {
            var result: Array<INodeInterface> = new Array();
            if (this.root !== undefined) {
                result = this.root.postOrder(result);
            }
            return result;
        }
    }
}