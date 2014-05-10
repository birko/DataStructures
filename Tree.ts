module DataStructures.Tree {
    "use strict";
    export interface INodeInterface {
        parent: INodeInterface;

        addChild(node: INodeInterface): INodeInterface;
        compare(node: INodeInterface): number;
        children(): Array<INodeInterface>;
        searchChild(node: INodeInterface): INodeInterface;

        inOrder(items: Array<INodeInterface>): Array<INodeInterface>;
        preOrder(items: Array<INodeInterface>): Array<INodeInterface>;
        postOrder(items: Array<INodeInterface>): Array<INodeInterface>;
        // leverOrder(items: any[]): any[];
    }

    export interface IHeapNodeInterface extends INodeInterface {
        priority(): number;
    }

    export interface ITreeInterface {
        root: INodeInterface;
        addNode(node: INodeInterface): ITreeInterface;
        removeNode(node: INodeInterface): INodeInterface;
        searchNode(node: INodeInterface): INodeInterface;

        inOrder(): Array<INodeInterface>;
        preOrder(): Array<INodeInterface>;
        postOrder(): Array<INodeInterface>;
        // leverOrder(): any[];
    }
}