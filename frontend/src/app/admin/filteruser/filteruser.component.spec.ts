import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteruserComponent } from './filteruser.component';

describe('FilteruserComponent', () => {
  let component: FilteruserComponent;
  let fixture: ComponentFixture<FilteruserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilteruserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilteruserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
