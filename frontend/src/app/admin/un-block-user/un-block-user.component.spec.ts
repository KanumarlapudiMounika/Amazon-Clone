import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnBlockUserComponent } from './un-block-user.component';

describe('UnBlockUserComponent', () => {
  let component: UnBlockUserComponent;
  let fixture: ComponentFixture<UnBlockUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnBlockUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnBlockUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
