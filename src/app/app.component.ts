import {Component, OnInit} from '@angular/core';
import {StacksService} from './services/stacks/stacks.service';
import {Stack} from './services/stacks/stack';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {delay} from 'rxjs/operators';
import {MediaMatcher} from '@angular/cdk/layout';
import {Observable} from 'rxjs';

@Component({
  standalone: false,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  mobileQuery: MediaQueryList;

  stacks: Stack[];
  groupedStacks: { name: string, stacks: Stack[] }[];
  selectedStack$: Observable<Stack>;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private media: MediaMatcher,
              private stacksService: StacksService) {
    this.stacks = this.stacksService.getStacks();
    this.selectedStack$ = this.stacksService.selectSelectedStack();
    const groupedStacks: Record<string, Stack[]> = this.stacks
      .reduce((groups: Record<string, Stack[]>, item: Stack) => {
        const group = (groups[item.group] ?? []);
        group.push(item);
        groups[item.group] = group;
        return groups;
      }, {})
    this.groupedStacks = Object.keys(groupedStacks).map((key: string) => {
      return {
        name: key,
        stacks: groupedStacks[key]
      }
    });

    this.mobileQuery = this.media.matchMedia('(max-width: 1000px)');

    this.activatedRoute.queryParams
      .pipe(delay(200))
      .subscribe((param: Params) => {
        if(param?.id != null) {
          this.stacksService.setSelectedStack((this.stacksService.getStack(param.id) as Stack));
        }
      })
  }

  ngOnInit() {

  }

  stackChangeHandler(stackId: string): void {
    const queryParams: Params = {id: stackId};
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: queryParams,
        queryParamsHandling: 'merge'
      }
    )
  }
}
