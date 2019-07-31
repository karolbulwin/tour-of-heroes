import { TestBed } from '@angular/core/testing';

import { MessageService } from './message.service';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    // service = new MessageService(); // add to it for better story // arrange // act // assert
  });

  it('should be created', () => {
    // const service: MessageService = TestBed.get(MessageService);
    service = new MessageService();

    expect(service).toBeTruthy();
  });

  it('should have no messages on start', () => {
    service = new MessageService();

    expect(service.messages.length).toBe(0);
  });

  describe('add method', () => {
    it('should add a message when add is called', () => {
      service = new MessageService();

      service.add('Hello!');

      expect(service.messages.length).toBe(1);
    });
  });

  describe('clear method', () => {
    it('should clear all messages when clear is called', () => {
      service = new MessageService();
      service.add('Hello!');

      service.clear();

      expect(service.messages.length).toBe(0);
    });
  });
});
