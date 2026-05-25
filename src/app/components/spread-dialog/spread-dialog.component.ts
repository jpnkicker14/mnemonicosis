import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Card} from '../../services/stacks/card';

@Component({
  standalone: false,
  selector: 'app-spread-dialog',
  templateUrl: './spread-dialog.component.html',
  styleUrls: ['./spread-dialog.component.sass']
})
export class SpreadDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {cards: Card[], selectedCardIds: string[]}) { }

  ngOnInit(): void {
  }

}
