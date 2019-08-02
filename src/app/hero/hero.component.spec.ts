import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroComponent } from './hero.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('HeroComponent', () => {
  let component: HeroComponent;
  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeroComponent],
      imports: [RouterTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;
  });

  it('should have the correct hero', () => {
    component.hero = { id: 1, name: 'Karol' };

    expect(component.hero.name).toEqual('Karol');
  });

  it('should render the hero name in an anchor tag', () => {
    component.hero = { id: 1, name: 'Karol' };
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('a').textContent).toContain(
      'Karol'
    );
  });
});
