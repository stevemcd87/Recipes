import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CallbackComponent } from './callback/callback.component';
import { ProfileComponent } from './profile/profile.component';
import { PostComponent } from './post/post.component';
import { PostDetailComponent } from './post/post-detail/post-detail.component';

import { AuthGuard } from './auth.guard';

const routes: Routes = [
    {
      path: '',
      component: HomeComponent
    }, {
      path: 'callback',
      component: CallbackComponent
    }, {
      path: 'profile',
      component: ProfileComponent,
      canActivate: [AuthGuard]
    }, {
      path: 'posts',
      component: PostComponent
    }, {
      path: 'posts/:id',
      component: PostDetailComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }