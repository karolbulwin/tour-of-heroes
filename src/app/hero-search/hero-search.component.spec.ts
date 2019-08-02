import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroSearchComponent } from './hero-search.component';
import { HeroService } from '../hero.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('HeroSearchComponent', () => {
  let component: HeroSearchComponent;
  let fixture: ComponentFixture<HeroSearchComponent>;
  let mockHeroService;

  beforeEach(async(() => {
    mockHeroService = jasmine.createSpyObj(['searchHeroes']);

    TestBed.configureTestingModule({
      declarations: [HeroSearchComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: HeroService, useValue: mockHeroService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
