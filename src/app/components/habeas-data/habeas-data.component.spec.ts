import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabeasDataComponent } from './habeas-data.component';

describe('HabeasDataComponent', () => {
  let component: HabeasDataComponent;
  let fixture: ComponentFixture<HabeasDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HabeasDataComponent]
    });
    fixture = TestBed.createComponent(HabeasDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
