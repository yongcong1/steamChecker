import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { MainComponent } from './main.component';

@Component({selector: 'app-search', template: ''})
class SearchComponent {}

@Component({selector: 'app-stats', template: ''})
class StatsComponent {}

describe('MainComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MainComponent,
        SearchComponent,
        StatsComponent
      ]
    })
    .compileComponents();
  }));

  tests();
});

function tests(){
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/
}
