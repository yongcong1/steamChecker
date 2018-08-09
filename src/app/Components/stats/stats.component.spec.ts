import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartModule } from 'primeng/chart';
import { ActivatedRoute, ActivatedRouteStub } from '../../../testing/activated-route-stub';
import { StatsComponent } from './stats.component';
import { RouterLinkDirectiveStub } from '../../../testing/router-link-directive-stub';
import { HttpClientModule } from '@angular/common/http';

let activatedRoute: ActivatedRouteStub;

describe('StatsComponent', () => {

  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub();
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsComponent, RouterLinkDirectiveStub ],
      imports: [ ChartModule, HttpClientModule ],
      providers: [
        { provide: ActivatedRoute, userValue: activatedRoute }
      ]
    })
    .compileComponents();
  }));

  tests();
});

function tests(){
  let component: StatsComponent;
  let fixture: ComponentFixture<StatsComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
}
