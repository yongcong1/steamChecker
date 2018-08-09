import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterLinkDirectiveStub } from '../../../testing/router-link-directive-stub';
import { GameStatsComponent } from './game-stats.component';
import { HttpClientModule } from '@angular/common/http';

describe('GameStatsComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameStatsComponent, RouterLinkDirectiveStub ],
      imports: [ HttpClientModule ]
    })
    .compileComponents();
  }));

  tests();
});

function tests(){
  let component: GameStatsComponent;
  let fixture: ComponentFixture<GameStatsComponent>;
  beforeEach(() => {
    fixture = TestBed.createComponent(GameStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/
}
