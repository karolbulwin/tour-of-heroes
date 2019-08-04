import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesComponent } from './heroes.component';

import { HEROES } from '../mock-heroes';
import { of } from 'rxjs';
import { Hero } from '../hero';
// import { RouterTestingModule } from '@angular/router/testing';
// import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HeroService } from '../hero.service';
import { Component, Input, Directive } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HeroComponent } from '../hero/hero.component';
// import { RouterTestingModule } from '@angular/router/testing';
import { HeroCreateComponent } from '../hero-create/hero-create.component';

@Directive({
  selector: '[routerLink]',
  host: { '(click)': 'onClick()' }
})
export class RouterLinkDirectiveStub {
  @Input('routerLink') linksParams: any;
  navigateTo: any = null;

  onClick() {
    this.navigateTo = this.linksParams;
  }
}

describe('HeroesComponent (deep)', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let heroes: Hero[];
  let mockHeroService;

  // @Component({
  //   selector: 'app-hero-create',
  //   template: '<div></div>'
  // })
  // class FakeHeroCreateComponent {}

  // @Component({
  //   selector: 'app-hero',
  //   template: '<div></div>'
  // })
  // class FakeHeroComponent {
  //   @Input() hero: Hero;
  //   // @Output() deleteHero: EventEmitter<any> = new EventEmitter();
  // }

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
        HeroCreateComponent,
        HeroComponent,
        RouterLinkDirectiveStub
      ],
      // imports: [RouterTestingModule],
      providers: [{ provide: HeroService, useValue: mockHeroService }]
      // schemas: [NO_ERRORS_SCHEMA]
    });
    // fixture.detectChanges();

    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    heroes = [];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getHeroes method', () => {
    it('should render each hero as a HeroComponent', () => {
      mockHeroService.getHeroes.and.returnValue(of(heroes));

      fixture.detectChanges();

      const heroComponentDEs = fixture.debugElement.queryAll(
        By.directive(HeroComponent)
      );
      expect(heroComponentDEs.length).toBe(10);
      heroComponentDEs.forEach((hero, index) => {
        expect(hero.componentInstance.hero).toEqual(heroes[index]);
      });
    });
  });

  describe('deleteHero method', () => {
    it('should call heroService.deleteHero when the Hero Components delete button is clicked', () => {
      spyOn(component, 'deleteHero');
      mockHeroService.getHeroes.and.returnValue(of(heroes));
      const mockStopPropagation = jasmine.createSpyObj(['stopPropagation']);

      fixture.detectChanges();

      const heroComponentDEs = fixture.debugElement.queryAll(
        By.directive(HeroComponent)
      );
      heroComponentDEs[0]
        .query(By.css('button'))
        .triggerEventHandler('click', mockStopPropagation);
      // {stopPropagation: () => {}}

      expect(component.deleteHero).toHaveBeenCalledWith(heroes[0]);

      // another version // raise event
      (heroComponentDEs[1].componentInstance as HeroComponent).deleteHero.emit(
        undefined
      );

      expect(component.deleteHero).toHaveBeenCalledWith(heroes[1]);

      // another version // raise event using triggerEventHandler
      heroComponentDEs[2].triggerEventHandler('deleteHero', null);

      expect(component.deleteHero).toHaveBeenCalledWith(heroes[2]);
    });
  });

  describe('addHero method', () => {
    it('should add a new hero to the heroes list when the add button is clicked', () => {
      // spyOn(component, 'addHero');
      mockHeroService.getHeroes.and.returnValue(of(heroes));
      const heroName = 'Karol';
      mockHeroService.addHero.and.returnValue(of({ id: 1, name: heroName }));
      fixture.detectChanges();

      const heroCreateComponentDE = fixture.debugElement.query(
        By.directive(HeroCreateComponent)
      );

      const inputElement = heroCreateComponentDE.query(By.css('input'))
        .nativeElement;
      const addButton = heroCreateComponentDE.query(By.css('button'));

      inputElement.value = heroName;
      addButton.triggerEventHandler('click', null);
      fixture.detectChanges();

      expect(component.heroes.length).toBe(11);
      const heroText = fixture.debugElement.query(By.css('ul')).nativeElement
        .textContent;
      expect(heroText).toContain(heroName);
      // expect(component.addHero).toHaveBeenCalledWith(heroName);
    });
  });

  it('should have the correct route for the first hero', () => {
    mockHeroService.getHeroes.and.returnValue(of(heroes));
    fixture.detectChanges();
    const heroComponentDEs = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );

    const routerLink = heroComponentDEs[0]
      .query(By.directive(RouterLinkDirectiveStub))
      .injector.get(RouterLinkDirectiveStub);

    heroComponentDEs[0].query(By.css('a')).triggerEventHandler('click', null);

    expect(routerLink.navigateTo).toBe('/detail/11');
  });
});
