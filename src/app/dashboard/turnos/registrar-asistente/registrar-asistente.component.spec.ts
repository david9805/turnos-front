import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarAsistenteComponent } from './registrar-asistente.component';

describe('RegistrarAsistenteComponent', () => {
  let component: RegistrarAsistenteComponent;
  let fixture: ComponentFixture<RegistrarAsistenteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrarAsistenteComponent]
    });
    fixture = TestBed.createComponent(RegistrarAsistenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
