import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest
} from '@angular/common/http/testing';

import { HeroService } from './hero.service';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';

describe('HeroService', () => {
  let heroService: HeroService;
  let httpTestingController: HttpTestingController;
  let mockMessageService;

  let testHeroes: Hero[] = HEROES;

  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj(['add, clear']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HeroService,
        { provide: MessageService, useValue: mockMessageService }
      ]
    });

    heroService = TestBed.get(HeroService);
    httpTestingController = TestBed.get(HttpClientTestingModule);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  // describe('getHeroes method', () => {
  //   it('should get all heroes', () => {
  //     heroService.getHeroes().subscribe((data: Hero[]) => {
  //       expect(data.length).toBe(testHeroes.length);
  //     });

  //     const heroesRequest: TestRequest = httpTestingController.expectOne(
  //       '/api/heroes'
  //     );
  //     expect(heroesRequest.request.method).toEqual('GE');

  //     heroesRequest.flush(testHeroes);
  //   });
  // });
  // describe('getHero method', () => {
  //   it('should call get with the correct URL', () => {
  //     heroService.getHero(1).subscribe();

  //     const heroRequest: TestRequest = httpTestingController.expectOne(
  //       'api/heroes/1'
  //     );

  //     heroRequest.flush(testHeroes[1]);
  //   });
  // });
});
