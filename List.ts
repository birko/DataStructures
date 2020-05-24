module DataStructures {
    "use strict";

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
}