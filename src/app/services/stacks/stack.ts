import {Card} from './card';

export class Stack {
  id: string;
  name: string;
  isCyclical: boolean;
  stack: Array<Card>;

  constructor(id: string, name: string, isCyclical = false, stack: Array<Card>) {
    this.id = id;
    this.name = name;
    this.isCyclical = isCyclical;
    this.stack = stack;
  }
}
