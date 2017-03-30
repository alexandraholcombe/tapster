import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Keg } from './keg.model';

@Component({
  selector: 'keg-list',
  template: `
  <div class="keg-list">
    <h2>Keg List</h2>

    <select (change)="onChange($event.target.value)">
      <option value="kegsOnTap">On Tap</option>
      <option value="almostEmptyKegs">Less than 10 Pints</option>
      <option value="allKegs">All Kegs</option>
    </select><br>

    <div class="keg" *ngFor="let currentKeg of childKegList | emptiness:filterByEmptiness">
      <h3 class="name">{{currentKeg.name}}</h3>
      <h4 class="brand"> {{currentKeg.brand}}</h4>
      <p>$<span class="price">{{currentKeg.price}}</span></p>
      <p><span class="abv">{{currentKeg.abv}}</span>% abv</p>
      <p><span>{{currentKeg.volume}}</span> Pints in Keg</p>
      <button (click)="editButtonHasBeenClicked(currentKeg)">Edit Keg</button>
    </div>
  </div>
  `,
  styles: [`
    .keg {
      display: inline-block;
      padding: 10px;
      margin: 10px;
      outline: 1px solid red;
      width: 20%;
      text-align: center;
    }
    .keg p:first-of-type {
      font-size: 40px;
    }
    .keg p:nth-of-type(2) {
      font-style: italic;
    }

  `]
})


export class KegListComponent {
  @Input() childKegList: Keg[];
  @Output() clickSender = new EventEmitter();

  filterByEmptiness: string = "kegsOnTap";

  editButtonHasBeenClicked(kegToEdit: Keg) {
    this.clickSender.emit(kegToEdit);
  }

  onChange(optionFromMenu) {
    this.filterByEmptiness = optionFromMenu;
  }


}
