// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesComponent } from './heroes.component';

import { HEROES } from '../mock-heroes';
import { of } from 'rxjs';
// import { RouterTestingModule } from '@angular/router/testing';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  // let fixture: ComponentFixture<HeroesComponent>;
  let heroes;
  let mockHeroService;

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [HeroesComponent],
  //     imports: [RouterTestingModule]
  //   }).compileComponents();
  // }));

  beforeEach(() => {
    // fixture = TestBed.createComponent(HeroesComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
    heroes = HEROES;

    mockHeroService = jasmine.createSpyObj([
      'getHero',
      'addHero',
      'deleteHero'
    ]);

    component = new HeroesComponent(mockHeroService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('deleteHero method', () => {
    it('should remove the indicated hero from the heros list', () => {
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.heroes = heroes;
      const heroToDelete = heroes[1];

      component.deleteHero(heroToDelete);

      expect(component.heroes.length).toBe(heroes.length - 1);
      expect(
        component.heroes.filter(hero => hero.id === heroToDelete.id).length
      ).toBe(0);
    });

    it('should call deleteHero with the indicated hero', () => {
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.heroes = heroes;
      const heroToDelete = heroes[1];

      component.deleteHero(heroToDelete);

      expect(mockHeroService.deleteHero).toHaveBeenCalledWith(heroToDelete);
    });
  });
});
