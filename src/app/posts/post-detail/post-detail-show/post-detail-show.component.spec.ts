import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDetailShowComponent } from './post-detail-show.component';

describe('PostDetailShowComponent', () => {
  let component: PostDetailShowComponent;
  let fixture: ComponentFixture<PostDetailShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostDetailShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostDetailShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
