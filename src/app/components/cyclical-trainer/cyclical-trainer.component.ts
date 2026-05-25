import {Component, Input, OnInit} from '@angular/core';
import {Stack} from '../../services/stacks/stack';

@Component({
  standalone: false,
  selector: 'app-cyclical-trainer',
  templateUrl: './cyclical-trainer.component.html',
  styleUrls: ['./cyclical-trainer.component.sass']
})
export class CyclicalTrainerComponent implements OnInit {
  @Input() stack?: Stack;

  constructor() { }

  ngOnInit(): void {
  }

}
