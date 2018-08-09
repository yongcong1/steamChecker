import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { APIService } from './api.service';

describe('APIService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [APIService],
      imports: [ HttpClientModule ]
    });
  });

  it('should be created', inject([APIService], (service: APIService) => {
    expect(service).toBeTruthy();
  }));
});
