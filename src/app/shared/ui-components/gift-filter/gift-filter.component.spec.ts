import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MdbCheckboxChange } from 'angular-bootstrap-md';
import { GiftFilterComponent } from './gift-filter.component';
describe('GiftFilterComponent', () => {
  let component: GiftFilterComponent;
  let fixture: ComponentFixture<GiftFilterComponent>;
  beforeEach(() => {
    const mdbCheckboxChangeStub = { checked: {}, element: { value: {} } };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [GiftFilterComponent],
      providers: [
        { provide: MdbCheckboxChange, useValue: mdbCheckboxChangeStub }
      ]
    });
    fixture = TestBed.createComponent(GiftFilterComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('categoriesToShow defaults to: []', () => {
    expect(component.categoriesToShow).toEqual([]);
  });
  it('brandsToShow defaults to: []', () => {
    expect(component.brandsToShow).toEqual([]);
  });
  it('filteredBrandIds defaults to: []', () => {
    expect(component.filteredBrandIds).toEqual([]);
  });
  it('filteredCategoryIds defaults to: []', () => {
    expect(component.filteredCategoryIds).toEqual([]);
  });
});
