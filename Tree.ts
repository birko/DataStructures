module DataStructures.Tree {
    "use strict";
    export interface INodeInterface {
        getParent(): INodeInterface;
        setParent(parent: INodeInterface): INodeInterface;

        add(node: INodeInterface): INodeInterface;
        compare(node: INodeInterface): number;
        children(): INodeInterface[];
        hasChildren(): boolean;
        search(node: INodeInterface): INodeInterface;

        inOrder(items: List<INodeInterface>): List<INodeInterface>;
        preOrder(items: List<INodeInterface>): List<INodeInterface>;
        postOrder(items: List<INodeInterface>): List<INodeInterface>;
        leverOrder(items: List<INodeInterface>): List<INodeInterface>;
    }

    export interface IHeapNodeInterface extends INodeInterface {
        priority(): number;
    }

    export interface ITreeInterface {
        getRoot(): INodeInterface;
        setRoot(parent: INodeInterface): ITreeInterface;
        addNode(node: INodeInterface): ITreeInterface;
        removeNode(node: INodeInterface): INodeInterface;
        searchNode(node: INodeInterface): INodeInterface;

        inOrder(): List<INodeInterface>;
        preOrder(): List<INodeInterface>;
        postOrder(): List<INodeInterface>;
        leverOrder(): List<INodeInterface>;
    }

    export class AbstractNode implements INodeInterface {
        private parent: INodeInterface = null;

        public getParent(): INodeInterface {
            return this.parent;
        }

        public setParent(parent: INodeInterface): INodeInterface {
            this.parent = parent;
            return this;
        }

        public compare(node: INodeInterface): number {
            /*
               -1: this is less than node
                0: this is equal node
                1: this is greather than node
            */
            throw new Error("Abstract method must be implemnted");
        }

       public add(node: INodeInterface): INodeInterface {
            throw new Error("Abstract method must be implemnted");
        }

        public children(): INodeInterface[] {
            throw new Error("Abstract method must be implemnted");
        }

        public search(node: INodeInterface): INodeInterface {
            throw new Error("Abstract method must be implemnted");
        }

        public hasChildren(): boolean {
            var children = this.children();
            return (children !== null && children !== undefined && children.length > 0);
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

    export class AbstractTree implements ITreeInterface {
        private root: INodeInterface = null;

        constructor() {
            this.setRoot(null);
        }

        public getRoot(): INodeInterface {
            return this.root;
        }

        public setRoot(root: INodeInterface) : AbstractTree {
            this.root = root;
            return this;
        }

        public addNode(node: INodeInterface): AbstractTree {
            if (this.getRoot() === null) {
                this.setRoot(node);
            } else {
                this.getRoot().add(node);
            }
            return this;
        }

        public searchNode(node: INodeInterface): INodeInterface {
            if (this.getRoot() !== null) {
                return this.getRoot().search(node);
            }
            return null;
        }

        public removeNode(node: INodeInterface): INodeInterface {
            throw new Error("Abstract method must be implemnted");
        }

        public inOrder(): List <INodeInterface> {
            var result: List<INodeInterface> = new List<INodeInterface>();
            if(this.getRoot() !== null) {
                result = this.getRoot().inOrder(result);
            }
            return result;
        }

        public preOrder(): List<INodeInterface> {
            var result: List<INodeInterface> = new List<INodeInterface>();
            if(this.getRoot() !== null) {
                result = this.getRoot().preOrder(result);
            }
            return result;
        }

        public postOrder(): List<INodeInterface> {
            var result: List<INodeInterface> = new List<INodeInterface>();
            if(this.getRoot() !== null) {
                result = this.getRoot().postOrder(result);
            }
            return result;
        }

        public leverOrder(): List<INodeInterface> {
            var result: List<INodeInterface> = new List<INodeInterface>();
            if(this.getRoot() !== null) {
                result = this.getRoot().leverOrder(result);
            }
            return result;
        }
    }
}