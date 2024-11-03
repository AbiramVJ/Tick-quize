import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderConstractionComponent } from './under-constraction.component';

describe('UnderConstractionComponent', () => {
  let component: UnderConstractionComponent;
  let fixture: ComponentFixture<UnderConstractionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnderConstractionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnderConstractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
