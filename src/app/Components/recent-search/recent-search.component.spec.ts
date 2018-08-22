import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentSearchComponent } from './recent-search.component';

describe('RecentSearchComponent', () => {
  let component: RecentSearchComponent;
  let fixture: ComponentFixture<RecentSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
