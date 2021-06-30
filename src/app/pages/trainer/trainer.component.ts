import { Component, OnInit } from '@angular/core';
import {StacksService} from '../../services/stacks/stacks.service';
import {Observable} from 'rxjs';
import {Stack} from '../../services/stacks/stack';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.sass']
})
export class TrainerComponent implements OnInit {
  stack$: Observable<Stack>;

  constructor(private stacksService: StacksService) {
    this.stack$ = this.stacksService.selectSelectedStack()
  }

  ngOnInit(): void {
  }

}
