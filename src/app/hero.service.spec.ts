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
    mockMessageService = jasmine.createSpyObj(['add', 'clear']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HeroService,
        { provide: MessageService, useValue: mockMessageService }
      ]
    });

    heroService = TestBed.get(HeroService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    const service: HeroService = TestBed.get(HeroService);
    expect(service).toBeTruthy();
  });

  describe('getHeroes method', () => {
    it('should get all heroes', () => {
      heroService.getHeroes().subscribe((data: Hero[]) => {
        expect(data.length).toBe(testHeroes.length);
      });

      const heroesRequest: TestRequest = httpTestingController.expectOne(
        'api/heroes'
      );
      expect(heroesRequest.request.method).toEqual('GET');

      heroesRequest.flush(testHeroes);
    });
  });
  describe('getHero method', () => {
    it('should call get with the correct URL', () => {
      const heroToGet = testHeroes[0];
      heroService.getHero(heroToGet.id).subscribe((data: Hero) => {
        expect(data).toBe(testHeroes[0]);
      });

      const heroesRequest: TestRequest = httpTestingController.expectOne(
        `api/heroes/${heroToGet.id}`
      );

      expect(heroesRequest.request.method).toEqual('GET');

      heroesRequest.flush(testHeroes[0]);
    });
  });

  describe('addHero method', () => {
    it('should add new hero to the heroes list', () => {
      const newHero: Hero = { id: 1, name: 'Karol' };
      heroService.addHero(newHero).subscribe((data: Hero) => {
        expect(data).toEqual(newHero);
      });

      const heroesRequest: TestRequest = httpTestingController.expectOne(
        'api/heroes'
      );
      expect(heroesRequest.request.method).toEqual('POST');

      heroesRequest.flush(newHero);
    });
  });

  describe('updateHero method', () => {
    it('should update hero with new name', () => {
      const newHero: Hero = { id: 11, name: 'Karol' };
      heroService.updateHero(newHero).subscribe((data: Hero) => {
        expect(data).toEqual(newHero);
      });

      const heroesRequest: TestRequest = httpTestingController.expectOne(
        'api/heroes'
      );

      expect(heroesRequest.request.method).toEqual('PUT');

      heroesRequest.flush(newHero);
    });
  });

  describe('deleteHero method', () => {
    it('should delete current hero', () => {
      const heroToDelete = testHeroes[0];
      heroService.deleteHero(heroToDelete).subscribe((data: Hero) => {
        expect(data).toEqual(heroToDelete);
      });

      const heroesRequest: TestRequest = httpTestingController.expectOne(
        `api/heroes/${heroToDelete.id}`
      );

      expect(heroesRequest.request.method).toEqual('DELETE');

      heroesRequest.flush(heroToDelete);
    });
  });
});
