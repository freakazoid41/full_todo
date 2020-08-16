import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarDashComponent } from './calendar-dash.component';

describe('CalendarDashComponent', () => {
  let component: CalendarDashComponent;
  let fixture: ComponentFixture<CalendarDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
