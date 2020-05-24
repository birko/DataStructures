/// <reference path="List.ts" />
/// <reference path="Dictionary.ts" />
module DataStructures {
    "use strict";

    export interface ISerializeToObject {
        serialize(): any;
        deserialize(object: any): void;
    }

    export interface IComparable {
         /*
            -1: this is less than parameter item
             0: this is equal parameter item
             1: this is greather tparameter item
         */
        compare(item: IComparable): number;
    }

    export interface IAssocArray<TValue> {
        [index: string]: TValue;
    }
}