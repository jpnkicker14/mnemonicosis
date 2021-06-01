import { Component, OnInit } from '@angular/core';
import {Stack} from '../../services/stacks/stack';
import {ActivatedRoute, Params} from '@angular/router';
import {StacksService} from '../../services/stacks/stacks.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  stack: Stack | null;

  constructor(private route: ActivatedRoute,
              private stacksService: StacksService) {
    this.stack = null;

  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe((param: Params) => {
        this.stack = <Stack>this.stacksService.getStack(param?.id);
      })
  }

}
