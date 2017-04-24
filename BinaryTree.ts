/// <reference path="Tree.ts" />
/// <reference path="Types.ts" />
module DataStructures.Tree {
    "use strict";
    export interface IBinaryNodeInterface extends INodeInterface {
        getLeft(): IBinaryNodeInterface;
        setLeft(left: IBinaryNodeInterface): IBinaryNodeInterface;
        getRight(): IBinaryNodeInterface;
        setRight(right: IBinaryNodeInterface): IBinaryNodeInterface;

        // extend interface implementations overide
        getParent(): IBinaryNodeInterface;
        setParent(parent: IBinaryNodeInterface): IBinaryNodeInterface;

        add(node: IBinaryNodeInterface): IBinaryNodeInterface;
        remove(node: IBinaryNodeInterface): IBinaryNodeInterface;
        search(node: IBinaryNodeInterface): IBinaryNodeInterface;
        compare(node: IBinaryNodeInterface): number;
        children(): IBinaryNodeInterface[];
        hasChildren(): boolean;

        inOrder(items: List<IBinaryNodeInterface>): List<IBinaryNodeInterface>;
        preOrder(items: List<IBinaryNodeInterface>): List<IBinaryNodeInterface>;
        postOrder(items: List<IBinaryNodeInterface>): List<IBinaryNodeInterface>;
        leverOrder(items: List<IBinaryNodeInterface>): List<IBinaryNodeInterface>;
    }

    export abstract class AbstractBinaryNode extends AbstractNode implements IBinaryNodeInterface {

        public constructor() {
            super();
            this.setDescendants([null, null]);
        }

        public getParent(): IBinaryNodeInterface {
            return <IBinaryNodeInterface>super.getParent();
        }

        public setParent(parent: IBinaryNodeInterface): IBinaryNodeInterface {
            return <IBinaryNodeInterface>super.setParent(parent)
        }

        public getLeft(): IBinaryNodeInterface {
            return <IBinaryNodeInterface>this.getDescendant(0);
        }

        public setLeft(left: IBinaryNodeInterface): IBinaryNodeInterface {
            return <IBinaryNodeInterface>this.setDescendant(0, left);
        }

        public getRight(): IBinaryNodeInterface {
            return <IBinaryNodeInterface>this.getDescendant(1);
        }

        public setRight(right: IBinaryNodeInterface): IBinaryNodeInterface {
            return <IBinaryNodeInterface>this.setDescendant(1, right);
        }

        public children(): IBinaryNodeInterface[] {
            return <IBinaryNodeInterface[]>super.children();
        }

        public compare(node: IBinaryNodeInterface): number {
            return super.compare(node);
        }

        public add(node: IBinaryNodeInterface): IBinaryNodeInterface {
            if (this.compare(node) > 0) { // node < this
                if (this.getLeft() === null) {
                    node.setParent(this);
                    this.setLeft(node);
                    return node;
                } else {
                    return this.getLeft().add(node);
                }
            } else {
                if (this.getRight() === null) {
                    node.setParent(this);
                    this.setRight(node);
                    return node;
                } else {
                    return this.getRight().add(node);
                }
            }
        }

        public search(node: IBinaryNodeInterface): IBinaryNodeInterface {
            var test:number = this.compare(node);
            if (test === 0) {
                return this;
            } else if (test < 0) {
                return this.getLeft().search(node);
            } else {
                return this.getRight().search(node);
            }
        }

        public remove(node: IBinaryNodeInterface): IBinaryNodeInterface {
            //var removeNode: IBinaryNodeInterface = this.search(node);
            //var nodeLeft: IBinaryNodeInterface = removeNode.getLeft();
            //var nodeRight: IBinaryNodeInterface = removeNode.getRight();
            //nodeLeft.setParent(removeNode.getParent());
            //nodeLeft.add(nodeRight);
            //return removeNode;

            return <IBinaryNodeInterface>super.remove(node);
        }

        public inOrder(items: List<IBinaryNodeInterface>): List<IBinaryNodeInterface> {
            return <List<IBinaryNodeInterface>>super.leverOrder(items);
        }

        public preOrder(items: List<IBinaryNodeInterface>): List<IBinaryNodeInterface> {
            return <List<IBinaryNodeInterface>>super.preOrder(items);
        }

        public postOrder(items: List<IBinaryNodeInterface>): List<IBinaryNodeInterface> {
            return <List<IBinaryNodeInterface>>super.postOrder(items);
        }

        public leverOrder(items: List<IBinaryNodeInterface>): List<IBinaryNodeInterface> {
            return <List<IBinaryNodeInterface>>super.leverOrder(items);
        }
    }

    export class BinaryTree extends AbstractTree implements ITreeInterface, IBinaryNodeInterface {
        constructor() {
            super();
        }

        ///interface implementation and parent typing ovveride
        public getLeft(): IBinaryNodeInterface {
            if (this.getRoot() !== null) {
                return this.getRoot().getLeft();
            }
            return null;
        }

        public setLeft(node: IBinaryNodeInterface): BinaryTree {
            if (this.getRoot() !== null) {
                this.getRoot().setLeft(node);
            }

            return this;
        }

        public getRight(): IBinaryNodeInterface {
            if (this.getRoot() !== null) {
                return this.getRoot().getRight();
            }
            return null;
        }

        public setRight(node: IBinaryNodeInterface): BinaryTree {
            if (this.getRoot() !== null) {
                this.getRoot().setRight(node);
            }

            return this;
        }

        public getParent(): IBinaryNodeInterface {
            return <IBinaryNodeInterface>super.getParent();
        }

        public setParent(node: IBinaryNodeInterface): BinaryTree {
            return <BinaryTree>super.setParent(node);
        }

        public getRoot(): IBinaryNodeInterface {
            return <IBinaryNodeInterface>super.getRoot();
        }

        public setRoot(root: IBinaryNodeInterface, clearParent: boolean = true): BinaryTree {
            return <BinaryTree>super.setRoot(root, clearParent);
        }

        public add(node: IBinaryNodeInterface): BinaryTree {
            return <BinaryTree>super.add(node);
        }

        public remove(node: IBinaryNodeInterface): IBinaryNodeInterface {
            return <IBinaryNodeInterface>super.remove(node);
        }

        public search(node: IBinaryNodeInterface): IBinaryNodeInterface {
            return <IBinaryNodeInterface>super.search(node);
        }

        public children(): IBinaryNodeInterface[] {
            return <IBinaryNodeInterface[]>super.children();
        }

        public inOrder(result: List<IBinaryNodeInterface>): List<IBinaryNodeInterface> {
            return <List<IBinaryNodeInterface>>super.inOrder(result);
        }

        public preOrder(result: List<IBinaryNodeInterface>): List<IBinaryNodeInterface> {
            return <List<IBinaryNodeInterface>>super.preOrder(result);
        }

        public postOrder(result: List<IBinaryNodeInterface>): List<IBinaryNodeInterface> {
            return <List<IBinaryNodeInterface>>super.postOrder(result);
        }

        public leverOrder(result: List<IBinaryNodeInterface>): List<IBinaryNodeInterface> {
            return <List<IBinaryNodeInterface>>super.leverOrder(result);
        }
    }
}