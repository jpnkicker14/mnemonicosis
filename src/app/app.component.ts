import {Component, OnInit} from '@angular/core';
import {StacksService} from './services/stacks/stacks.service';
import {Stack} from './services/stacks/stack';
import {ActivatedRoute, Params} from '@angular/router';
import {delay} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  stacks: Array<Stack>;
  selectedStack = Stack;

  constructor(private route: ActivatedRoute,
              private stacksService: StacksService) {
    this.stacks = this.stacksService.getStacks();
  }

  ngOnInit() {
    this.route.queryParams
      .pipe(delay(200))
      .subscribe((param: Params) => {
        this.selectedStack = this.stacksService.getStack(param?.id);
      })
  }

  stackChangeHandler(stack: Stack): void {
    console.log(stack);
  }
}
