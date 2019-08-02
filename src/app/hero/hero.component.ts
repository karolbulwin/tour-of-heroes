import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Hero } from '../hero';
import {} from 'protractor';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {
  @Input() hero: Hero;
  @Output() deleteHero: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onDeleteClick(event: Event): void {
    event.stopPropagation();
    this.deleteHero.next();
  }
}
