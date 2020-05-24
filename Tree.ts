/// <reference path="Types.ts" />
module DataStructures.Tree {
    "use strict";
    export interface INodeInterface extends IComparable {
        getParent(): INodeInterface;
        setParent(parent: INodeInterface): INodeInterface;

        add(node: INodeInterface): INodeInterface;
        remove(node: INodeInterface): INodeInterface;
        search(node: INodeInterface): INodeInterface;
        compare(node: INodeInterface): number;
        children(): INodeInterface[];
        hasChildren(): boolean;

        inOrder(items: List<INodeInterface>): List<INodeInterface>;
        preOrder(items: List<INodeInterface>): List<INodeInterface>;
        postOrder(items: List<INodeInterface>): List<INodeInterface>;
        leverOrder(items: List<INodeInterface>): List<INodeInterface>;
    }

    export abstract class AbstractNode implements INodeInterface {
        private parent: INodeInterface = null;
        private descendants: List<INodeInterface> = null;

        public constructor() {
        }

        public getParent(): INodeInterface {
            return this.parent;
        }

        public setParent(parent: INodeInterface): INodeInterface {
            this.parent = parent;
            return this;
        }

        public compare(node: INodeInterface): number {
            /*
               -1: this is less than parameter node
                0: this is equal parameter node
                1: this is greather than parameter node
            */
            if (node !== null) {
                throw new Error("Comparasion must be implemented");
            }
            return 1;
        }

        public add(node: INodeInterface): INodeInterface {
            if (node !== null) {
                node.setParent(this);
                var children = this.children();
                var length = children.length;
                var add: boolean = false;
                for (var i: number; i < length; i++) {
                    if (children[i] !== null && node.compare(children[i]) < 0) {
                        this.getDescendants().add(i, node);
                        add = true;
                        break;
                    }
                }
                if (!add) {
                    this.getDescendants().addLast(node);
                }
            }
            return this;
        }

        public children(): INodeInterface[] {
            return this.getDescendants().getValues();
        }

        public getDescendants(): List<INodeInterface> {
            if (this.descendants === null || this.descendants === undefined) {
                this.descendants = new List<INodeInterface>()
            }
            return this.descendants;
        }

        public setDescendants(children: INodeInterface[]): INodeInterface {
            this.getDescendants().clear();
            this.getDescendants().addRange(children);
            return this;
        }

        public setDescendant(index: number, node: INodeInterface): INodeInterface {
            this.getDescendants().set(index, node);
            return this;
        }

        public getDescendant(index: number): INodeInterface {
            return this.getDescendants().get(index);
        }

        public remove(node: INodeInterface): INodeInterface {
            if (node !== null) {
                var removeNode: INodeInterface = this.search(node);
                var child: INodeInterface = null;
                var children = removeNode.children();
                var length = children.length;
                for (var i: number; i < length; i++) {
                    if (children[i] !== null) {
                        child = children[i];
                        children.splice(i, 1);
                        break;
                    }
                }
                child.setParent(removeNode.getParent());
                length = children.length;
                for (var i: number; i < length; i++) {
                    if (children[i] !== null) {
                        child.add(children[i]);
                    }
                }
                return removeNode;
            }
        }

        public search(node: INodeInterface): INodeInterface {
            if (node !== null) {
                var test: number = this.compare(node);
                if (test === 0) {
                    return this;
                } else {
                    var values = this.children();
                    for (var i: number = 0; i < values.length; i++) {
                        var value = values[1];
                        var testnode = value.search(node);
                        if (testnode != null) {
                            return testnode;
                        }
                    }
                    return null;
                }
            }
            return null;
        }

        public hasChildren(): boolean {
            return this.getDescendants().hasValues();
        }

        public inOrder(items: List<INodeInterface>): List<INodeInterface> {
            var children = this.children();
            var length = (this.hasChildren()) ? children.length : 0;
            var half = Math.floor(length / 2);
            if (length > 0) {
                for (var i: number = 0; i < half; i++) {
                    var value = children[i];
                    if (value !== null && value !== undefined) {
                        items = value.inOrder(items);
                    }
                }
            }
            items.addLast(this);
            if (length > half) {
                for (var i: number = half; i <length; i++) {
                    var value = children[i];
                    if (value !== null && value !== undefined) {
                        items = value.inOrder(items);
                    }
                }
            }
            return items;
        }

        public preOrder(items: List<INodeInterface>): List<INodeInterface> {
            items.addLast(this);
            this.children().forEach((value: INodeInterface) => {
                if (value !== null && value !== undefined) {
                    items = value.inOrder(items);
                }
            });
            return items;
        }

        public postOrder(items: List<INodeInterface>): List<INodeInterface> {
            this.children().forEach((value: INodeInterface) => {
                if (value !== null && value !== undefined) {
                    items = value.inOrder(items);
                }
            });
            items.addLast(this);
            return items;
        }

        public leverOrder(items: List<INodeInterface>): List<INodeInterface> {
            var list = new List<INodeInterface>();
            list.addLast(this);
            while (list.getLength() > 0) {
                var values = list.getValues();
                list = new List<INodeInterface>();
                values.forEach((value: INodeInterface) => {
                    if (value !== null && value !== undefined) {
                        items.addLast(value);
                        list.addRange(value.children());
                    }
                });
            }
            return items;
        }
    }

    export interface ITreeInterface extends INodeInterface {
        getRoot(): INodeInterface;
        setRoot(node: INodeInterface, clearParent: boolean): ITreeInterface;
        // extend interface implementations overide
        getParent(): INodeInterface;
        setParent(parent: INodeInterface): INodeInterface;

        add(node: INodeInterface): ITreeInterface;
        remove(node: INodeInterface): INodeInterface;
        search(node: INodeInterface): INodeInterface;
        compare(node: INodeInterface): number;
        children(): INodeInterface[];
        hasChildren(): boolean;

        inOrder(items: List<INodeInterface>): List<INodeInterface>;
        preOrder(items: List<INodeInterface>): List<INodeInterface>;
        postOrder(items: List<INodeInterface>): List<INodeInterface>;
        leverOrder(items: List<INodeInterface>): List<INodeInterface>;
    }

    export abstract class AbstractTree implements ITreeInterface {
        private root: INodeInterface = null;

        constructor() {
            this.setRoot(null);
        }

        public getRoot(): INodeInterface {
            return this.root;
        }

        public setRoot(node: INodeInterface, clearParent: boolean = true): AbstractTree {
            if (node !== null && clearParent) {
                node.setParent(null);
            }
            this.root = node;
            return this;
        }

        public getParent(): INodeInterface {
            if (this.getRoot() !== null) {
                return this.getRoot().getParent();
            }
            return null;
        }

        public setParent(node: INodeInterface): AbstractTree {
            if (this.getRoot() !== null) {
                this.getRoot().setParent(node);
            }

            return this;
        }

        public add(node: INodeInterface): AbstractTree {
            if (this.getRoot() === null) {
                this.setRoot(node);
            } else {
                this.getRoot().add(node);
            }
            return this;
        }

        public search(node: INodeInterface): INodeInterface {
            if (this.getRoot() !== null) {
                return this.getRoot().search(node);
            }
            return null;
        }

        public remove(node: INodeInterface): INodeInterface {
            var removeNode: INodeInterface = null
            if (this.getRoot() !== null && node !== null) {
                if (this.getRoot().compare(node) == 0) {
                    removeNode = this.getRoot();
                    var child: INodeInterface = null;
                    var children = removeNode.children();
                    var length = children.length;
                    for (var i: number; i < length; i++) {
                        if (children[i] !== null) {
                            child = children[i];
                            children.splice(i, 1);
                            break;
                        }
                    }
                    this.setRoot(child);
                    if (this.getRoot() !== null) {
                        length = children.length;
                        for (var i: number; i < length; i++) {
                            if (children[i] !== null) {
                                this.getRoot().add(children[i]);
                            }
                        }
                    }
                } else {
                    removeNode = this.getRoot().remove(node);
                }
            }

            return removeNode;
        }

        public compare(node: INodeInterface): number {
            if (this.getRoot() !== null) {
                return this.getRoot().compare(node);
            }
            return -1;
        }

        public children(): INodeInterface[] {
            if (this.getRoot() !== null) {
                return this.getRoot().children();
            }
            return null;
        }

        public hasChildren() {
            if (this.getRoot() !== null) {
                return this.getRoot().hasChildren();
            }
            return false;
        }

        public inOrder(result: List<INodeInterface>): List<INodeInterface> {
            if (result === null) {
                result  = new List<INodeInterface>();
            }
            if(this.getRoot() !== null) {
                result = this.getRoot().inOrder(result);
            }
            return result;
        }

        public preOrder(result: List<INodeInterface>): List<INodeInterface> {
            if (result === null) {
                result = new List<INodeInterface>();
            }
            if(this.getRoot() !== null) {
                result = this.getRoot().preOrder(result);
            }
            return result;
        }

        public postOrder(result: List<INodeInterface>): List<INodeInterface> {
            if (result === null) {
                result = new List<INodeInterface>();
            }
            if(this.getRoot() !== null) {
                result = this.getRoot().postOrder(result);
            }
            return result;
        }

        public leverOrder(result: List<INodeInterface>): List<INodeInterface> {
            if (result === null) {
                result = new List<INodeInterface>();
            }
            if(this.getRoot() !== null) {
                result = this.getRoot().leverOrder(result);
            }
            return result;
        }
    }
}