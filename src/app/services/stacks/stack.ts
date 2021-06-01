import {Card} from './card';
import {StackGroup} from './enums/stack-group.enum';

export class Stack {
  id: string;
  name: string;
  group: StackGroup;
  stack: Array<Card>;

  constructor(id: string, name: string, group: StackGroup, stack: Array<Card>) {
    this.id = id;
    this.name = name;
    this.group = group;
    this.stack = stack;
  }

  get isCyclical(): boolean {
    return this.group === StackGroup.Cyclical;
  }
}
