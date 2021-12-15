import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetZonaComponent } from './det-zona.component';

describe('DetZonaComponent', () => {
  let component: DetZonaComponent;
  let fixture: ComponentFixture<DetZonaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetZonaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetZonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
