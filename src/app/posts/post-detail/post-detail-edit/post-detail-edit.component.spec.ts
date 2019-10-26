import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule} from '@angular/router/testing';
import { PostDetailEditComponent } from './post-detail-edit.component';
import { PostService } from '../../post.service';
import { AuthService } from '../../../auth.service';
import { PostFormService } from '../../post-form.service';
import { HttpClientTestingModule }    from '@angular/common/http/testing';
// import {RouterTestingModule} from "@angular/router/testing";
import {Router} from "@angular/router";
import {Location} from "@angular/common";

import { PostListComponent } from '../../post-list/post-list.component';
import { PostDetailComponent } from '../post-detail.component';
import { PostDetailShowComponent } from '../post-detail-show/post-detail-show.component';
import { PostAddComponent } from '../../post-add/post-add.component';

describe('PostDetailEditComponent', () => {
  let component: PostDetailEditComponent;
  let fixture: ComponentFixture<PostDetailEditComponent>;
  let location: Location;
  let router: Router;
  // let postRoutes = [
  //   {
  //     path: 'posts',
  //     component: PostListComponent ,
  //     children: [
  //       {
  //         path: 'add',
  //         component: PostAddComponent,
  //         // canActivate: [AuthGuard]
  //       },
  //       {
  //         path: ':id',
  //         component:PostDetailComponent ,
  //         children: [
  //           {
  //             path: 'edit',
  //             component: PostDetailEditComponent,
  //             // canActivate: [AuthGuard]
  //           },
  //           {
  //             path: '',
  //             component: PostDetailShowComponent
  //           }
  //         ]
  //       }
  //     ]
  //   }
  // ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
          imports: [
            HttpClientTestingModule,
            ReactiveFormsModule,
            // RouterTestingModule.withRoutes(postRoutes)],
          ],
          declarations: [
            PostDetailEditComponent,
            PostListComponent,
            PostDetailShowComponent,
            PostAddComponent
           ]
          // providers: [
          //   PostService,
          //   AuthService,
          //   PostFormService
          // ]
    })
    .compileComponents();
  }));

//   router = TestBed.get(Router);
// location = TestBed.get(Location);

// fixture = TestBed.createComponent(PostDetailComponent);
// router.initialNavigation();

  beforeEach(() => {
    fixture = TestBed.createComponent(PostDetailEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
