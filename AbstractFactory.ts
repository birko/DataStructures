/// <reference path="List.ts" />
/// <reference path="Dictionary.ts" />
module DataStructures {
    "use strict";

    export class AbstractFactory<TValue> {
        private data: Dictionary<string, TValue> = new Dictionary<string, TValue>();

        public getData(): Dictionary<string, TValue> {
            if (this.data === null || this.data === undefined) {
                this.clear();
            }
            return this.data;
        }

        public hasData(): boolean {
            return this.getData().getLength() > 0;
        }

        public getItems(): TValue[] {
            return this.getData().getValues();
        }

        public clear(): AbstractFactory <TValue> {
            this.data = new Dictionary<string, TValue>();
            return this;
        }

        public set(name: string, agent: TValue): AbstractFactory<TValue> {
            this.getData().set(name, agent);
            return this;
        }

        public has(name: string): boolean {
            return (this.getData().containsKey(name));
        }

        public get(name: string): TValue {
            return this.getData().get(name);
        }

        public remove(name: string): TValue {
            return this.getData().remove(name);
        }
    }
}