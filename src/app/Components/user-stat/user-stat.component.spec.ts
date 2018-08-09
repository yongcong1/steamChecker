import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { UserStatComponent } from './user-stat.component';
import { HttpClientModule } from '@angular/common/http';

@Component({selector: 'app-stats', template: ''})
class StatsComponent {}

describe('UserStatComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserStatComponent, StatsComponent ],
      imports: [ HttpClientModule ]
    })
    .compileComponents();
  }));

  tests();

});

function tests(){
  let component: UserStatComponent;
  let fixture: ComponentFixture<UserStatComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UserStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/
}
