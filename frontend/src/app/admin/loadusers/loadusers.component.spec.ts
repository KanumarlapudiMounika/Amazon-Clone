import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadusersComponent } from './loadusers.component';

describe('LoadusersComponent', () => {
  let component: LoadusersComponent;
  let fixture: ComponentFixture<LoadusersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadusersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
