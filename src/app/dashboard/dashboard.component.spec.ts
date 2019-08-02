import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { HEROES } from '../mock-heroes';
import { NO_ERRORS_SCHEMA, Component } from '@angular/core';
import { HeroService } from '../hero.service';
import { of } from 'rxjs';
import { Hero } from '../hero';
import { RouterTestingModule } from '@angular/router/testing';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let heroes: Hero[];
  let mockHeroService;

  @Component({
    selector: 'app-hero-search',
    template: '<div></div>'
  })
  class FakeHeroSearch {}

  beforeEach(async(() => {
    mockHeroService = jasmine.createSpyObj(['getHeroes']);

    TestBed.configureTestingModule({
      declarations: [DashboardComponent, FakeHeroSearch],
      imports: [RouterTestingModule],
      providers: [{ provide: HeroService, useValue: mockHeroService }]
      // schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    heroes = HEROES;

    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getHeroes method', () => {
    it('should set heroes correctly from the service', () => {
      mockHeroService.getHeroes.and.returnValue(of(heroes));
      fixture.detectChanges();

      expect(component.heroes.length).toBe(4);
    });

    it('should render four anchor tags', () => {
      mockHeroService.getHeroes.and.returnValue(of(heroes));
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('a').length).toBe(4);
    });

    it('should render four heroes names in h4 tags', () => {
      mockHeroService.getHeroes.and.returnValue(of(heroes));
      fixture.detectChanges();

      const dashBoardHeroes = fixture.nativeElement.querySelectorAll('h4');

      dashBoardHeroes.forEach(
        (hero: { textContent: string }, index: number) => {
          expect(hero.textContent).toContain(component.heroes[index].name);
        }
      );
    });
  });
});
