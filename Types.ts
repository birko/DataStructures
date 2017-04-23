module DataStructures {
    "use strict";
    export interface IAssocArray<TValue> {
        [index: string]: TValue;
    }

    export class KeyValuePair<TKey, TValue> {
        private key: TKey = null;
        private value: TValue = null;

        public constructor(key: TKey, value: TValue) {
            this
                .setKey(key)
                .setValue(value)
                ;
        }

        public getKey(): TKey {
            return this.key;
        }

        public setKey(key: TKey): KeyValuePair<TKey, TValue> {
            this.key = key;
            return this;
        }

        public getValue(): TValue {
            return this.value;
        }

        public setValue(value: TValue): KeyValuePair<TKey, TValue> {
            this.value = value;
            return this;
        }
    }

    export class List<TValue> {
        private values: TValue[] = [];

        public getValues(): TValue[] {
            if (this.values === undefined || this.values === null) {
                this.clear();
            }
            return this.values;
        }

        public setValues(values: TValue[]): List<TValue> {
            this.values = values;
            return this;
        }

        public clear(): List<TValue> {
            return this.setValues([]);
        }

        public getLength(): number {
            return this.getValues().length;
        }

        public hasValues(): boolean {
            return this.getLength() > 0;
        }

        public indexOf(value: TValue): number {
            return this.getValues().indexOf(value);

        }

        public add(index: number, value: TValue): List<TValue> {
            if (index <= 0) {
               return this.addFirst(value);
            } else if (index > this.getLength()) {
                return this.addLast(value);
            } else {
                this.values.splice(index, 0, value);
                return this;
            }
        }

        public addLast(value: TValue): List<TValue> {
            return this.push(value);
        }

        public addFirst(value: TValue): List<TValue> {
            return this.unshift(value);
        }

        public unshift(value: TValue): List<TValue> {
            this.getValues();
            this.values.unshift(value);
            return this;
        }

        public push(value: TValue): List<TValue> {
            this.getValues();
            this.values.push(value);
            return this;
        }

        public addRange(values: TValue[]): List<TValue> {
            if (values !== null && values !== undefined) {
                values.forEach((value: TValue) => {
                    this.addLast(value);
                });
            }
            return this;
        }

        public get(index: number): TValue {
            if (index >= 0 && index < this.getLength()) {
                return this.values[index];
            }
            return null;
        }

        public set(index: number, value: TValue): List<TValue> {
            if (index >= 0 && index < this.getLength()) {
                this.values[index] = value;
            }
            return this;
        }

        public remove(index: number): List<TValue> {
            if (this.hasValues() && index >= 0 && index < this.getLength()) {
                this.values.splice(index, 1);
            }
            return this;
        }

        public removeFirst() {
            return this.shift();
        }

        public removeLast() {
            return this.pop();
        }

        public shift(): List<TValue> {
            if (this.hasValues()) {
                this.values.shift();
            }
            return this;
        }

        public pop(): List<TValue> {
            if (this.hasValues()) {
                this.values.pop();
            }
            return this;
        }
    }

    export class Dictionary<TKey, TValue> {
        private values: List<TValue> = new List<TValue>();
        private keys: List<TKey> = new List<TKey>()

        public getKeysList(): List<TKey> {
            if (this.keys === undefined || this.keys === null) {
                this.clear();
            }
            return this.keys;
        }

        public getKeys(): TKey[] {
            return this.getKeysList().getValues();
        }

        public getValuesList(): List<TValue> {
            if (this.values === undefined || this.values  === null) {
                this.clear();
            }
            return this.values;
        }

        public getValues(): TValue[] {
            return this.getValuesList().getValues();
        }

        public getItems(): KeyValuePair<TKey, TValue>[] {
            return this.getKeys().map((value: TKey, index: number): KeyValuePair<TKey, TValue> => {
                return new KeyValuePair<TKey, TValue>(value, this.get(value));
            });
        }

        public clear(): Dictionary<TKey, TValue> {
            this.values = new List<TValue>();
            this.keys = new List<TKey>();
            return this;
        }

        public getLength(): number {
            return this.getKeysList().getLength();
        }

        public containsKey(key: TKey): boolean {
            return this.getKeys().indexOf(key) >= 0;
        }

        public set(key: TKey, value: TValue): Dictionary<TKey, TValue> {
            if (!this.containsKey(key)) {
                this.getKeysList().addLast(key);
                this.getValuesList().addLast(value);
            } else {
                var index = this.getKeysList().indexOf(key);
                this.getValuesList().set(index, value);
            }
            return this;
        }

        public get(key: TKey): TValue {
            if (this.containsKey(key)) {
                var index = this.getKeysList().indexOf(key);
                return this.getValuesList().get(index);
            }
            return null;
        }

        public remove(key: TKey): TValue {
            if (this.containsKey(key)) {
                var index = this.getKeysList().indexOf(key);
                var value = this.getValuesList().get(index);
                this.getKeysList().remove(index);
                this.getValuesList().remove(index);
                return value;
            }
            return null;
        }
    }

    export class AbstractFactory<TValue> {
        private data: DataStructures.Dictionary<string, TValue> = new DataStructures.Dictionary<string, TValue>();

        public getData(): DataStructures.Dictionary<string, TValue> {
            if (this.data === null || this.data === undefined) {
                this.clear();
            }
            return this.data;
        }

        public hasData(): boolean {
            return (this.getData().getLength() > 0);
        }

        public getItems(): TValue[] {
            return this.getData().getValues();
        }

        public clear(): AbstractFactory <TValue> {
            this.data = new DataStructures.Dictionary<string, TValue>();
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