import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCagePagePage } from './add-cage-page.page';

describe('AddCagePagePage', () => {
  let component: AddCagePagePage;
  let fixture: ComponentFixture<AddCagePagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCagePagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCagePagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
