import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Route, ActivatedRouteSnapshot, Params} from '@angular/router';
import { PostDetailShowComponent } from './post-detail-show.component';
// Router
// NavigationEnd
// import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PostFormService } from '../../post-form.service';
// import { PostListComponent } from './post-list.component';
// import { IphoneComponent } from '../iphone/iphone.component';
// import { NavbarComponent } from '../../navbar/navbar.component';
import { PostService } from '../../post.service';
describe('PostDetailShowComponent', () => {
  let component: PostDetailShowComponent;
  let fixture: ComponentFixture<PostDetailShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [ PostDetailShowComponent ],
      providers: [
        PostService,
        PostFormService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostDetailShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
