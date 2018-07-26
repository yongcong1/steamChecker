import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameStatsDetailComponent } from './game-stats-detail.component';

describe('GameStatsDetailComponent', () => {
  let component: GameStatsDetailComponent;
  let fixture: ComponentFixture<GameStatsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameStatsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameStatsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
