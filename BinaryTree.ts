/// <reference path="Tree.ts" />
module DataStructures.Tree {
    export interface IBinaryNodeInterface extends INodeInterface {
        parent: IBinaryNodeInterface;
        left: IBinaryNodeInterface;
        right: IBinaryNodeInterface;

        addChild(node: IBinaryNodeInterface): IBinaryNodeInterface;
        children(): Array<IBinaryNodeInterface>;
        searchChild(node: IBinaryNodeInterface): IBinaryNodeInterface;
    }

    export class AbstractBinaryNode implements IBinaryNodeInterface, INodeInterface {
        parent: IBinaryNodeInterface;
        left: IBinaryNodeInterface;
        right: IBinaryNodeInterface;

        children(): Array<IBinaryNodeInterface> {
            return Array(this.left, this.right);
        }

        compare(node: IBinaryNodeInterface): number {
            /*
               -1: this is less than node
                0: this is equal node
                1: this is greather than node
            */
            throw new Error('This method is abstract');
        }

        addChild(node: IBinaryNodeInterface): IBinaryNodeInterface {
            if (this.compare(node) > 0) { //node < this
                if (this.left == undefined) {
                    node.parent = this;
                    this.left = node;
                    return node;
                } else {
                    return this.left.addChild(node);
                }
            } else {
                if (this.right == undefined) {
                    node.parent = this;
                    this.right = node;
                    return node;
                } else {
                    return this.right.addChild(node);
                }
            }
        }

        searchChild(node: IBinaryNodeInterface): IBinaryNodeInterface {
            var test = this.compare(node);
            if (test == 0) {
                return this;
            } else if (test < 0) {
                return this.left.searchChild(node);
            } else {
                return this.right.searchChild(node);
            }
        }

        inOrder(items: Array<INodeInterface>): Array<INodeInterface> {
            if (this.left !== undefined) {
                items = this.left.inOrder(items);
            }
            items.push(this);
            if (this.right !== undefined) {
                items = this.right.inOrder(items);
            }
            return items;
        }

        preOrder(items: Array<INodeInterface>): Array<INodeInterface> {
            items.push(this);
            if (this.left !== undefined) {
                items = this.left.inOrder(items);
            }
            if (this.right !== undefined) {
                items = this.right.inOrder(items);
            }
            return items;
        }

        postOrder(items: Array<INodeInterface>): Array<INodeInterface> {
            if (this.left !== undefined) {
                items = this.left.inOrder(items);
            }
            if (this.right !== undefined) {
                items = this.right.inOrder(items);
            }
            items.push(this);
            return items;
        }
    }

    export class BinaryTree implements ITreeInterface
    {
        root: IBinaryNodeInterface;

        constructor() {
            this.root = undefined;
        }

        addNode(node: IBinaryNodeInterface) {
            if (this.root == undefined) {
                this.root = node;
            } else {
                this.root.addChild(node);
            }
            return this;
        }

        removeNode(node: IBinaryNodeInterface) {
            var removeNode = this.searchNode(node);
            var children = removeNode.children();
            var nodeLeft = children[0];
            var nodeRight = children[1];
            nodeLeft.parent = removeNode.parent;
            nodeLeft.addChild(nodeRight);
            return removeNode;
        }

        searchNode(node: IBinaryNodeInterface) {
            if (this.root !== undefined) {
                return this.root.searchChild(node);
            }
            return undefined;
        }

        inOrder(): Array<INodeInterface> {
            var result = new Array();
            if (this.root !== undefined) {
                result = this.root.inOrder(result);
            }
            return result;
        }

        preOrder(): Array<INodeInterface> {
            var result = new Array();
            if (this.root !== undefined) {
                result = this.root.preOrder(result);
            }
            return result;
        }

        postOrder(): Array<INodeInterface> {
            var result = new Array();
            if (this.root !== undefined) {
                result = this.root.postOrder(result);
            }
            return result;
        }

        /*
        leverOrder(): any[]
        {
            var result = new Array();
            if (this.root !== undefined) {
                result = this.root.leverOrder(result);
            }
            return result;
        }
        */
    }
}