import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAsistenteComponent } from './crear-asistente.component';

describe('CrearAsistenteComponent', () => {
  let component: CrearAsistenteComponent;
  let fixture: ComponentFixture<CrearAsistenteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearAsistenteComponent]
    });
    fixture = TestBed.createComponent(CrearAsistenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
