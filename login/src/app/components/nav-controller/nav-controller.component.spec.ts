import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavControllerComponent } from './nav-controller.component';

describe('NavControllerComponent', () => {
  let component: NavControllerComponent;
  let fixture: ComponentFixture<NavControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavControllerComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
