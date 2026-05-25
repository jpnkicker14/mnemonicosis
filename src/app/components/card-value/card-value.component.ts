import {Component, Input, OnInit} from '@angular/core';
import {Card} from '../../services/stacks/card';

@Component({
  standalone: false,
  selector: 'app-card-value',
  templateUrl: './card-value.component.html',
  styleUrls: ['./card-value.component.sass']
})
export class CardValueComponent implements OnInit {
  @Input() card?: Card;
  @Input() cardClass = 'mat-display-4'

  constructor() { }

  ngOnInit(): void {
  }

}
