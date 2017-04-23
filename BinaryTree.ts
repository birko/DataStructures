/// <reference path="Tree.ts" />
module DataStructures.Tree {
    "use strict";
    export interface IBinaryNodeInterface extends INodeInterface {
        getParent(): IBinaryNodeInterface;
        setParent(parent: IBinaryNodeInterface): IBinaryNodeInterface;

        add(node: IBinaryNodeInterface): IBinaryNodeInterface;
        compare(node: IBinaryNodeInterface): number;
        children(): IBinaryNodeInterface[];
        hasChildren(): boolean;
        search(node: IBinaryNodeInterface): IBinaryNodeInterface;

        inOrder(items: List<IBinaryNodeInterface>): List<IBinaryNodeInterface>;
        preOrder(items: List<IBinaryNodeInterface>): List<IBinaryNodeInterface>;
        postOrder(items: List<IBinaryNodeInterface>): List<IBinaryNodeInterface>;
        leverOrder(items: List<IBinaryNodeInterface>): List<IBinaryNodeInterface>;

        getLeft(): IBinaryNodeInterface;
        setLeft(left: IBinaryNodeInterface): IBinaryNodeInterface;
        getRight(): IBinaryNodeInterface;
        setRight(right: IBinaryNodeInterface): IBinaryNodeInterface;
    }

    export abstract class AbstractBinaryNode extends AbstractNode implements IBinaryNodeInterface {
       
        private left: IBinaryNodeInterface = null;
        private right: IBinaryNodeInterface = null;

        public getParent(): IBinaryNodeInterface {
            return <IBinaryNodeInterface>super.getParent();
        }

        public setParent(parent: IBinaryNodeInterface): IBinaryNodeInterface {
            return <IBinaryNodeInterface>super.setParent(parent)
        }

        public getLeft(): IBinaryNodeInterface {
            return this.left;
        }

        public setLeft(left: IBinaryNodeInterface): IBinaryNodeInterface {
            this.left = left;
            return this;
        }

        public getRight(): IBinaryNodeInterface {
            return this.right;
        }

        public setRight(right: IBinaryNodeInterface): IBinaryNodeInterface {
            this.right = right;
            return this;
        }

        public children(): IBinaryNodeInterface[] {
            return [this.getLeft(), this.getRight()];
        }

        public compare(node: IBinaryNodeInterface): number {
            /*
               -1: this is less than node
                0: this is equal node
                1: this is greather than node
            */
            throw new Error("This method is abstract");
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

    export class BinaryTree extends AbstractTree implements ITreeInterface {
        constructor() {
            super();
        }

        public getRoot(): IBinaryNodeInterface {
            return <IBinaryNodeInterface>super.getRoot();
        }

        public setRoot(root: IBinaryNodeInterface) : BinaryTree {
            return <BinaryTree>super.setRoot(root);
        }

        public addNode(node: IBinaryNodeInterface): BinaryTree {
            return <BinaryTree>super.addNode(node);
        }

        public removeNode(node: IBinaryNodeInterface): IBinaryNodeInterface {
            var removeNode: IBinaryNodeInterface = this.searchNode(node);
            var children: IBinaryNodeInterface[] = removeNode.children();
            var nodeLeft: IBinaryNodeInterface = children[0];
            var nodeRight: IBinaryNodeInterface = children[1];
            nodeLeft.setParent(removeNode.getParent());
            nodeLeft.add(nodeRight);
            return removeNode;
        }

        public searchNode(node: IBinaryNodeInterface): IBinaryNodeInterface {
            return <IBinaryNodeInterface>super.searchNode(node);
        }
    }
}