import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './post-list/post-list.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostAddComponent } from './post-add/post-add.component';
import { AuthGuard } from '../auth.guard';
const postRoutes: Routes = [
  {
    path: 'posts',
    component: PostListComponent ,
    children: [
      {
        path: 'add',
        component: PostAddComponent,
        canActivate: [AuthGuard]
      },
      {
        path: ':id',
        component: PostDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(postRoutes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }