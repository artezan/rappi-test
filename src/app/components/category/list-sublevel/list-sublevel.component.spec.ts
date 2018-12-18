import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSublevelComponent } from './list-sublevel.component';

describe('ListSublevelComponent', () => {
  let component: ListSublevelComponent;
  let fixture: ComponentFixture<ListSublevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSublevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSublevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
