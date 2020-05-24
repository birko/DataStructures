/// <reference path="List.ts" />
module DataStructures {
    "use strict";

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

        public setItems(items: KeyValuePair<TKey, TValue>[]): Dictionary<TKey, TValue> {
            if (items !== undefined && items !== null && items.length > 0) {
                var length = items.length;
                for (var i: number = 0; i < length; i++) {
                    var item = items[i];
                    if (item != null) {
                        return this.set(item.getKey(), item.getValue());
                    }
                }
            }
            return this;
        }

        public setItem(item: KeyValuePair<TKey, TValue>): Dictionary<TKey, TValue> {
            if (item != null) {
                return this.set(item.getKey(), item.getValue());
            }
            return this;
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
}