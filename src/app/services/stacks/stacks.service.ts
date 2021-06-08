import {Injectable} from '@angular/core';
import {aronson} from './stack-definition/aronson';
import {Stack} from './stack';
import {tamariz} from './stack-definition/tamariz';
import {siStebbins} from './stack-definition/si-stebbins';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StacksService {
  selectedStackSub: BehaviorSubject<Stack>;

  readonly stacks: Array<Stack> = [
    aronson,
    tamariz,
    // siStebbins
  ]

  constructor() {
    this.selectedStackSub = new BehaviorSubject<Stack>(this.stacks[0]);
  }

  getStacks(): Array<Stack> {
    return this.stacks;
  }

  getStack(id: string): Stack | undefined {
    return this.stacks.find((stack: Stack) => stack.id === id);
  }

  getSelectedStack(): Stack {
    return this.selectedStackSub.value;
  }

  selectSelectedStack(): Observable<Stack> {
    return this.selectedStackSub.asObservable();
  }

  setSelectedStack(stack: Stack): void {
    if(stack != null) {
      this.selectedStackSub.next(stack);
    }
  }
}
