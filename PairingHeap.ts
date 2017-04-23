/// <reference path="Tree.ts" />
/// <reference path="BinaryTree.ts" />
module DataStructures.Tree {
    "use strict";
    export interface IPairingHeapNodeInterface extends IBinaryNodeInterface, IHeapNodeInterface {
        getParent(): IPairingHeapNodeInterface;
        setParent(parent: IPairingHeapNodeInterface): IPairingHeapNodeInterface;

        add(node: IPairingHeapNodeInterface): IPairingHeapNodeInterface;
        compare(node: IPairingHeapNodeInterface): number;
        children(): Array<IPairingHeapNodeInterface>;
        hasChildren(): boolean;
        search(node: IPairingHeapNodeInterface): IPairingHeapNodeInterface;      

        inOrder(items: List<IPairingHeapNodeInterface>): List<IPairingHeapNodeInterface>;
        preOrder(items: List<IPairingHeapNodeInterface>): List<IPairingHeapNodeInterface>;
        postOrder(items: List<IPairingHeapNodeInterface>): List<IPairingHeapNodeInterface>;
        leverOrder(items: List<IPairingHeapNodeInterface>): List<IPairingHeapNodeInterface>;

        getLeft(): IPairingHeapNodeInterface;
        setLeft(left: IPairingHeapNodeInterface): IPairingHeapNodeInterface;
        getRight(): IPairingHeapNodeInterface;
        setRight(right: IPairingHeapNodeInterface): IPairingHeapNodeInterface;

        priority(): number;
    }

    // abstract binary pairing heap node 
    export class AbstractPairingHeapNode extends AbstractBinaryNode implements IPairingHeapNodeInterface {

        public getParent(): IPairingHeapNodeInterface {
            return <IPairingHeapNodeInterface>super.getParent();
        }
        
        public setParent(parent: IPairingHeapNodeInterface): IPairingHeapNodeInterface {
            return <IPairingHeapNodeInterface>super.setParent(parent);
        }
        public getLeft(): IPairingHeapNodeInterface {
            return <IPairingHeapNodeInterface>super.getLeft()
        }
        
        public setLeft(left: IPairingHeapNodeInterface): IPairingHeapNodeInterface {
            return <IPairingHeapNodeInterface>super.setLeft(left);
        }
        
        public getRight(): IPairingHeapNodeInterface {
            return <IPairingHeapNodeInterface>super.getRight();
        }
        
        public setRight(right: IPairingHeapNodeInterface): IPairingHeapNodeInterface {
            return <IPairingHeapNodeInterface>super.setRight(right);
        }
        
        public children(): IPairingHeapNodeInterface[] {
            return <IPairingHeapNodeInterface[]>super.children();
        }

        public priority(): number {
            throw new Error("This method is abstract");
        }

        public compare(node: IPairingHeapNodeInterface): number {
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

        public search(node: IPairingHeapNodeInterface): IPairingHeapNodeInterface {
            return <IPairingHeapNodeInterface>super.search(<IPairingHeapNodeInterface>node);
        }

        public inOrder(items: List<IPairingHeapNodeInterface>): List<IPairingHeapNodeInterface> {
            return <List<IPairingHeapNodeInterface>>super.inOrder(items);
        }

        public preOrder(items: List<IPairingHeapNodeInterface>): List<IPairingHeapNodeInterface> {
            return <List<IPairingHeapNodeInterface>>super.preOrder(items);
        }

        public postOrder(items: List<IPairingHeapNodeInterface>): List<IPairingHeapNodeInterface> {
            return <List<IPairingHeapNodeInterface>>super.postOrder(items);
        }

        public leverOrder(items: List<IPairingHeapNodeInterface>): List<IPairingHeapNodeInterface> {
            return <List<IPairingHeapNodeInterface>>super.leverOrder(items);
        }

        // return the minimal node of tree
        // swap children of nodes to  preserve the tree
        // right subtree of rootnode is always empty in binary paring heap
        public add(node: IPairingHeapNodeInterface): IPairingHeapNodeInterface {
            var minNode: IPairingHeapNodeInterface = null;
            var min_left: IPairingHeapNodeInterface = null;
            if (this.compare(node) > 0) {  // node < this (node is less than this)
                min_left = <IPairingHeapNodeInterface>node.getLeft(); // store node.left subtree
                node.setLeft(this); // this is node.left subtree
                this.setRight(min_left); // this.right subtree is node.left previous subtree
                this.setParent(node); // set this.parent to  node
                if (min_left !== null) { // if node.left previous subtree is not empty set its parent to this
                    min_left.setParent(this);
                }
                minNode = node;
            } else { // if this is less or equal than  node
                min_left = <IPairingHeapNodeInterface>this.getLeft(); // store this.left subtree
                var max_right: IPairingHeapNodeInterface = <IPairingHeapNodeInterface>node.getRight(); // store node.right subtree
                node.setRight(min_left); // node.right set to  this.left subtree
                this.setLeft(node); // this.left subtree set to node
                this.setRight(max_right); // rhis.right subtree set to node.right previous subtree
                node.setParent(this); // set node parent to this
                if (min_left !== null) { // if this.left previous subtree is not empty set its parent to node
                    min_left.setParent(node);
                }
                if (max_right !== null) { // if node.right previous subtree is not empty set ist parent to this
                    max_right.setParent(this);
                }
                minNode = this;
            }
            return minNode; // return minimal node
        }
    }

    // binary pairing heap implementation
    export class PairingHeap extends BinaryTree implements ITreeInterface {

        constructor() {
            super()
        }

        public getRoot(): IPairingHeapNodeInterface {
            return <IPairingHeapNodeInterface>super.getRoot();
        }

        public setRoot(root: IPairingHeapNodeInterface): PairingHeap  {
            return <PairingHeap>super.setRoot(root);
        }

        public addNode(node: IPairingHeapNodeInterface): PairingHeap {
            return <PairingHeap>super.addNode(node);
        }

        public searchNode(node: IPairingHeapNodeInterface): IPairingHeapNodeInterface {
            return <IPairingHeapNodeInterface>super.searchNode(node);
        }

        public removeNode(node: IPairingHeapNodeInterface): IPairingHeapNodeInterface {
            return <IPairingHeapNodeInterface>super.removeNode(node);
        }

        public removeMinPriority(): IPairingHeapNodeInterface {
            var result: IPairingHeapNodeInterface = this.getRoot(); // persist old root
            if (this.getRoot() !== null) {
                this.setRoot(result.getLeft());
                if (this.getRoot() !== null) {
                    while (this.getRoot().getRight() !== null) {
                        this.setRoot(this.getRoot().add(this.getRoot().getRight()));
                    }
                    this.getRoot().setParent(null);
                }
            }
            return result; // return old root with lowest priority
        }
    }
}