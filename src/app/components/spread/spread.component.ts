import {Component, Input, OnInit} from '@angular/core';
import {Card} from '../../services/stacks/card';

@Component({
  selector: 'app-spread',
  templateUrl: './spread.component.html',
  styleUrls: ['./spread.component.sass']
})
export class SpreadComponent implements OnInit {
  @Input() cards: Array<Card>;

  constructor() {
    this.cards = [];
  }

  ngOnInit(): void {
  }

}
