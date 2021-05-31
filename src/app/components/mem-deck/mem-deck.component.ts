import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {delay} from 'rxjs/operators';
import {StacksService} from '../../services/stacks/stacks.service';
import {Stack} from '../../services/stacks/stack';

@Component({
  selector: 'app-mem-deck',
  templateUrl: './mem-deck.component.html',
  styleUrls: ['./mem-deck.component.sass']
})
export class MemDeckComponent implements OnInit {

  stack: Stack | undefined;

  constructor(private route: ActivatedRoute,
              private stacksService: StacksService) { }

  ngOnInit(): void {
    this.route.queryParams
      .pipe(delay(200))
      .subscribe((param: Params) => {
        this.stack = this.stacksService.getStack(param?.id);
      })
  }

}
