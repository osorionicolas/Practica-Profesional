import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SirenComponent } from './siren.component';

describe('SirenComponent', () => {
  let component: SirenComponent;
  let fixture: ComponentFixture<SirenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SirenComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SirenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
