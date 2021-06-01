import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {StacksService} from './services/stacks/stacks.service';
import {Stack} from './services/stacks/stack';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {delay} from 'rxjs/operators';
import {MediaMatcher} from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  stacks: Array<Stack>;
  groupedStacks: Array<{ name: string, stacks: Array<Stack> }>;
  selectedStack: Stack | undefined;

  get selectedStackId(): string {
    return <string>this.selectedStack?.id;
  }

  constructor(private cd: ChangeDetectorRef,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private media: MediaMatcher,
              private stacksService: StacksService) {
    this.stacks = this.stacksService.getStacks();
    this.selectedStack = this.stacks[0]; // default select first
    const groupedStacks: { [key: string]: Array<Stack> } = this.stacks
      .reduce((groups: { [key: string]: Array<Stack> }, item: Stack) => {
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
    this._mobileQueryListener = () => this.cd.detectChanges();
    // this.mobileQuery.addListener(this._mobileQueryListener);


  }

  ngOnInit() {

    this.activatedRoute.queryParams
      .pipe(delay(200))
      .subscribe((param: Params) => {
        this.selectedStack = this.stacksService.getStack(param?.id);
      })
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
