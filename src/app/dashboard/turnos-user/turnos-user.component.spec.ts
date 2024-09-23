import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosUserComponent } from './turnos-user.component';

describe('TurnosUserComponent', () => {
  let component: TurnosUserComponent;
  let fixture: ComponentFixture<TurnosUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TurnosUserComponent]
    });
    fixture = TestBed.createComponent(TurnosUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
