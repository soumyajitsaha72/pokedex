import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedPokmonComponent } from './selected-pokmon.component';

describe('SelectedPokmonComponent', () => {
  let component: SelectedPokmonComponent;
  let fixture: ComponentFixture<SelectedPokmonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedPokmonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedPokmonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
