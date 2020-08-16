import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoDashComponent } from './todo-dash.component';

describe('TodoDashComponent', () => {
  let component: TodoDashComponent;
  let fixture: ComponentFixture<TodoDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
