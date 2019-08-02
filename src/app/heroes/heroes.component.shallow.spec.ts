import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesComponent } from './heroes.component';

import { HEROES } from '../mock-heroes';
import { of } from 'rxjs';
import { Hero } from '../hero';
import { RouterTestingModule } from '@angular/router/testing';
// import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HeroService } from '../hero.service';
import { Component, Input } from '@angular/core';

describe('HeroesComponent (shallow)', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let heroes: Hero[];
  let mockHeroService;

  @Component({
    selector: 'app-hero-create',
    template: '<div></div>'
  })
  class FakeHeroCreateComponent {}

  @Component({
    selector: 'app-hero',
    template: '<div></div>'
  })
  class FakeHeroComponent {
    @Input() hero: Hero;
    // @Output() deleteHero: EventEmitter<any> = new EventEmitter();
  }

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [HeroesComponent],
  //     imports: [RouterTestingModule],
  //     providers: [{ provide: HeroService, useValue: mockHeroService }],
  //     schemas: [NO_ERRORS_SCHEMA]
  //   }).compileComponents();
  // }));

  beforeEach(() => {
    heroes = HEROES;

    mockHeroService = jasmine.createSpyObj([
      'getHeroes',
      'addHero',
      'deleteHero'
    ]);

    TestBed.configureTestingModule({
      declarations: [
        HeroesComponent,
        FakeHeroCreateComponent,
        FakeHeroComponent
      ],
      imports: [RouterTestingModule],
      providers: [{ provide: HeroService, useValue: mockHeroService }]
      // schemas: [NO_ERRORS_SCHEMA]
    });
    // fixture.detectChanges();

    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getHeroes method', () => {
    it('should set heroes correctly from the service', () => {
      mockHeroService.getHeroes.and.returnValue(of(heroes));
      fixture.detectChanges();

      expect(component.heroes.length).toBe(10);
    });

    it('should create one li for each hero', () => {
      mockHeroService.getHeroes.and.returnValue(of(heroes));
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('li').length).toBe(10);
    });
  });
});
