import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartModule } from 'primeng/chart';
import { ActivatedRoute, ActivatedRouteStub } from '../../../testing/activated-route-stub';
import { GameStatsDetailComponent } from './game-stats-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { Params } from '@angular/router'
import { Subject } from 'rxjs';

let activatedRoute: ActivatedRouteStub;
let params: Subject<Params>;

describe('GameStatsDetailComponent', () => {

  beforeEach(() => {
    params = new Subject<Params>();
    //activatedRoute.setParams({ appid : 3});
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameStatsDetailComponent ],
      imports: [ ChartModule, HttpClientModule ],
      providers: [
        { provide: ActivatedRoute, useValue: {params: params} }
      ]
    })
    .compileComponents();
  }));

  tests();
});

function tests(){
  let component: GameStatsDetailComponent;
  let fixture: ComponentFixture<GameStatsDetailComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GameStatsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('Route Param testing', () => {
    params.next({'appid': 123});
    fixture.detectChanges();
    expect(component.gameAppID).toBe(123);
  });*/
}
