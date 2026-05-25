import {Component, Input, OnInit} from '@angular/core';
import {Card} from '../../services/stacks/card';

@Component({
  standalone: false,
  selector: 'app-spread',
  templateUrl: './spread.component.html',
  styleUrls: ['./spread.component.sass']
})
export class SpreadComponent implements OnInit {
  @Input() selectedCardIds: string[] = [];
  @Input() cards: Card[];

  constructor() {
    this.cards = [];
  }

  ngOnInit(): void {
  }

  containsId(id: string): boolean {
    return this.selectedCardIds.includes(id);
  }
}
