import { Component, OnInit } from '@angular/core';
import {Stack} from '../../services/stacks/stack';
import {ActivatedRoute, Params} from '@angular/router';
import {StacksService} from '../../services/stacks/stacks.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  stack$: Observable<Stack>;

  constructor(private stacksService: StacksService) {
    this.stack$ = this.stacksService.selectSelectedStack()
  }

  ngOnInit(): void {
  }

}
