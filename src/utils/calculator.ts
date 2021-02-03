import { Calculator } from './calc';

class Calculator2 {
  val!: number;

  toString() {
    return this.val;
  }

  valueOf() {
    return this.val;
  }

  constructor(n: string | number) {
    if (Number.isNaN(n) || !`${n}`.trim()) {
      throw new Error();
    }
    this.val = Number(n);
  }

  add(...args: Array<string | number>): this {
    this.val = Calculator.add(this.val, ...args);
    return this;
  }

  subtract(...args: Array<string | number>): this {
    this.val = Calculator.subtract(this.val, ...args);
    return this;
  }

  multiply(...args: Array<string | number>): this {
    this.val = Calculator.multiply(this.val, ...args);
    return this;
  }

  divide(...args: Array<string | number>): this {
    this.val = Calculator.divide(this.val, ...args);
    return this;
  }
}

export function calculator(n: string | number) {
  return new Calculator2(n);
}
