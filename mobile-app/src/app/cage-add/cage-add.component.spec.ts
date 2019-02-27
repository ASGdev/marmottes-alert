import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CageAddPage } from './cage-add.page';

describe('CageAddPage', () => {
  let component: CageAddPage;
  let fixture: ComponentFixture<CageAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CageAddPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CageAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
