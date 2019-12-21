import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAFriendComponent } from './add-afriend.component';

describe('AddAFriendComponent', () => {
  let component: AddAFriendComponent;
  let fixture: ComponentFixture<AddAFriendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAFriendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
