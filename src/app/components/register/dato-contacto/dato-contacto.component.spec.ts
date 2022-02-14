import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatoContactoComponent } from './dato-contacto.component';

describe('DatoContactoComponent', () => {
  let component: DatoContactoComponent;
  let fixture: ComponentFixture<DatoContactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatoContactoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatoContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
