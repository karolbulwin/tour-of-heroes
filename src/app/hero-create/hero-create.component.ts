import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-hero-create',
  templateUrl: './hero-create.component.html',
  styleUrls: ['./hero-create.component.scss']
})
export class HeroCreateComponent implements OnInit {
  @Output() addHero: EventEmitter<string> = new EventEmitter<string>();

  onClick(heroName: string): void {
    this.addHero.emit(heroName);
  }

  constructor() {}

  ngOnInit() {}
}
