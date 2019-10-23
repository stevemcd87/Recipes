import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDetailEditComponent } from './post-detail-edit.component';

describe('PostDetailEditComponent', () => {
  let component: PostDetailEditComponent;
  let fixture: ComponentFixture<PostDetailEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostDetailEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostDetailEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
