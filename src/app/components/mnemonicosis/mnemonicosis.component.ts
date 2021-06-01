import {Component, OnInit} from '@angular/core';
import {NameService} from '../../services/name/name.service';

@Component({
  selector: 'app-mnemonicosis',
  templateUrl: './mnemonicosis.component.html',
  styleUrls: ['./mnemonicosis.component.sass']
})
export class MnemonicosisComponent implements OnInit {

  constructor(private nameService: NameService) {
  }

  ngOnInit(): void {
    this.nameService.getName()
      .subscribe((name) => console.log(name));
  }

}
