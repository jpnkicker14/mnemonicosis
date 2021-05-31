import {Injectable} from '@angular/core';
import {aronson} from './stack-definition/aronson';
import {Stack} from './stack';
import {tamariz} from './stack-definition/tamariz';
import {siStebbins} from './stack-definition/si-stebbins';

@Injectable({
  providedIn: 'root'
})
export class StacksService {

  readonly stacks: Array<Stack> = [
    aronson,
    tamariz,
    siStebbins
  ]

  constructor() {
  }

  getStacks(): Array<Stack> {
    return this.stacks;
  }

  getStack(id: string): Stack | undefined{
    return this.stacks.find((stack: Stack) => stack.id === id);
  }
}
